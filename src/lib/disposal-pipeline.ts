import type { Analysis, Disposal, DisposalAi, DisposalComponent } from "./schemas";
import {
  buildQuery,
  categoryForTerms,
  hasPendingLocalRuleForItem,
  isPlaceholder,
  type GuidePassage,
} from "./guide";
import {
  ITEM_PENDING_NOTE,
  lookupPassage,
  notCoveredResult,
  validateDisposal,
} from "./disposal-rules";

/** Query terms used for retrieval, built from the object, its components and answers. */
export function buildQueryForAnalysis(
  analysis: Analysis,
  answers: Record<string, string>,
): string[] {
  return buildQuery([
    analysis.object_name,
    ...analysis.materials.map((m) => `${m.component} ${m.material}`),
    ...Object.values(answers),
  ]);
}

/** Per-component categories derived from the guide, with no model involvement. */
export function componentBreakdown(analysis: Analysis): DisposalComponent[] {
  return analysis.materials.map((m) => {
    const best = categoryForTerms(buildQuery([m.component, m.material]));
    return {
      component: m.component,
      material: m.material,
      category: best?.category ?? null,
      passage_ids: best?.passageIds ?? [],
      supported: Boolean(best),
    };
  });
}

export function unansweredQuestions(
  analysis: Analysis,
  answers: Record<string, string>,
): number {
  return analysis.questions.filter((q) => !(q.id in answers)).length;
}

/**
 * Turns a model recommendation (or the absence of one) into the stored result.
 *
 * Evidence text, preparation steps and component categories all come from the
 * guide corpus, not from the model. `ai === null` means retrieval was below
 * MIN_RELEVANCE_SCORE and no model call was made.
 */
export function buildDisposal(args: {
  analysis: Analysis;
  answers: Record<string, string>;
  ai: DisposalAi | null;
  passages: GuidePassage[];
  topScore: number;
}): Disposal {
  const terms = buildQueryForAnalysis(args.analysis, args.answers);
  const components = componentBreakdown(args.analysis);
  const generated_at = new Date().toISOString();

  if (!args.ai) {
    const nc = notCoveredResult();
    return { ...nc, evidence: [], components, query: terms, generated_at };
  }

  const validated = validateDisposal({
    ai: args.ai,
    retrievedIds: args.passages.map((p) => p.id),
    unansweredQuestions: unansweredQuestions(args.analysis, args.answers),
    topScore: args.topScore,
    terms,
  });

  // Verbatim rule text, source, section and scope come from guide.ts only.
  const evidence = validated.citations.flatMap((c) => {
    const p = lookupPassage(c.passage_id);
    if (!p || isPlaceholder(p)) return [];
    return [
      {
        id: p.id,
        title: p.title,
        category: p.category,
        scope: p.scope,
        source: p.source,
        section: p.section,
        url: p.url,
        topic: p.topic,
        text: p.text,
        relevance: c.relevance,
      },
    ];
  });

  // If this item's own local rule is still a placeholder, say so even when the
  // cited passage belongs to another item (e.g. an uncovered aerosol can citing
  // the general dry-waste rule). Never let that read as a full Gurugram answer.
  const itemNote = hasPendingLocalRuleForItem(terms) ? ITEM_PENDING_NOTE : null;

  return {
    ...validated,
    scope_note: validated.scope_note ?? itemNote,
    evidence,
    components,
    query: terms,
    generated_at,
  };
}
