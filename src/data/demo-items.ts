/**
 * The demo item set for SahiSort (Gurugram).
 *
 * 18 common Indian household items, written as the short text a user would type
 * into /discover. Kept locality-neutral on purpose: no bin colours, schedules or
 * collection rules are stated here — those come only from the guide.
 *
 * DROPPED FROM THE 20-ITEM BRIEF (2 least distinct):
 *   • "diaper"    — same category and same national sanitary passage as the
 *                   sanitary pad, so it tests nothing new.
 *   • "glass jar" — same "empty, rinse, dry recyclable container" path as the
 *                   plastic bottle; the broken ceramic plate already covers the
 *                   non-recyclable brittle case.
 */
export type DemoItem = {
  id: string;
  label: string;
  /** Short text description submitted to analyseObject. */
  description: string;
};

export const DEMO_ITEMS: DemoItem[] = [
  {
    id: "plastic-bottle",
    label: "Plastic bottle",
    description: "Empty 1 litre PET water bottle with its cap, rinsed",
  },
  {
    id: "newspaper",
    label: "Newspaper",
    description: "Stack of old newspapers, dry and clean",
  },
  {
    id: "cardboard-box",
    label: "Cardboard box",
    description: "Flattened cardboard delivery box with packing tape still on it",
  },
  {
    id: "greasy-pizza-box",
    label: "Greasy pizza box",
    description: "Pizza box with a greasy, cheese-stained base and a clean lid",
  },
  {
    id: "coffee-cup",
    label: "Takeaway coffee cup",
    description: "Takeaway coffee cup with a plastic lid and a little coffee left inside",
  },
  {
    id: "tetra-pak",
    label: "Tetra Pak carton",
    description: "Empty Tetra Pak juice carton with a plastic straw attached",
  },
  {
    id: "chips-wrapper",
    label: "Chips wrapper",
    description: "Empty chips packet, shiny multilayer foil wrapper",
  },
  {
    id: "banana-peel",
    label: "Banana peel",
    description: "One banana peel from today's breakfast",
  },
  {
    id: "cooked-leftovers",
    label: "Cooked leftovers",
    description: "Half-eaten bowl of cooked rice and dal",
  },
  {
    id: "used-battery",
    label: "Used batteries",
    description: "Two used AA batteries taken out of a TV remote",
  },
  {
    id: "cfl-bulb",
    label: "CFL bulb",
    description: "Burnt-out compact fluorescent (CFL) bulb, still intact",
  },
  {
    id: "phone-charger",
    label: "Phone charger",
    description: "Old phone charger with a frayed cable and a two-pin plug",
  },
  {
    id: "old-phone",
    label: "Old phone",
    description: "Broken Android smartphone with a cracked screen",
  },
  {
    id: "sanitary-pad",
    label: "Sanitary pad",
    description: "Used sanitary pad wrapped in its original pouch",
  },
  {
    id: "medicine-strip",
    label: "Medicine strip",
    description: "Expired medicine blister strip with a few tablets still inside",
  },
  {
    id: "aerosol-can",
    label: "Aerosol can",
    description: "Empty deodorant aerosol spray can",
  },
  {
    id: "ceramic-plate",
    label: "Broken ceramic plate",
    description: "Broken ceramic dinner plate with sharp edges",
  },
  {
    id: "aluminium-foil",
    label: "Aluminium foil",
    description: "Crinkled aluminium foil used to wrap rotis",
  },
];
