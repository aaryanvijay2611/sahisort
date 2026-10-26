/**
 * Waste-management guide used by SahiSort.
 *
 * ONE LOCALITY, ONE GUIDE
 * -----------------------
 * The app supports a single locality: Gurugram (Gurgaon), Haryana, served by the
 * Municipal Corporation of Gurugram (MCG). The local passages are copied verbatim
 * from MCG's "Special Advisory for Bulk Waste Generators, Gurugram" (April 2026,
 * Memo No. MCG/JC-SBM/2026/1006 dated 26.05.2026), §3.1 and §3.2, which restate
 * the household-level segregation streams. If MCG publishes a household-specific
 * segregation guide, replace the LOCAL PASSAGES block with that document.
 *
 * STRUCTURE
 * ---------
 * Every passage has:
 *   id           – stable kebab-case identifier used in citations
 *   title        – short human-readable label
 *   category     – one of the five stream categories defined in WasteCategory
 *   scope        – "national" (Indian statute) | "local" (Gurugram guide)
 *   source       – document name
 *   section      – section / page inside that document
 *   url          – official source URL ("" when the guide is a printed document)
 *   topic        – short topic label used for display
 *   keywords     – retrieval tokens
 *   text         – VERBATIM text (do NOT paraphrase). "" means NOT YET FILLED IN,
 *                  which makes the passage a placeholder: it is excluded from
 *                  retrieval and never shown as a rule.
 *   prep_steps   – preparation steps stated in, or directly supported by, `text`
 *   replaces     – local only: national passage ids this local rule supersedes
 *
 * LOCAL GUIDE SETUP
 * -----------------
 * 1. GUIDE_META records the document the local passages came from. `contact` was
 *    supplied by the project owner (the advisory announces a helpline but does
 *    not print the number) — confirm it before a public demo.
 * 2. Local passages carry `source` / `section` / `url` pointing at the advisory.
 *    Copy new text verbatim; never paraphrase a rule.
 * 3. A passage with an empty `text` is a placeholder: excluded from retrieval and
 *    never shown. `local-aerosol-can` is the one item the advisory does not cover.
 *
 * Local passages take priority over national ones in retrieval, and an unfilled
 * placeholder makes the app say "No Gurugram-specific rule loaded for this item;
 * showing the national rule." for the matching national passage.
 *
 * CATEGORIES
 * ----------
 * "Dry Waste" | "Wet Waste" | "Domestic Hazardous" | "E-Waste" | "Sanitary"
 */

export type WasteCategory =
  | "Dry Waste"
  | "Wet Waste"
  | "Domestic Hazardous"
  | "E-Waste"
  | "Sanitary";

export type GuideScope = "national" | "local";

export type GuidePassage = {
  id: string;
  title: string;
  category: WasteCategory;
  scope: GuideScope;
  source: string;
  section: string;
  url: string;
  topic: string;
  keywords: string[];
  text: string;
  prep_steps: string[];
  replaces?: string[];
};

// ─── Guide metadata ─────────────────────────────────────────────────────────
// Anything marked "TODO" has not been supplied yet. Do not guess local facts:
// the UI shows "guide pending" and a warning instead of inventing them.

/** The literal used to mark a value the locality has not supplied yet. */
export const TODO = "TODO";

export const GUIDE_META = {
  locality: "Gurugram (Gurgaon), Haryana",
  authority: "Municipal Corporation of Gurugram (MCG)",
  guideTitle: "Special Advisory for Bulk Waste Generators, Gurugram (April 2026)",
  guideSource:
    "MCG Memo No. MCG/JC-SBM/2026/1006 dated 26.05.2026 — https://www.mcg.gov.in/assets/notifications/Bulk-Waste-Generator-Advisory.pdf",
  lastUpdated: "2026-05-26",
  // Supplied by the project owner (the advisory announces a BWG helpline but
  // does not print the number). Verify before any public demo.
  contact: "1800-180-1817", // helpline / office to contact when an item is not covered
} as const;

/** Short form used in the header/footer line. */
export const LOCALITY_SHORT = "Gurugram (Gurgaon)";

export function isTodo(value: string): boolean {
  return value.trim() === "" || value.trim().toUpperCase() === TODO;
}

/** True until a real guide title is supplied. */
export function isGuidePending(): boolean {
  return isTodo(GUIDE_META.guideTitle);
}

