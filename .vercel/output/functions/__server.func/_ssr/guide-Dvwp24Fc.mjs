import { r as __exportAll$1 } from "../_runtime.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-Dvwp24Fc.js
var guide_Dvwp24Fc_exports = /* @__PURE__ */ __exportAll$1({
	a: () => 2,
	c: () => contactLine,
	d: () => hasPendingLocalRule,
	f: () => hasPendingLocalRuleForItem,
	h: () => isTodo,
	i: () => LOCAL_PENDING,
	l: () => guideLabel,
	m: () => isPlaceholder,
	n: () => GUIDE_META,
	o: () => buildQuery,
	p: () => isGuidePending,
	r: () => LOCAL_LOADED,
	s: () => categoryForTerms,
	t: () => GUIDE,
	u: () => guide_exports
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var guide_exports = /* @__PURE__ */ __exportAll({
	GUIDE: () => GUIDE,
	GUIDE_META: () => GUIDE_META,
	LOCALITY_SHORT: () => LOCALITY_SHORT,
	LOCAL_LOADED: () => LOCAL_LOADED,
	LOCAL_PENDING: () => LOCAL_PENDING,
	MIN_RELEVANCE_SCORE: () => 2,
	TODO: () => TODO,
	buildQuery: () => buildQuery,
	categoryForTerms: () => categoryForTerms,
	contactLine: () => contactLine,
	guideLabel: () => guideLabel,
	hasPendingLocalRule: () => hasPendingLocalRule,
	hasPendingLocalRuleForItem: () => hasPendingLocalRuleForItem,
	isGuidePending: () => isGuidePending,
	isPlaceholder: () => isPlaceholder,
	isTodo: () => isTodo,
	retrieve: () => retrieve
});
/** The literal used to mark a value the locality has not supplied yet. */
var TODO = "TODO";
var GUIDE_META = {
	locality: "Gurugram (Gurgaon), Haryana",
	authority: "Municipal Corporation of Gurugram (MCG)",
	guideTitle: "Special Advisory for Bulk Waste Generators, Gurugram (April 2026)",
	guideSource: "MCG Memo No. MCG/JC-SBM/2026/1006 dated 26.05.2026 — https://www.mcg.gov.in/assets/notifications/Bulk-Waste-Generator-Advisory.pdf",
	lastUpdated: "2026-05-26",
	contact: "1800-180-1817"
};
/** Short form used in the header/footer line. */
var LOCALITY_SHORT = "Gurugram (Gurgaon)";
function isTodo(value) {
	return value.trim() === "" || value.trim().toUpperCase() === "TODO";
}
/** True until a real guide title is supplied. */
function isGuidePending() {
	return isTodo(GUIDE_META.guideTitle);
}
/** "Rules for: Gurugram (Gurgaon) - <guide title>" or "... - guide pending". */
function guideLabel() {
	return `Rules for: ${LOCALITY_SHORT} - ${isGuidePending() ? "guide pending" : GUIDE_META.guideTitle}`;
}
/** Sentence fragment telling the user who to contact; never invents a number. */
function contactLine() {
	return isTodo(GUIDE_META.contact) ? "contact your local MCG office" : `contact ${GUIDE_META.authority} on ${GUIDE_META.contact}`;
}
var SWM = "Solid Waste Management Rules, 2016 (MoEFCC)";
var SWM_URL = "https://cpcb.nic.in/uploads/MSW/SWM_2016.pdf";
var PWM = "Plastic Waste Management Rules, 2016 (as amended 2021–2022)";
var PWM_URL = "https://cpcb.nic.in/plastic-waste/";
var NATIONAL = [
	{
		id: "swm-segregation",
		title: "Segregation at source",
		category: "Dry Waste",
		scope: "national",
		source: SWM,
		section: "Rule 4 — Duties of waste generators",
		url: SWM_URL,
		topic: "Segregation at source",
		keywords: [
			"segregate",
			"wet",
			"dry",
			"hazardous",
			"household",
			"bin",
			"general"
		],
		text: "Every waste generator should segregate waste at source into three streams — biodegradable (wet), non-biodegradable (dry) and domestic hazardous — and hand it over to authorised waste pickers or collectors as directed by the local body.",
		prep_steps: ["Keep three separate labelled bins for wet, dry and domestic hazardous waste.", "Hand segregated waste to your authorised waste collector."]
	},
	{
		id: "swm-wet",
		title: "Wet / biodegradable waste",
		category: "Wet Waste",
		scope: "national",
		source: SWM,
		section: "Rule 4 — Biodegradable waste",
		url: SWM_URL,
		topic: "Wet / biodegradable waste",
		keywords: [
			"food",
			"organic",
			"peel",
			"vegetable",
			"fruit",
			"leaf",
			"garden",
			"compost",
			"biodegradable",
			"wet",
			"tea",
			"coffee",
			"wood",
			"bamboo",
			"leftover",
			"cooked",
			"banana",
			"kitchen"
		],
		text: "Biodegradable waste such as food scraps, peels and garden waste belongs in the wet stream. The rules encourage composting or bio-methanation, including on-site composting where feasible.",
		prep_steps: ["Place food scraps, peels and garden waste in the wet (green) bin.", "Consider composting at home if feasible."]
	},
	{
		id: "swm-dry",
		title: "Dry / non-biodegradable waste",
		category: "Dry Waste",
		scope: "national",
		source: SWM,
		section: "Rule 4 — Non-biodegradable waste",
		url: SWM_URL,
		topic: "Dry / non-biodegradable waste",
		keywords: [
			"paper",
			"newspaper",
			"cardboard",
			"plastic",
			"glass",
			"metal",
			"aluminium",
			"foil",
			"tin",
			"can",
			"bottle",
			"jar",
			"carton",
			"dry",
			"recyclable",
			"textile",
			"rubber",
			"ceramic",
			"plate",
			"broken"
		],
		text: "Dry waste — paper, cardboard, plastics, glass, metal, rubber and textiles — should be kept clean and separate from wet waste so it can be handed to authorised recyclers or the local body's dry-waste collection.",
		prep_steps: [
			"Rinse containers to remove food residue before placing in dry waste.",
			"Flatten cardboard boxes to save space.",
			"Keep dry waste separate from wet waste at all times."
		]
	},
	{
		id: "swm-hazardous",
		title: "Domestic hazardous waste",
		category: "Domestic Hazardous",
		scope: "national",
		source: SWM,
		section: "Rule 4 — Domestic hazardous waste",
		url: SWM_URL,
		topic: "Domestic hazardous waste",
		keywords: [
			"paint",
			"pesticide",
			"bulb",
			"cfl",
			"tube",
			"light",
			"thermometer",
			"mercury",
			"chemical",
			"aerosol",
			"spray",
			"medicine",
			"tablet",
			"strip",
			"pill",
			"syringe",
			"hazardous",
			"cleaner",
			"solvent",
			"battery"
		],
		text: "Domestic hazardous waste — for example discarded paint drums, pesticide cans, CFL bulbs, tube lights, expired medicines, broken mercury thermometers and used batteries — must be stored separately and deposited at collection points or with collectors designated by the local body.",
		prep_steps: [
			"Do not mix with regular household waste.",
			"Store in original containers where possible.",
			"Deposit at the local body's designated domestic hazardous waste collection point."
		]
	},
	{
		id: "swm-sanitary",
		title: "Sanitary waste",
		category: "Sanitary",
		scope: "national",
		source: SWM,
		section: "Rule 4 — Sanitary waste",
		url: SWM_URL,
		topic: "Sanitary waste",
		keywords: [
			"diaper",
			"nappy",
			"sanitary",
			"pad",
			"tampon",
			"condom",
			"tissue"
		],
		text: "Used sanitary waste such as diapers and sanitary pads should be wrapped securely in the pouches provided by manufacturers or in a suitable wrapping material and placed in the dry-waste bin, kept separate from other dry recyclables.",
		prep_steps: ["Wrap used sanitary items in the original pouch or newspaper before disposal.", "Place in the dry-waste bin, not with recyclable dry waste."]
	},
	{
		id: "swm-no-burn",
		title: "No burning or open dumping",
		category: "Dry Waste",
		scope: "national",
		source: SWM,
		section: "Rule 4 — Prohibited practices",
		url: SWM_URL,
		topic: "No burning or dumping",
		keywords: [
			"burn",
			"dump",
			"litter",
			"drain",
			"street",
			"general"
		],
		text: "Waste generators must not throw, burn or bury solid waste on streets, open public spaces, drains or water bodies.",
		prep_steps: []
	},
	{
		id: "swm-bulky",
		title: "Construction and bulky waste",
		category: "Dry Waste",
		scope: "national",
		source: SWM,
		section: "Rule 4 — Construction & horticulture waste",
		url: SWM_URL,
		topic: "Bulky and construction waste",
		keywords: [
			"construction",
			"debris",
			"brick",
			"tile",
			"cement",
			"furniture",
			"garden",
			"bulky",
			"demolition"
		],
		text: "Construction and demolition waste and horticulture or garden waste should be stored separately at the generator's premises and disposed of as per the local body's instructions, not mixed with household waste.",
		prep_steps: ["Store construction debris separately on your premises.", "Contact your local body for collection or drop-off instructions."]
	},
	{
		id: "pwm-sup",
		title: "Banned single-use plastics",
		category: "Dry Waste",
		scope: "national",
		source: PWM,
		section: "Single-use plastic prohibition (from 1 July 2022)",
		url: PWM_URL,
		topic: "Banned single-use plastics",
		keywords: [
			"straw",
			"cutlery",
			"spoon",
			"fork",
			"plate",
			"cup",
			"earbud",
			"stirrer",
			"thermocol",
			"polystyrene",
			"balloon",
			"flag",
			"candy",
			"single-use",
			"plastic"
		],
		text: "Manufacture, sale and use of identified single-use plastic items — including plastic cutlery, plates, cups, straws, stirrers, earbuds with plastic sticks, plastic sticks for balloons, flags and candy, and polystyrene (thermocol) decoration — is prohibited. Existing items should go to the dry stream, not be reused for food.",
		prep_steps: ["Place used single-use plastic items in the dry waste bin.", "Do not reuse for food contact."]
	},
	{
		id: "pwm-mlp",
		title: "Multilayer packaging (EPR)",
		category: "Dry Waste",
		scope: "national",
		source: PWM,
		section: "Multilayered packaging & EPR",
		url: PWM_URL,
		topic: "Multilayer packaging and producer responsibility",
		keywords: [
			"wrapper",
			"chips",
			"sachet",
			"pouch",
			"multilayer",
			"laminated",
			"tetra",
			"carton",
			"packaging",
			"film",
			"bag"
		],
		text: "Multilayered packaging such as chip packets, sachets and laminated pouches falls under Extended Producer Responsibility; brand owners must arrange collection. Households should keep these clean and dry and hand them over with dry waste or to producer take-back channels where available.",
		prep_steps: ["Keep wrapper clean and dry.", "Hand over with dry waste or to a producer take-back channel."]
	},
	{
		id: "pwm-carry-bag",
		title: "Plastic carry bags",
		category: "Dry Waste",
		scope: "national",
		source: PWM,
		section: "Carry bags — thickness requirement",
		url: PWM_URL,
		topic: "Plastic carry bags",
		keywords: [
			"carry bag",
			"polythene",
			"bag",
			"shopping bag"
		],
		text: "Plastic carry bags below the prescribed thickness (120 microns from 31 December 2022) are not permitted. Used carry bags should be kept clean and sent with dry waste for recycling.",
		prep_steps: ["Keep the bag clean.", "Send with dry waste for recycling."]
	},
	{
		id: "ew-consumer",
		title: "Electronic and electrical waste",
		category: "E-Waste",
		scope: "national",
		source: "E-Waste (Management) Rules, 2022",
		section: "Rule 16 — Responsibilities of consumers",
		url: "https://cpcb.nic.in/e-waste/",
		topic: "Electronic waste",
		keywords: [
			"electronic",
			"phone",
			"charger",
			"cable",
			"laptop",
			"computer",
			"keyboard",
			"earphone",
			"headphone",
			"tv",
			"appliance",
			"e-waste",
			"circuit",
			"battery-powered",
			"remote",
			"router"
		],
		text: "Electrical and electronic equipment at end of life must be channelled to registered producers' take-back or collection systems, or to registered dismantlers and recyclers. It should not be placed in regular household waste.",
		prep_steps: [
			"Locate your brand's authorised take-back or collection point.",
			"Do not place in regular household waste.",
			"Remove personal data from phones/laptops before handing over."
		]
	},
	{
		id: "bw-consumer",
		title: "Waste batteries",
		category: "Domestic Hazardous",
		scope: "national",
		source: "Battery Waste Management Rules, 2022",
		section: "Rule 5 — Responsibilities of consumers",
		url: "https://cpcb.nic.in/battery-waste/",
		topic: "Batteries",
		keywords: [
			"battery",
			"batteries",
			"cell",
			"aa",
			"aaa",
			"lithium",
			"power bank",
			"button cell"
		],
		text: "Waste batteries of all chemistries are covered by Extended Producer Responsibility. Consumers should return them through producer or authorised collection channels rather than discarding them with household waste.",
		prep_steps: [
			"Return to a producer authorised collection point or retailer take-back.",
			"Do not place in regular household waste.",
			"Do not puncture or dismantle batteries."
		]
	}
];
var MCG_SOURCE = "Special Advisory for Bulk Waste Generators, Gurugram (MCG, April 2026)";
var MCG_URL = "https://www.mcg.gov.in/assets/notifications/Bulk-Waste-Generator-Advisory.pdf";
var MCG_DRY_DEF = "“dry waste” means waste other than wet waste sanitary waste, special care waste and includes recyclable waste and non-recyclable waste;";
var MCG_DRY_LIST = "The various dry waste such paper, cardboard, plastics, metal, glass, packaging materials, textiles, thermocol, etc shall be handed over to either authorised waste pickers or authorized recyclers or Agencies authorised by MCG.";
var MCG_WET_DEF = "“wet waste” means and includes organic waste including kitchen waste, food waste, vegetable waste, meat waste, fruits waste, flower waste, and such similar waste and biodegradable waste.";
var MCG_WET_RULES = "Wet waste must not be mixed with dry or hazardous waste and must not be sent to landfill. 100% of biodegradable waste such as routine kitchen, canteen and food waste etc. has to be processed within premises as far as possible through composting or bio-methanation or by using any other machines as mentioned in the MOHUA Guidelines for BWGs (Nov. 2017).";
var MCG_SPECIAL_DEF = "“special care waste” means and includes discarded paint drums, pesticide cans or containers or bottles, compact fluorescent lamp or bulbs, tube lights, expired medicines, broken mercury thermometers, waste batteries, used or waste needles and syringes and contaminated gauge, or any other waste notified by Central Pollution Control Board from time to time, generated at the household level;";
var MCG_SPECIAL_LIST = "The various special care waste such as discarded paint drums, pesticide cans or containers or bottles, compact fluorescent lamp or bulbs, tube lights, expired medicines, broken mercury thermometers, waste batteries, used or waste needles and syringes and contaminated gauge, etc shall be handed over to either authorised waste pickers or authorized recyclers or Agencies authorised by MCG.";
var MCG_SANITARY = "wrap securely the used sanitary waste like diapers, sanitary pads etc., in the pouches provided by the manufacturers or brand owners of these products or in a suitable wrapping material as instructed by the local bodies or authorities and shall place the same in the sanitary waste bin separate from bins meant for dry waste or wet waste or special care waste;";
var MCG_EWASTE = "E-Waste such as computers, printers, wires, CFLs, shall be stored in separate room / cage or lockers for temporary storage. E-Waste shall be disposed off through authorised e-waste recyclers.";
var DRY_TEXT = `${MCG_DRY_DEF} ${MCG_DRY_LIST}`;
var WET_TEXT = `${MCG_WET_DEF} ${MCG_WET_RULES}`;
var SPECIAL_TEXT = `${MCG_SPECIAL_DEF} ${MCG_SPECIAL_LIST}`;
var DRY_PREP = ["Hand dry waste over to authorised waste pickers, authorised recyclers, or Agencies authorised by MCG."];
var WET_PREP = [
	"Do not mix wet waste with dry or hazardous waste.",
	"Do not send wet waste to landfill.",
	"Process biodegradable waste within the premises through composting or bio-methanation as far as possible."
];
var SPECIAL_PREP = ["Keep special care waste separate at the household level.", "Hand it over to authorised waste pickers, authorised recyclers, or Agencies authorised by MCG."];
var SANITARY_PREP = ["Wrap it securely in the pouch provided by the manufacturer or in a suitable wrapping material.", "Place it in the sanitary waste bin, separate from dry, wet and special care waste."];
var EWASTE_PREP = ["Store e-waste separately (a room, cage or locker) for temporary storage.", "Dispose of it through an authorised e-waste recycler."];
var SECTION_DRY = "§3.2 II (Dry Waste); §3.1(b)";
var SECTION_WET = "§3.2 I (Wet Waste); §3.1(a)";
var SECTION_SPECIAL = "§3.2 III (Special Care Waste); §3.1(d)";
var SECTION_SANITARY = "§3.2 IV (Sanitary Waste); §3.1(c)";
var SECTION_EWASTE = "§3.2 VII (E-Waste)";
/** Builds a Gurugram passage that shares the advisory's source and URL. */
function mcg(id, title, category, section, text, prep_steps, keywords, replaces) {
	return {
		id,
		title,
		category,
		scope: "local",
		source: MCG_SOURCE,
		section,
		url: MCG_URL,
		topic: title,
		keywords,
		text,
		prep_steps,
		replaces
	};
}
var LOCAL = [
	mcg("local-plastic-bottle", "Plastic bottle", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"plastic",
		"bottle",
		"pet",
		"water bottle",
		"cold drink"
	], ["swm-dry", "pwm-sup"]),
	mcg("local-newspaper", "Newspaper", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"newspaper",
		"paper",
		"news",
		"print"
	], ["swm-dry"]),
	mcg("local-cardboard-box", "Cardboard box", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"cardboard",
		"box",
		"carton",
		"corrugated",
		"packaging"
	], ["swm-dry"]),
	mcg("local-greasy-pizza-box", "Greasy pizza box", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"pizza",
		"box",
		"cardboard",
		"greasy",
		"oily",
		"food stained"
	], ["swm-dry"]),
	mcg("local-coffee-cup", "Takeaway coffee cup with lid", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"coffee",
		"cup",
		"paper cup",
		"lid",
		"takeaway",
		"lining"
	], ["pwm-sup", "swm-dry"]),
	mcg("local-tetra-pak", "Tetra Pak carton", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"tetra",
		"pak",
		"carton",
		"juice",
		"milk",
		"laminated",
		"aseptic"
	], ["pwm-mlp", "swm-dry"]),
	mcg("local-mlp-wrapper", "Chips / multilayer wrapper", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"chips",
		"wrapper",
		"sachet",
		"multilayer",
		"packet",
		"snack",
		"foil"
	], ["pwm-mlp"]),
	mcg("local-banana-peel", "Banana peel", "Wet Waste", SECTION_WET, WET_TEXT, WET_PREP, [
		"banana",
		"peel",
		"fruit",
		"organic",
		"food"
	], ["swm-wet"]),
	mcg("local-cooked-leftovers", "Cooked leftovers", "Wet Waste", SECTION_WET, WET_TEXT, WET_PREP, [
		"leftovers",
		"cooked",
		"food",
		"curry",
		"rice",
		"kitchen"
	], ["swm-wet"]),
	mcg("local-used-battery", "Used battery — special care waste", "Domestic Hazardous", SECTION_SPECIAL, SPECIAL_TEXT, SPECIAL_PREP, [
		"battery",
		"batteries",
		"cell",
		"aa",
		"aaa",
		"lithium"
	], ["bw-consumer", "swm-hazardous"]),
	mcg("local-cfl-bulb", "CFL bulb — special care waste", "Domestic Hazardous", SECTION_SPECIAL, SPECIAL_TEXT, SPECIAL_PREP, [
		"cfl",
		"bulb",
		"tube",
		"light",
		"mercury",
		"lamp"
	], ["swm-hazardous"]),
	mcg("local-phone-charger", "Phone charger — e-waste", "E-Waste", SECTION_EWASTE, MCG_EWASTE, EWASTE_PREP, [
		"charger",
		"cable",
		"adapter",
		"usb",
		"cord",
		"electronic"
	], ["ew-consumer"]),
	mcg("local-old-phone", "Old phone — e-waste", "E-Waste", SECTION_EWASTE, MCG_EWASTE, EWASTE_PREP, [
		"phone",
		"mobile",
		"smartphone",
		"handset",
		"electronic"
	], ["ew-consumer"]),
	mcg("local-sanitary-pad", "Sanitary pad — sanitary waste", "Sanitary", SECTION_SANITARY, MCG_SANITARY, SANITARY_PREP, [
		"sanitary",
		"pad",
		"napkin",
		"menstrual"
	], ["swm-sanitary"]),
	mcg("local-medicine-strip", "Medicine strip — special care waste", "Domestic Hazardous", SECTION_SPECIAL, SPECIAL_TEXT, SPECIAL_PREP, [
		"medicine",
		"tablet",
		"strip",
		"pill",
		"expired",
		"pharma"
	], ["swm-hazardous"]),
	mcg("local-aerosol-can", "Aerosol can", "Domestic Hazardous", "TODO — not covered by the MCG advisory", "", [], [
		"aerosol",
		"spray",
		"deodorant",
		"pressurised"
	], ["swm-hazardous"]),
	mcg("local-ceramic-plate", "Broken ceramic plate", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"ceramic",
		"plate",
		"broken",
		"crockery",
		"shard",
		"porcelain"
	], ["swm-dry", "swm-bulky"]),
	mcg("local-aluminium-foil", "Aluminium foil", "Dry Waste", SECTION_DRY, DRY_TEXT, DRY_PREP, [
		"aluminium",
		"foil",
		"wrap",
		"metal",
		"silver"
	], ["swm-dry"])
];
/** A passage with no text yet. Never retrieved and never displayed as a rule. */
function isPlaceholder(p) {
	return p.text.trim().length === 0;
}
/** Local rules that have been filled in. */
var LOCAL_LOADED = LOCAL.filter((p) => !isPlaceholder(p));
/** Local rules still waiting for their verbatim text. */
var LOCAL_PENDING = LOCAL.filter(isPlaceholder);
/** Everything filled in, local first. Placeholders are deliberately excluded. */
var GUIDE = [...LOCAL_LOADED, ...NATIONAL];
var STOP = /* @__PURE__ */ new Set([
	"the",
	"a",
	"an",
	"of",
	"and",
	"or",
	"with",
	"for",
	"to",
	"in",
	"on",
	"is",
	"it",
	"my",
	"this",
	"that"
]);
function buildQuery(parts) {
	return Array.from(new Set(parts.filter(Boolean).join(" ").toLowerCase().split(/[^a-z0-9-]+/).filter((t) => t.length > 2 && !STOP.has(t))));
}
function keywordTokens(p) {
	return p.keywords.flatMap((k) => k.toLowerCase().split(/[^a-z0-9-]+/).filter((t) => t.length > 2 && !STOP.has(t)));
}
/** Lightweight keyword retrieval with provenance.
*
*  - Placeholders (empty text) are excluded: an unfilled local rule can never
*    be cited or shown as guidance.
*  - Local-scope passages receive a +2 priority bonus and win ties, so a loaded
*    Gurugram rule outranks the national rule it supersedes.
*  - Returns the best `topScore` so callers can skip the LLM entirely below
*    MIN_RELEVANCE_SCORE.
*/
function retrieve(terms, limit = 5) {
	const scored = GUIDE.map((p) => {
		const hay = (p.keywords.join(" ") + " " + p.text + " " + p.topic).toLowerCase();
		let score = 0;
		for (const t of terms) if (p.keywords.some((k) => k === t || k.startsWith(t) || t.startsWith(k) || t.length >= 4 && (k.includes(t) || t.includes(k)))) score += 3;
		else if (hay.includes(t)) score += 1;
		if (p.scope === "local" && score > 0) score += 2;
		return {
			p,
			score
		};
	}).filter((s) => s.score > 0).sort((a, b) => {
		if (b.score !== a.score) return b.score - a.score;
		if (a.p.scope !== b.p.scope) return a.p.scope === "local" ? -1 : 1;
		return a.p.id.localeCompare(b.p.id);
	});
	const chosen = [];
	const seenText = /* @__PURE__ */ new Set();
	for (const { p } of scored) {
		const key = p.text.trim().toLowerCase();
		if (seenText.has(key)) continue;
		seenText.add(key);
		chosen.push(p);
		if (chosen.length >= limit) break;
	}
	return {
		passages: chosen,
		topScore: scored[0]?.score ?? 0
	};
}
/** Best supported category for a free-text material description, or null. */
function categoryForTerms(terms) {
	const { passages, topScore } = retrieve(terms, 3);
	const best = passages[0];
	if (!best || topScore < 2) return null;
	return {
		category: best.category,
		passageIds: passages.filter((p) => p.category === best.category).map((p) => p.id),
		score: topScore
	};
}
/**
* True when the item still has an unfilled local rule and we are about to show
* the national rule instead. Used for the "no Gurugram-specific rule loaded"
* note. Matching is by the placeholder's own keywords so the note is tied to
* the item at hand, not to every item that shares a national passage.
*/
function hasPendingLocalRule(nationalPassageId, terms) {
	const query = new Set(terms.map((t) => t.toLowerCase()));
	return LOCAL_PENDING.some((p) => {
		if (!(p.replaces ?? []).includes(nationalPassageId)) return false;
		return keywordTokens(p).some((k) => query.has(k) || [...query].some((t) => k.startsWith(t) || t.startsWith(k)));
	});
}
/**
* True when the item itself has an unfilled local rule. Used to warn that any
* recommendation for it rests on general rules, whichever passage was cited.
*/
function hasPendingLocalRuleForItem(terms) {
	const query = new Set(terms.map((t) => t.toLowerCase()));
	return LOCAL_PENDING.some((p) => keywordTokens(p).some((k) => query.has(k) || [...query].some((t) => k.startsWith(t) || t.startsWith(k))));
}
//#endregion
export { buildQuery as a, guideLabel as c, hasPendingLocalRuleForItem as d, isGuidePending as f, LOCAL_PENDING as i, guide_Dvwp24Fc_exports as l, isTodo as m, GUIDE_META as n, categoryForTerms as o, isPlaceholder as p, LOCAL_LOADED as r, contactLine as s, GUIDE as t, hasPendingLocalRule as u };
