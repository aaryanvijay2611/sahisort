import type { DisposalAi } from "./schemas";
import { GUIDE, MIN_RETRIEVAL_SCORE, type GuidePassage, type WasteCategory } from "./guide";

export type ValidationInput = {
  ai: DisposalAi;
  retrievedIds: string[];
  unansweredQuestions: number;
  topScore: number;
};

export type DisposalStatus = "verified" | "conditional" | "insufficient" | "not_covered";

export type ValidatedDisposal = Omit<DisposalAi, "status"> & {
  status: DisposalStatus;
  citations: { passage_id: string; relevance: string }[];
  downgraded_reason: string | null;
};

/**
 * NOT_COVERED shortcut — returned directly by computeDisposal when retrieval
 * scores below MIN_RETRIEVAL_SCORE, avoiding an unnecessary LLM call.
 */
export function notCoveredResult(): ValidatedDisposal {
  return {
    status: "not_covered",
    category: "Unknown",
    explanation:
      "This item is not covered by the configured waste-management guide. Contact your local authority or municipal helpline for guidance.",
    preparation: [],
    conditions: [],
    exceptions: [],
    limitations: [
      "No matching passage found in the guide.",
      "Contact your local municipal authority for item-specific disposal instructions.",
    ],
    citations: [],
    missing_information: [],
    general_advice: "",
    downgraded_reason: "No guide passage matched this item above the minimum relevance threshold.",
  };
}

/**
 * Looks up a passage by id from the guide corpus.
 * Returns undefined if the id is not found — callers must guard against this.
 */
export function lookupPassage(id: string): GuidePassage | undefined {
  return GUIDE.find((p) => p.id === id);
}

/**
 * Enforces trust rules on an AI disposal recommendation:
 *
 * 1. Strip citations that reference IDs not actually retrieved.
 * 2. Downgrade to "insufficient" if no valid citations remain.
 * 3. Check that the model's chosen category matches the category of at least
 *    one cited passage. If not, downgrade to "insufficient" with reason
 *    "Category not supported by cited passage".
 * 4. Downgrade "verified" → "conditional" when clarifying questions are open.
 */
export function validateDisposal({
  ai,
  retrievedIds,
  unansweredQuestions,
  topScore,
}: ValidationInput): ValidatedDisposal {
  // Guard: if retrieval was below threshold this should not be called — but
  // protect defensively in case the caller forgets.
  if (topScore < MIN_RETRIEVAL_SCORE) {
    return notCoveredResult();
  }

  // 1. Strip hallucinated citation IDs
  const citations = ai.citations.filter((c) => retrievedIds.includes(c.passage_id));

  let status: DisposalStatus = ai.status;
  let reason: string | null = null;

  // 2. No retrieved passages at all
  if (retrievedIds.length === 0) {
    status = "insufficient";
    reason = "No guide passage matched this object.";
  }
  // 3. AI cited something but all IDs were hallucinated
  else if (status !== "insufficient" && citations.length === 0) {
    status = "insufficient";
    reason = "The recommendation did not cite any guide passage.";
  }
  // 4. Category-match check: the model's chosen category must appear in at
  //    least one cited passage's category field.
  else if (status !== "insufficient" && citations.length > 0) {
    const citedCategories = citations
      .map((c) => lookupPassage(c.passage_id)?.category)
      .filter((cat): cat is WasteCategory => Boolean(cat));

    const normalised = ai.category.toLowerCase().trim();
    const categoryMatches = citedCategories.some(
      (cat) =>
        cat.toLowerCase() === normalised ||
        normalised.includes(cat.toLowerCase()) ||
        cat.toLowerCase().includes(normalised),
    );

    if (!categoryMatches && citedCategories.length > 0) {
      status = "insufficient";
      reason = `Category not supported by cited passage. Guide says: ${[...new Set(citedCategories)].join(", ")}.`;
    }
  }

  // 5. Open questions → can't call it fully verified
  if (status === "verified" && unansweredQuestions > 0) {
    status = "conditional";
    reason = "Open clarification questions could change this recommendation.";
  }

  return { ...ai, status, citations, downgraded_reason: reason };
}