/** "Rules for: Gurugram (Gurgaon) - <guide title>" or "... - guide pending". */
export function guideLabel(): string {
  return `Rules for: ${LOCALITY_SHORT} - ${isGuidePending() ? "guide pending" : GUIDE_META.guideTitle}`;
}

/** Sentence fragment telling the user who to contact; never invents a number. */
export function contactLine(): string {
  return isTodo(GUIDE_META.contact)
    ? "contact your local MCG office"
    : `contact ${GUIDE_META.authority} on ${GUIDE_META.contact}`;
}

// ─── Minimum relevance score to attempt the LLM call ────────────────────────
// If the best-scoring passage is below this, computeDisposal skips the model
// entirely and returns status "not_covered".
export const MIN_RELEVANCE_SCORE = 2;

// ─── Statutory references ────────────────────────────────────────────────────
const SWM = "Solid Waste Management Rules, 2016 (MoEFCC)";
const SWM_URL = "https://cpcb.nic.in/uploads/MSW/SWM_2016.pdf";
const PWM = "Plastic Waste Management Rules, 2016 (as amended 2021–2022)";
const PWM_URL = "https://cpcb.nic.in/plastic-waste/";
const EW = "E-Waste (Management) Rules, 2022";
const EW_URL = "https://cpcb.nic.in/e-waste/";
const BW = "Battery Waste Management Rules, 2022";
const BW_URL = "https://cpcb.nic.in/battery-waste/";

// ─── NATIONAL PASSAGES ───────────────────────────────────────────────────────
// Existing statutory corpus. Text is unchanged; scope is now explicit.

const NATIONAL: GuidePassage[] = [
  {
    id: "swm-segregation",
    title: "Segregation at source",
    category: "Dry Waste", // General guidance — assigned Dry Waste as neutral default
    scope: "national",
    source: SWM,
    section: "Rule 4 — Duties of waste generators",
    url: SWM_URL,
    topic: "Segregation at source",
    keywords: ["segregate", "wet", "dry", "hazardous", "household", "bin", "general"],
    text: "Every waste generator should segregate waste at source into three streams — biodegradable (wet), non-biodegradable (dry) and domestic hazardous — and hand it over to authorised waste pickers or collectors as directed by the local body.",
    prep_steps: [
      "Keep three separate labelled bins for wet, dry and domestic hazardous waste.",
      "Hand segregated waste to your authorised waste collector.",
    ],
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
      "kitchen",
    ],
    text: "Biodegradable waste such as food scraps, peels and garden waste belongs in the wet stream. The rules encourage composting or bio-methanation, including on-site composting where feasible.",
    prep_steps: [
      "Place food scraps, peels and garden waste in the wet (green) bin.",
      "Consider composting at home if feasible.",
    ],
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
      "broken",
    ],
    text: "Dry waste — paper, cardboard, plastics, glass, metal, rubber and textiles — should be kept clean and separate from wet waste so it can be handed to authorised recyclers or the local body's dry-waste collection.",
    prep_steps: [
      "Rinse containers to remove food residue before placing in dry waste.",
      "Flatten cardboard boxes to save space.",
      "Keep dry waste separate from wet waste at all times.",
    ],
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
      "battery",
    ],
    text: "Domestic hazardous waste — for example discarded paint drums, pesticide cans, CFL bulbs, tube lights, expired medicines, broken mercury thermometers and used batteries — must be stored separately and deposited at collection points or with collectors designated by the local body.",
    prep_steps: [
      "Do not mix with regular household waste.",
      "Store in original containers where possible.",
      "Deposit at the local body's designated domestic hazardous waste collection point.",
    ],
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
    keywords: ["diaper", "nappy", "sanitary", "pad", "tampon", "condom", "tissue"],
    text: "Used sanitary waste such as diapers and sanitary pads should be wrapped securely in the pouches provided by manufacturers or in a suitable wrapping material and placed in the dry-waste bin, kept separate from other dry recyclables.",
    prep_steps: [
      "Wrap used sanitary items in the original pouch or newspaper before disposal.",
      "Place in the dry-waste bin, not with recyclable dry waste.",
    ],
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
    keywords: ["burn", "dump", "litter", "drain", "street", "general"],
    text: "Waste generators must not throw, burn or bury solid waste on streets, open public spaces, drains or water bodies.",
    prep_steps: [],
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
      "demolition",
    ],
    text: "Construction and demolition waste and horticulture or garden waste should be stored separately at the generator's premises and disposed of as per the local body's instructions, not mixed with household waste.",
    prep_steps: [
      "Store construction debris separately on your premises.",
      "Contact your local body for collection or drop-off instructions.",
    ],
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
      "plastic",
    ],
    text: "Manufacture, sale and use of identified single-use plastic items — including plastic cutlery, plates, cups, straws, stirrers, earbuds with plastic sticks, plastic sticks for balloons, flags and candy, and polystyrene (thermocol) decoration — is prohibited. Existing items should go to the dry stream, not be reused for food.",
    prep_steps: [
      "Place used single-use plastic items in the dry waste bin.",
      "Do not reuse for food contact.",
    ],
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
      "bag",
    ],
    text: "Multilayered packaging such as chip packets, sachets and laminated pouches falls under Extended Producer Responsibility; brand owners must arrange collection. Households should keep these clean and dry and hand them over with dry waste or to producer take-back channels where available.",
    prep_steps: [
      "Keep wrapper clean and dry.",
      "Hand over with dry waste or to a producer take-back channel.",
    ],
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
    keywords: ["carry bag", "polythene", "bag", "shopping bag"],
    text: "Plastic carry bags below the prescribed thickness (120 microns from 31 December 2022) are not permitted. Used carry bags should be kept clean and sent with dry waste for recycling.",
    prep_steps: ["Keep the bag clean.", "Send with dry waste for recycling."],
  },
  {
    id: "ew-consumer",
    title: "Electronic and electrical waste",
    category: "E-Waste",
    scope: "national",
    source: EW,
    section: "Rule 16 — Responsibilities of consumers",
    url: EW_URL,
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
      "router",
    ],
    text: "Electrical and electronic equipment at end of life must be channelled to registered producers' take-back or collection systems, or to registered dismantlers and recyclers. It should not be placed in regular household waste.",
    prep_steps: [
      "Locate your brand's authorised take-back or collection point.",
      "Do not place in regular household waste.",
      "Remove personal data from phones/laptops before handing over.",
    ],
  },
  {
    id: "bw-consumer",
    title: "Waste batteries",
    category: "Domestic Hazardous",
    scope: "national",
    source: BW,
    section: "Rule 5 — Responsibilities of consumers",
    url: BW_URL,
    topic: "Batteries",
    keywords: ["battery", "batteries", "cell", "aa", "aaa", "lithium", "power bank", "button cell"],
    text: "Waste batteries of all chemistries are covered by Extended Producer Responsibility. Consumers should return them through producer or authorised collection channels rather than discarding them with household waste.",
    prep_steps: [
      "Return to a producer authorised collection point or retailer take-back.",
      "Do not place in regular household waste.",
      "Do not puncture or dismantle batteries.",
    ],
  },
];

