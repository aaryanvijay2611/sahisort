import { m as isTodo, n as GUIDE_META, p as isPlaceholder, s as contactLine, t as GUIDE, u as hasPendingLocalRule } from "./guide-Dvwp24Fc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/disposal-rules-D4Sj2tb2.js
var NATIONAL_FALLBACK_NOTE = "No Gurugram-specific rule loaded for this item; showing the national rule.";
var ITEM_PENDING_NOTE = "No Gurugram-specific rule loaded for this item; this recommendation relies on the general rules.";
var CATEGORY_UNSUPPORTED_REASON = "Category not supported by cited passage";
/**
* Canonical category for whatever string the model returned. Returns null when
* the string names none of the five streams (e.g. "Unknown").
*/
function canonicalCategory(value) {
	const v = value.toLowerCase();
	for (const [category, pattern] of [
		["E-Waste", /e-?\s?waste|electronic/],
		["Domestic Hazardous", /hazardous/],
		["Sanitary", /sanitary/],
		["Wet Waste", /\bwet\b|biodegradable|organic/],
		["Dry Waste", /\bdry\b|recyclable|non-?biodegradable/]
	]) if (pattern.test(v)) return category;
	return null;
}
/**
* NOT_COVERED shortcut — returned when retrieval scores below
* MIN_RELEVANCE_SCORE, so no LLM call is made at all.
*/
function notCoveredResult() {
	return {
		status: "not_covered",
		category: "Unknown",
		explanation: `Not covered by this guide. SahiSort will not guess: please ${contactLine()} for item-specific instructions.`,
		preparation: [],
		conditions: [],
		exceptions: [],
		limitations: [`No passage in the ${GUIDE_META.locality} guide matched this item above the minimum relevance threshold.`, isTodo(GUIDE_META.guideTitle) ? "The Gurugram guide has not been loaded yet, so this may change once it is added." : "The guide may simply not cover this item."],
		citations: [],
		missing_information: [],
		general_advice: "",
		downgraded_reason: "No guide passage matched this item above the minimum relevance threshold.",
		scope_note: null
	};
}
/** Looks up a passage by id from the guide corpus. */
function lookupPassage(id) {
	return GUIDE.find((p) => p.id === id);
}
function normaliseStep(step) {
	return step.toLowerCase().replace(/\s+/g, " ").trim();
}
/**
* Preparation steps that the guide itself supports: the verbatim `prep_steps`
* of the cited passages, in citation order, deduplicated.
*
* Model-written steps are deliberately not passed through. The AI schema has no
* per-step passage id, so an ungrounded step cannot be traced to a rule and is
* dropped rather than shown.
*/
function groundedPreparation(citations) {
	const seen = /* @__PURE__ */ new Set();
	const steps = [];
	for (const c of citations) {
		const passage = lookupPassage(c.passage_id);
		if (!passage) continue;
		for (const step of passage.prep_steps) {
			const key = normaliseStep(step);
			if (!key || seen.has(key)) continue;
			seen.add(key);
			steps.push(step);
		}
	}
	return steps;
}
/**
* Enforces trust rules on an AI disposal recommendation:
*
* 1. Strip citations that reference IDs not actually retrieved.
* 2. Downgrade to "insufficient" if no valid citations remain.
* 3. Check the model's chosen category equals the category of at least one
*    cited passage; otherwise downgrade with
*    "Category not supported by cited passage".
* 4. Replace model-written preparation steps with the cited passages' own
*    prep_steps (never model text).
* 5. Downgrade "verified" → "conditional" when clarifying questions are open.
* 6. Note when a national rule is shown because the Gurugram rule is unfilled.
*/
function validateDisposal({ ai, retrievedIds, unansweredQuestions, topScore, terms = [] }) {
	if (topScore < 2) return notCoveredResult();
	const citations = ai.citations.filter((c) => {
		if (!retrievedIds.includes(c.passage_id)) return false;
		const passage = lookupPassage(c.passage_id);
		return passage ? !isPlaceholder(passage) : false;
	});
	let status = ai.status;
	let reason = null;
	if (retrievedIds.length === 0) {
		status = "insufficient";
		reason = "No guide passage matched this object.";
	} else if (status !== "insufficient" && citations.length === 0) {
		status = "insufficient";
		reason = "The recommendation did not cite any guide passage.";
	} else if (status !== "insufficient" && citations.length > 0) {
		const citedCategories = citations.map((c) => lookupPassage(c.passage_id)?.category).filter((cat) => Boolean(cat));
		const chosen = canonicalCategory(ai.category);
		if (!chosen || !citedCategories.includes(chosen)) {
			status = "insufficient";
			reason = CATEGORY_UNSUPPORTED_REASON;
		}
	}
	if (status === "verified" && unansweredQuestions > 0) {
		status = "conditional";
		reason = "Open clarification questions could change this recommendation.";
	}
	const scopeNote = citations.some((c) => {
		const p = lookupPassage(c.passage_id);
		return p?.scope === "national" && hasPendingLocalRule(p.id, terms);
	}) ? NATIONAL_FALLBACK_NOTE : null;
	return {
		...ai,
		status,
		citations,
		preparation: groundedPreparation(citations),
		downgraded_reason: reason,
		scope_note: scopeNote
	};
}
//#endregion
export { validateDisposal as a, notCoveredResult as i, canonicalCategory as n, lookupPassage as r, ITEM_PENDING_NOTE as t };
