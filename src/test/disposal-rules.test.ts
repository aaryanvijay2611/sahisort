import { describe, expect, it } from "vitest";
import {
  CATEGORY_UNSUPPORTED_REASON,
  NATIONAL_FALLBACK_NOTE,
  notCoveredResult,
  validateDisposal,
} from "@/lib/disposal-rules";
import {
  GUIDE,
  LOCAL_PASSAGES,
  LOCAL_PENDING,
  MIN_RELEVANCE_SCORE,
  retrieve,
  hasPendingLocalRule,
  isPlaceholder,
} from "@/lib/guide";
import type { DisposalAi } from "@/lib/schemas";

const base: DisposalAi = {
  status: "verified",
  category: "Dry waste",
  explanation: "",
  preparation: [],
  conditions: [],
  exceptions: [],
  limitations: [],
  missing_information: [],
  general_advice: "",
  citations: [{ passage_id: "swm-dry", relevance: "x" }],
};

const input = (over: Partial<Parameters<typeof validateDisposal>[0]> = {}) => ({
  ai: base,
  retrievedIds: ["swm-dry"],
  unansweredQuestions: 0,
  topScore: 10,
  ...over,
});

describe("validateDisposal", () => {
  it("keeps verified when cited and no open questions", () => {
    expect(validateDisposal(input()).status).toBe("verified");
  });

  it("downgrades to conditional when questions are open", () => {
    expect(validateDisposal(input({ unansweredQuestions: 1 })).status).toBe("conditional");
  });

  it("drops fabricated citations and marks insufficient", () => {
    const r = validateDisposal(
      input({ ai: { ...base, citations: [{ passage_id: "made-up", relevance: "" }] } }),
    );
    expect(r.status).toBe("insufficient");
    expect(r.citations).toHaveLength(0);
  });

  it("is insufficient when nothing was retrieved", () => {
    expect(validateDisposal(input({ retrievedIds: [] })).status).toBe("insufficient");
  });

  it("is not_covered below the relevance floor", () => {
    expect(validateDisposal(input({ topScore: MIN_RELEVANCE_SCORE - 1 })).status).toBe(
      "not_covered",
    );
  });

  it("downgrades when the chosen category is not supported by a citation", () => {
    const r = validateDisposal(
      input({ ai: { ...base, category: "E-Waste", citations: [{ passage_id: "swm-dry", relevance: "x" }] } }),
    );
    expect(r.status).toBe("insufficient");
    expect(r.downgraded_reason).toBe(CATEGORY_UNSUPPORTED_REASON);
  });

  it("accepts a category written in different casing", () => {
    const r = validateDisposal(
      input({ ai: { ...base, category: "dry waste (recyclable)" } }),
    );
    expect(r.status).toBe("verified");
  });

  it("never shows model-written preparation steps", () => {
    const r = validateDisposal(
      input({ ai: { ...base, preparation: ["Chop it into tiny pieces and bin it"] } }),
    );
    expect(r.preparation).not.toContain("Chop it into tiny pieces and bin it");
    expect(r.preparation).toContain("Flatten cardboard boxes to save space.");
  });

  it("notes when a national rule stands in for an unfilled Gurugram rule", () => {
    const r = validateDisposal(
      input({
        ai: {
          ...base,
          citations: [{ passage_id: "swm-hazardous", relevance: "x" }],
          category: "Domestic Hazardous",
        },
        retrievedIds: ["swm-hazardous"],
        terms: ["aerosol", "deodorant"],
      }),
    );
    expect(r.scope_note).toBe(NATIONAL_FALLBACK_NOTE);
  });

  it("does not raise the note for an item with no pending local rule", () => {
    const r = validateDisposal(input({ terms: ["carry", "bag"] }));
    expect(r.scope_note).toBeNull();
  });
});

describe("guide placeholders", () => {
  it("keeps unfilled local passages out of retrieval", () => {
    expect(LOCAL_PENDING.length).toBeGreaterThan(0);
    expect(GUIDE.some(isPlaceholder)).toBe(false);

    const { passages } = retrieve(["aerosol", "deodorant", "spray"]);
    expect(passages.map((p) => p.id)).not.toContain("local-aerosol-can");
    expect(passages.map((p) => p.id)).toContain("swm-hazardous");
  });

  it("loads every local rule except the one the advisory does not cover", () => {
    expect(LOCAL_PENDING.map((p) => p.id)).toEqual(["local-aerosol-can"]);

    const loaded = LOCAL_PASSAGES.filter((p) => p.text.trim().length > 0);
    expect(loaded).toHaveLength(17);
    for (const p of loaded) {
      expect(p.scope).toBe("local");
      expect(p.source).toContain("MCG");
      expect(p.url).toContain("mcg.gov.in");
      expect(p.section).toContain("§3");
      expect(p.prep_steps.length).toBeGreaterThan(0);
    }
  });

  it("returns each distinct local rule text once so other streams still surface", () => {
    const { passages } = retrieve([
      "old",
      "phone",
      "screen",
      "glass",
      "body",
      "metal",
      "plastic",
    ]);
    const dryCopies = passages.filter((p) => p.text.includes("The various dry waste"));
    expect(dryCopies).toHaveLength(1);
    // The e-waste rule must survive the crowd of dry-waste passages.
    expect(passages.map((p) => p.id)).toContain("ew-consumer");
  });

  it("prefers a filled Gurugram rule over the national rule it replaces", () => {
    const { passages, topScore } = retrieve(["banana", "peel"]);
    expect(topScore).toBeGreaterThanOrEqual(MIN_RELEVANCE_SCORE);
    expect(passages[0]!.id).toBe("local-banana-peel");
    expect(passages[0]!.scope).toBe("local");
  });

  it("knows which national rule a pending local rule would replace", () => {
    expect(hasPendingLocalRule("swm-hazardous", ["aerosol", "deodorant"])).toBe(true);
    expect(hasPendingLocalRule("swm-wet", ["aerosol", "deodorant"])).toBe(false);
  });
});

describe("notCoveredResult", () => {
  it("points the user at the MCG contact supplied for the guide", () => {
    const r = notCoveredResult();
    expect(r.status).toBe("not_covered");
    expect(r.explanation).toContain("Not covered by this guide");
    expect(r.explanation).toContain("Municipal Corporation of Gurugram (MCG)");
    expect(r.explanation).toContain("1800-180-1817");
  });
});
