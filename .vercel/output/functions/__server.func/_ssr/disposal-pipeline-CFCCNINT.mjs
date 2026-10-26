import { a as buildQuery, d as hasPendingLocalRuleForItem, o as categoryForTerms, p as isPlaceholder } from "./guide-Dvwp24Fc.mjs";
import { a as validateDisposal, i as notCoveredResult, r as lookupPassage, t as ITEM_PENDING_NOTE } from "./disposal-rules-D4Sj2tb2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/disposal-pipeline-CFCCNINT.js
/** Query terms used for retrieval, built from the object, its components and answers. */
function buildQueryForAnalysis(analysis, answers) {
	return buildQuery([
		analysis.object_name,
		...analysis.materials.map((m) => `${m.component} ${m.material}`),
		...Object.values(answers)
	]);
}
/** Per-component categories derived from the guide, with no model involvement. */
function componentBreakdown(analysis) {
	return analysis.materials.map((m) => {
		const best = categoryForTerms(buildQuery([m.component, m.material]));
		return {
			component: m.component,
			material: m.material,
			category: best?.category ?? null,
			passage_ids: best?.passageIds ?? [],
			supported: Boolean(best)
		};
	});
}
function unansweredQuestions(analysis, answers) {
	return analysis.questions.filter((q) => !(q.id in answers)).length;
}
/**
* Turns a model recommendation (or the absence of one) into the stored result.
*
* Evidence text, preparation steps and component categories all come from the
* guide corpus, not from the model. `ai === null` means retrieval was below
* MIN_RELEVANCE_SCORE and no model call was made.
*/
function buildDisposal(args) {
	const terms = buildQueryForAnalysis(args.analysis, args.answers);
	const components = componentBreakdown(args.analysis);
	const generated_at = (/* @__PURE__ */ new Date()).toISOString();
	if (!args.ai) return {
		...notCoveredResult(),
		evidence: [],
		components,
		query: terms,
		generated_at
	};
	const validated = validateDisposal({
		ai: args.ai,
		retrievedIds: args.passages.map((p) => p.id),
		unansweredQuestions: unansweredQuestions(args.analysis, args.answers),
		topScore: args.topScore,
		terms
	});
	const evidence = validated.citations.flatMap((c) => {
		const p = lookupPassage(c.passage_id);
		if (!p || isPlaceholder(p)) return [];
		return [{
			id: p.id,
			title: p.title,
			category: p.category,
			scope: p.scope,
			source: p.source,
			section: p.section,
			url: p.url,
			topic: p.topic,
			text: p.text,
			relevance: c.relevance
		}];
	});
	const itemNote = hasPendingLocalRuleForItem(terms) ? ITEM_PENDING_NOTE : null;
	return {
		...validated,
		scope_note: validated.scope_note ?? itemNote,
		evidence,
		components,
		query: terms,
		generated_at
	};
}
//#endregion
export { buildDisposal, buildQueryForAnalysis, unansweredQuestions };
