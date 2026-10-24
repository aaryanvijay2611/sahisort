import { describe, expect, it } from "vitest";
import { validateDisposal } from "@/lib/disposal-rules";
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

describe("validateDisposal", () => {
  it("keeps verified when cited and no open questions", () => {
    expect(
      validateDisposal({ ai: base, retrievedIds: ["swm-dry"], unansweredQuestions: 0 }).status,
    ).toBe("verified");
  });
  it("downgrades to conditional when questions are open", () => {
    expect(
      validateDisposal({ ai: base, retrievedIds: ["swm-dry"], unansweredQuestions: 1 }).status,
    ).toBe("conditional");
  });
  it("drops fabricated citations and marks insufficient", () => {
    const r = validateDisposal({
      ai: { ...base, citations: [{ passage_id: "made-up", relevance: "" }] },
      retrievedIds: ["swm-dry"],
      unansweredQuestions: 0,
    });
    expect(r.status).toBe("insufficient");
    expect(r.citations).toHaveLength(0);
  });
  it("is insufficient when nothing was retrieved", () => {
    expect(validateDisposal({ ai: base, retrievedIds: [], unansweredQuestions: 0 }).status).toBe(
      "insufficient",
    );
  });
});
