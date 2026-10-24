/**
 * Waste-management guide used by SahiSort.
 *
 * STRUCTURE
 * ---------
 * Every passage has:
 *   id           – stable kebab-case identifier used in citations
 *   title        – short human-readable label
 *   category     – one of the five stream categories defined in WasteCategory
 *   scope        – "national" (Indian statute) | "local" (campus/locality-specific)
 *   source       – document name + section
 *   url          – official source URL
 *   topic        – brief topic label (legacy, kept for display)
 *   keywords     – retrieval tokens
 *   text         – VERBATIM or official-summary text (do NOT paraphrase in new passages)
 *   prep_steps   – array of preparation steps explicitly stated in or directly supported by the text
 *
 * LOCAL GUIDE SETUP
 * -----------------
 * 1. Edit GUIDE_META below with your locality name, guide title and URL.
 * 2. Add passages with scope: "local" in the LOCAL PASSAGES section.
 * 3. Mark each with // TODO: paste verbatim from supplied guide if not yet filled.
 * 4. Local passages are prioritised over national ones when both match.
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

export type GuidePassage = {
  id: string;
  title: string;
  category: WasteCategory;
  scope: "national" | "local";
  source: string;
  section: string;
  url: string;
  topic: string;
  keywords: string[];
  text: string;
  prep_steps: string[];
};

// ─── Guide Metadata ─────────────────────────────────────────────────────────
// Update these fields with your locality's details.
export const GUIDE_META = {
  locality: "India (National)", // TODO: set to your campus / locality name
  guide_title: "India Solid Waste Management Framework",
  guide_url: "https://cpcb.nic.in/uploads/MSW/SWM_2016.pdf", // TODO: set to your local guide URL
  last_updated: "2024-01", // TODO: update when local guide is updated
  jurisdiction:
    "India — national rules. Municipal collection schedules and facilities are not covered.",
  note: "Passages are summaries of official Indian statutory rules. Always check your municipality's specific instructions.",
};

// ─── Statutory references ────────────────────────────────────────────────────
const SWM = "Solid Waste Management Rules, 2016 (MoEFCC)";
const SWM_URL = "https://cpcb.nic.in/uploads/MSW/SWM_2016.pdf";
const PWM = "Plastic Waste Management Rules, 2016 (as amended 2021–2022)";
const PWM_URL = "https://cpcb.nic.in/plastic-waste/";
const EW = "E-Waste (Management) Rules, 2022";
const EW_URL = "https://cpcb.nic.in/e-waste/";
const BW = "Battery Waste Management Rules, 2022";
const BW_URL = "https://cpcb.nic.in/battery-waste/";

// ─── Minimum retrieval score to attempt LLM call ────────────────────────────
// If the best-scoring passage scores below this threshold, skip LLM entirely
// and return status "not_covered".
export const MIN_RETRIEVAL_SCORE = 2;

// ─── NATIONAL PASSAGES ───────────────────────────────────────────────────────

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

// ─── LOCAL PASSAGES ───────────────────────────────────────────────────────────
// Add your campus / locality passages here with scope: "local".
// Local passages are prioritised over national passages when both match.
// Use verbatim text from your supplied guide.
// Leave the placeholder comment if you haven't filled in the text yet.

const LOCAL: GuidePassage[] = [
  // TODO: paste verbatim from supplied guide — example template:
  // {
  //   id: "local-dry",
  //   title: "Dry waste collection — <locality>",
  //   category: "Dry Waste",
  //   scope: "local",
  //   source: "<Your campus/locality guide title, year>",
  //   section: "<Section name or page>",
  //   url: "<URL or 'Internal document'>",
  //   topic: "Dry waste — local rule",
  //   keywords: ["paper", "plastic", "glass", "metal", "bottle", "jar", "cardboard"],
  //   text: "<Verbatim text from the supplied guide>",
  //   prep_steps: ["<Step from the guide>", "<Step from the guide>"],
  // },
];

// ─── Combined guide (local passages first so they score higher in retrieval) ──
export const GUIDE: GuidePassage[] = [...LOCAL, ...NATIONAL];

// ─── Stop-words for query building ───────────────────────────────────────────
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

/** Lightweight keyword retrieval with provenance.
 *  Local-scope passages receive a +2 priority bonus.
 *  Returns an empty array (score 0 for all) when nothing matches —
 *  the caller checks against MIN_RETRIEVAL_SCORE to decide whether to
 *  skip the LLM call and return "not_covered".
 */
export function retrieve(
  terms: string[],
  limit = 5,
): { passages: GuidePassage[]; topScore: number } {
  const scored = GUIDE.map((p) => {
    const hay = (p.keywords.join(" ") + " " + p.text + " " + p.topic).toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (p.keywords.some((k) => k === t || k.startsWith(t) || t.startsWith(k))) score += 3;
      else if (hay.includes(t)) score += 1;
    }
    // Local passages get a priority boost
    if (p.scope === "local" && score > 0) score += 2;
    return { p, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const topScore = scored[0]?.score ?? 0;
  const top = scored.slice(0, limit).map((s) => s.p);
  const seg = GUIDE.find((p) => p.id === "swm-segregation")!;
  if (top.length && !top.includes(seg)) top.push(seg);

  return { passages: top, topScore };
}

/** Convenience: get all passage ids that belong to a given category. */
export function passagesByCategory(category: WasteCategory): GuidePassage[] {
  return GUIDE.filter((p) => p.category === category);
}
