import { describe, expect, it } from "vitest";
import { buildDisposal } from "@/lib/disposal-pipeline";
import { LOCAL_PASSAGES, retrieve } from "@/lib/guide";
import { lookupPassage } from "@/lib/disposal-rules";
import type { Analysis, DisposalAi } from "@/lib/schemas";

const analysis: Analysis = {
  object_name: "Takeaway coffee cup",
  summary: "A paper cup with a plastic lid.",
  identifiable: true,
  observations: ["Paper cup body", "Plastic lid"],
  materials: [
    { component: "cup body", material: "paper", basis: "observed", certainty: "clear" },
    { component: "lid", material: "plastic", basis: "observed", certainty: "clear" },
  ],
  mixed_materials: true,
  uncertainties: [],
  questions: [],
  reuse_safe: false,
  reuse_safety_note: "Not safe to reuse.",
};

const ai = (over: Partial<DisposalAi> = {}): DisposalAi => ({
  status: "verified",
  category: "Dry Waste",
  explanation: "Dry waste.",
  preparation: ["Something the model invented"],
  conditions: [],
  exceptions: [],
  limitations: [],
  citations: [{ passage_id: "swm-dry", relevance: "covers paper and plastic" }],
  missing_information: [],
  general_advice: "",
  ...over,
});

describe("buildDisposal", () => {
  it("copies the rule text verbatim from the guide, never from the model", () => {
    const { passages, topScore } = retrieve(["coffee", "cup", "paper", "plastic"]);
    const disposal = buildDisposal({ analysis, answers: {}, ai: ai(), passages, topScore });

    expect(disposal.evidence.length).toBeGreaterThan(0);
    expect(disposal.evidence[0]!.text).toBe(lookupPassage("swm-dry")!.text);
    expect(disposal.evidence[0]!.scope).toBe("national");
    expect(disposal.evidence[0]!.section).toBe(lookupPassage("swm-dry")!.section);
  });

  it("ignores model-written preparation and uses the cited passage's steps", () => {
    const { passages, topScore } = retrieve(["coffee", "cup", "paper", "plastic"]);
    const disposal = buildDisposal({ analysis, answers: {}, ai: ai(), passages, topScore });

    expect(disposal.preparation).not.toContain("Something the model invented");
    expect(disposal.preparation).toContain("Flatten cardboard boxes to save space.");
  });

  it("gives each material component its own guide category", () => {
    const { passages, topScore } = retrieve(["coffee", "cup", "paper", "plastic"]);
    const disposal = buildDisposal({ analysis, answers: {}, ai: ai(), passages, topScore });

    expect(disposal.components).toHaveLength(2);
    expect(disposal.components!.every((c) => c.supported && c.category === "Dry Waste")).toBe(true);
    expect(disposal.components![0]!.passage_ids.length).toBeGreaterThan(0);
  });

  it("returns not_covered without a model call and points at the MCG", () => {
    const disposal = buildDisposal({ analysis, answers: {}, ai: null, passages: [], topScore: 0 });

    expect(disposal.status).toBe("not_covered");
    expect(disposal.evidence).toHaveLength(0);
    expect(disposal.explanation).toContain("Not covered by this guide");
    expect(disposal.explanation).toContain("MCG");
    // Component breakdown still works even when the item as a whole is uncovered.
    expect(disposal.components).toHaveLength(2);
  });

  it("warns when the item's own Gurugram rule is missing", () => {
    const foil = lookupPassage("local-aluminium-foil")!;
    const disposal = buildDisposal({
      analysis: {
        ...analysis,
        object_name: "Aerosol can",
        materials: [
          { component: "can body", material: "metal", basis: "inferred", certainty: "likely" },
        ],
      },
      answers: {},
      ai: ai({
        category: "Dry Waste",
        citations: [{ passage_id: "local-aluminium-foil", relevance: "metal container" }],
      }),
      passages: [foil],
      topScore: 10,
    });

    expect(disposal.scope_note).toContain("No Gurugram-specific rule loaded for this item");
  });

  it("refuses to treat an unfilled local placeholder as evidence", () => {
    // Placeholders are not in GUIDE, so read them from the raw local list.
    const placeholder = LOCAL_PASSAGES.find((p) => p.id === "local-aerosol-can")!;
    expect(placeholder.text).toBe("");

    const disposal = buildDisposal({
      analysis: { ...analysis, object_name: "Aerosol can" },
      answers: {},
      ai: ai({
        category: "Domestic Hazardous",
        citations: [{ passage_id: "local-aerosol-can", relevance: "x" }],
      }),
      passages: [placeholder],
      topScore: 10,
    });

    expect(disposal.status).toBe("insufficient");
    expect(disposal.evidence).toHaveLength(0);
    expect(disposal.preparation).toHaveLength(0);
  });
});