// ─── LOCAL PASSAGES (Gurugram) ───────────────────────────────────────────────
// Verbatim from MCG's "Special Advisory for Bulk Waste Generators, Gurugram"
// (April 2026), §3.1 and §3.2. An entry with an empty `text` is still a
// placeholder: excluded from retrieval and never shown as a rule.
//
// `replaces` lists the national passages this local rule supersedes. It is what
// lets the UI say "no Gurugram-specific rule loaded for this item" when a
// national rule is shown instead — still true for the aerosol can.

const MCG_SOURCE = "Special Advisory for Bulk Waste Generators, Gurugram (MCG, April 2026)";
const MCG_URL =
  "https://www.mcg.gov.in/assets/notifications/Bulk-Waste-Generator-Advisory.pdf";

// Verbatim text from §3.1 (types of waste) and §3.2 (management of streams) of
// the MCG advisory. Do not paraphrase: re-copy from the PDF if it is revised.
const MCG_DRY_DEF =
  "“dry waste” means waste other than wet waste sanitary waste, special care waste and includes recyclable waste and non-recyclable waste;";
const MCG_DRY_LIST =
  "The various dry waste such paper, cardboard, plastics, metal, glass, packaging materials, textiles, thermocol, etc shall be handed over to either authorised waste pickers or authorized recyclers or Agencies authorised by MCG.";
const MCG_WET_DEF =
  "“wet waste” means and includes organic waste including kitchen waste, food waste, vegetable waste, meat waste, fruits waste, flower waste, and such similar waste and biodegradable waste.";
const MCG_WET_RULES =
  "Wet waste must not be mixed with dry or hazardous waste and must not be sent to landfill. 100% of biodegradable waste such as routine kitchen, canteen and food waste etc. has to be processed within premises as far as possible through composting or bio-methanation or by using any other machines as mentioned in the MOHUA Guidelines for BWGs (Nov. 2017).";
const MCG_SPECIAL_DEF =
  "“special care waste” means and includes discarded paint drums, pesticide cans or containers or bottles, compact fluorescent lamp or bulbs, tube lights, expired medicines, broken mercury thermometers, waste batteries, used or waste needles and syringes and contaminated gauge, or any other waste notified by Central Pollution Control Board from time to time, generated at the household level;";
const MCG_SPECIAL_LIST =
  "The various special care waste such as discarded paint drums, pesticide cans or containers or bottles, compact fluorescent lamp or bulbs, tube lights, expired medicines, broken mercury thermometers, waste batteries, used or waste needles and syringes and contaminated gauge, etc shall be handed over to either authorised waste pickers or authorized recyclers or Agencies authorised by MCG.";
const MCG_SANITARY =
  "wrap securely the used sanitary waste like diapers, sanitary pads etc., in the pouches provided by the manufacturers or brand owners of these products or in a suitable wrapping material as instructed by the local bodies or authorities and shall place the same in the sanitary waste bin separate from bins meant for dry waste or wet waste or special care waste;";
const MCG_EWASTE =
  "E-Waste such as computers, printers, wires, CFLs, shall be stored in separate room / cage or lockers for temporary storage. E-Waste shall be disposed off through authorised e-waste recyclers.";

const DRY_TEXT = `${MCG_DRY_DEF} ${MCG_DRY_LIST}`;
const WET_TEXT = `${MCG_WET_DEF} ${MCG_WET_RULES}`;
const SPECIAL_TEXT = `${MCG_SPECIAL_DEF} ${MCG_SPECIAL_LIST}`;

const DRY_PREP = [
  "Hand dry waste over to authorised waste pickers, authorised recyclers, or Agencies authorised by MCG.",
];
const WET_PREP = [
  "Do not mix wet waste with dry or hazardous waste.",
  "Do not send wet waste to landfill.",
  "Process biodegradable waste within the premises through composting or bio-methanation as far as possible.",
];
const SPECIAL_PREP = [
  "Keep special care waste separate at the household level.",
  "Hand it over to authorised waste pickers, authorised recyclers, or Agencies authorised by MCG.",
];
const SANITARY_PREP = [
  "Wrap it securely in the pouch provided by the manufacturer or in a suitable wrapping material.",
  "Place it in the sanitary waste bin, separate from dry, wet and special care waste.",
];
const EWASTE_PREP = [
  "Store e-waste separately (a room, cage or locker) for temporary storage.",
  "Dispose of it through an authorised e-waste recycler.",
];

const SECTION_DRY = "§3.2 II (Dry Waste); §3.1(b)";
const SECTION_WET = "§3.2 I (Wet Waste); §3.1(a)";
const SECTION_SPECIAL = "§3.2 III (Special Care Waste); §3.1(d)";
const SECTION_SANITARY = "§3.2 IV (Sanitary Waste); §3.1(c)";
const SECTION_EWASTE = "§3.2 VII (E-Waste)";

/** Builds a Gurugram passage that shares the advisory's source and URL. */
function mcg(
  id: string,
  title: string,
  category: WasteCategory,
  section: string,
  text: string,
  prep_steps: string[],
  keywords: string[],
  replaces: string[],
): GuidePassage {
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
    replaces,
  };
}

const LOCAL: GuidePassage[] = [
  mcg(
    "local-plastic-bottle",
    "Plastic bottle",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["plastic", "bottle", "pet", "water bottle", "cold drink"],
    ["swm-dry", "pwm-sup"],
  ),
  mcg(
    "local-newspaper",
    "Newspaper",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["newspaper", "paper", "news", "print"],
    ["swm-dry"],
  ),
  mcg(
    "local-cardboard-box",
    "Cardboard box",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["cardboard", "box", "carton", "corrugated", "packaging"],
    ["swm-dry"],
  ),
  mcg(
    "local-greasy-pizza-box",
    "Greasy pizza box",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["pizza", "box", "cardboard", "greasy", "oily", "food stained"],
    ["swm-dry"],
  ),
  mcg(
    "local-coffee-cup",
    "Takeaway coffee cup with lid",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["coffee", "cup", "paper cup", "lid", "takeaway", "lining"],
    ["pwm-sup", "swm-dry"],
  ),
  mcg(
    "local-tetra-pak",
    "Tetra Pak carton",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["tetra", "pak", "carton", "juice", "milk", "laminated", "aseptic"],
    ["pwm-mlp", "swm-dry"],
  ),
  mcg(
    "local-mlp-wrapper",
    "Chips / multilayer wrapper",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["chips", "wrapper", "sachet", "multilayer", "packet", "snack", "foil"],
    ["pwm-mlp"],
  ),
  mcg(
    "local-banana-peel",
    "Banana peel",
    "Wet Waste",
    SECTION_WET,
    WET_TEXT,
    WET_PREP,
    ["banana", "peel", "fruit", "organic", "food"],
    ["swm-wet"],
  ),
  mcg(
    "local-cooked-leftovers",
    "Cooked leftovers",
    "Wet Waste",
    SECTION_WET,
    WET_TEXT,
    WET_PREP,
    ["leftovers", "cooked", "food", "curry", "rice", "kitchen"],
    ["swm-wet"],
  ),
  mcg(
    "local-used-battery",
    "Used battery — special care waste",
    "Domestic Hazardous",
    SECTION_SPECIAL,
    SPECIAL_TEXT,
    SPECIAL_PREP,
    ["battery", "batteries", "cell", "aa", "aaa", "lithium"],
    ["bw-consumer", "swm-hazardous"],
  ),
  mcg(
    "local-cfl-bulb",
    "CFL bulb — special care waste",
    "Domestic Hazardous",
    SECTION_SPECIAL,
    SPECIAL_TEXT,
    SPECIAL_PREP,
    ["cfl", "bulb", "tube", "light", "mercury", "lamp"],
    ["swm-hazardous"],
  ),
  mcg(
    "local-phone-charger",
    "Phone charger — e-waste",
    "E-Waste",
    SECTION_EWASTE,
    MCG_EWASTE,
    EWASTE_PREP,
    ["charger", "cable", "adapter", "usb", "cord", "electronic"],
    ["ew-consumer"],
  ),
  mcg(
    "local-old-phone",
    "Old phone — e-waste",
    "E-Waste",
    SECTION_EWASTE,
    MCG_EWASTE,
    EWASTE_PREP,
    ["phone", "mobile", "smartphone", "handset", "electronic"],
    ["ew-consumer"],
  ),
  mcg(
    "local-sanitary-pad",
    "Sanitary pad — sanitary waste",
    "Sanitary",
    SECTION_SANITARY,
    MCG_SANITARY,
    SANITARY_PREP,
    ["sanitary", "pad", "napkin", "menstrual"],
    ["swm-sanitary"],
  ),
  mcg(
    "local-medicine-strip",
    "Medicine strip — special care waste",
    "Domestic Hazardous",
    SECTION_SPECIAL,
    SPECIAL_TEXT,
    SPECIAL_PREP,
    ["medicine", "tablet", "strip", "pill", "expired", "pharma"],
    ["swm-hazardous"],
  ),
  // The advisory names paint drums and pesticide cans as special care waste, but
  // not deodorant or other pressurised aerosol cans. Left empty on purpose: the
  // app must say "not covered" rather than infer a rule.
  mcg(
    "local-aerosol-can",
    "Aerosol can",
    "Domestic Hazardous",
    "TODO — not covered by the MCG advisory",
    "",
    [],
    ["aerosol", "spray", "deodorant", "pressurised"],
    ["swm-hazardous"],
  ),
  mcg(
    "local-ceramic-plate",
    "Broken ceramic plate",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["ceramic", "plate", "broken", "crockery", "shard", "porcelain"],
    ["swm-dry", "swm-bulky"],
  ),
  mcg(
    "local-aluminium-foil",
    "Aluminium foil",
    "Dry Waste",
    SECTION_DRY,
    DRY_TEXT,
    DRY_PREP,
    ["aluminium", "foil", "wrap", "metal", "silver"],
    ["swm-dry"],
  ),
];

// ─── Placeholder handling ────────────────────────────────────────────────────

/** A passage with no text yet. Never retrieved and never displayed as a rule. */
export function isPlaceholder(p: GuidePassage): boolean {
  return p.text.trim().length === 0;
}

export const LOCAL_PASSAGES: GuidePassage[] = LOCAL;

/** Local rules that have been filled in. */
export const LOCAL_LOADED: GuidePassage[] = LOCAL.filter((p) => !isPlaceholder(p));

/** Local rules still waiting for their verbatim text. */
export const LOCAL_PENDING: GuidePassage[] = LOCAL.filter(isPlaceholder);

/** Everything filled in, local first. Placeholders are deliberately excluded. */
export const GUIDE: GuidePassage[] = [...LOCAL_LOADED, ...NATIONAL];

// ─── Retrieval ───────────────────────────────────────────────────────────────
const STOP = new Set([
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
  "that",
]);

export function buildQuery(parts: (string | undefined | null)[]): string[] {
  return Array.from(
    new Set(
      parts
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .split(/[^a-z0-9-]+/)
        .filter((t) => t.length > 2 && !STOP.has(t)),
    ),
  );
}

function keywordTokens(p: GuidePassage): string[] {
  return p.keywords.flatMap((k) =>
    k
      .toLowerCase()
      .split(/[^a-z0-9-]+/)
      .filter((t) => t.length > 2 && !STOP.has(t)),
  );
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
export function retrieve(
  terms: string[],
  limit = 5,
): { passages: GuidePassage[]; topScore: number } {
  const scored = GUIDE.map((p) => {
    const hay = (p.keywords.join(" ") + " " + p.text + " " + p.topic).toLowerCase();
    let score = 0;
    for (const t of terms) {
      // Exact/stem match on a keyword is the strongest signal; containment
      // (e.g. "smartphone" → "phone") catches compound object names.
      if (
        p.keywords.some(
          (k) =>
            k === t ||
            k.startsWith(t) ||
            t.startsWith(k) ||
            (t.length >= 4 && (k.includes(t) || t.includes(k))),
        )
      )
        score += 3;
      else if (hay.includes(t)) score += 1;
    }
    if (p.scope === "local" && score > 0) score += 2;
    return { p, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.p.scope !== b.p.scope) return a.p.scope === "local" ? -1 : 1;
      return a.p.id.localeCompare(b.p.id);
    });

  // Several item passages share one verbatim rule (e.g. the MCG dry-waste
  // definition covers paper, plastic, metal and packaging). Return each distinct
  // rule text once so duplicates cannot crowd out other streams such as e-waste.
  const chosen: GuidePassage[] = [];
  const seenText = new Set<string>();
  for (const { p } of scored) {
    const key = p.text.trim().toLowerCase();
    if (seenText.has(key)) continue;
    seenText.add(key);
    chosen.push(p);
    if (chosen.length >= limit) break;
  }

  return {
    passages: chosen,
    topScore: scored[0]?.score ?? 0,
  };
}

/** Best supported category for a free-text material description, or null. */
export function categoryForTerms(
  terms: string[],
): { category: WasteCategory; passageIds: string[]; score: number } | null {
  const { passages, topScore } = retrieve(terms, 3);
  const best = passages[0];
  if (!best || topScore < MIN_RELEVANCE_SCORE) return null;
  return {
    category: best.category,
    passageIds: passages.filter((p) => p.category === best.category).map((p) => p.id),
    score: topScore,
  };
}

/**
 * True when the item still has an unfilled local rule and we are about to show
 * the national rule instead. Used for the "no Gurugram-specific rule loaded"
 * note. Matching is by the placeholder's own keywords so the note is tied to
 * the item at hand, not to every item that shares a national passage.
 */
export function hasPendingLocalRule(nationalPassageId: string, terms: string[]): boolean {
  const query = new Set(terms.map((t) => t.toLowerCase()));
  return LOCAL_PENDING.some((p) => {
    if (!(p.replaces ?? []).includes(nationalPassageId)) return false;
    return keywordTokens(p).some(
      (k) => query.has(k) || [...query].some((t) => k.startsWith(t) || t.startsWith(k)),
    );
  });
}

/**
 * True when the item itself has an unfilled local rule. Used to warn that any
 * recommendation for it rests on general rules, whichever passage was cited.
 */
export function hasPendingLocalRuleForItem(terms: string[]): boolean {
  const query = new Set(terms.map((t) => t.toLowerCase()));
  return LOCAL_PENDING.some((p) =>
    keywordTokens(p).some(
      (k) => query.has(k) || [...query].some((t) => k.startsWith(t) || t.startsWith(k)),
    ),
  );
}

/** Convenience: get all filled-in passages that belong to a given category. */
export function passagesByCategory(category: WasteCategory): GuidePassage[] {
  return GUIDE.filter((p) => p.category === category);
}
