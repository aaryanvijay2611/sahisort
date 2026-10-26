import { z } from "zod";

export const analysisSchema = z.object({
  object_name: z.string(),
  summary: z.string(),
  identifiable: z.boolean(),
  observations: z.array(z.string()),
  materials: z.array(
    z.object({
      component: z.string(),
      material: z.string(),
      basis: z.enum(["observed", "inferred", "user_confirmed"]),
      certainty: z.enum(["clear", "likely", "unsure"]),
    }),
  ),
  mixed_materials: z.boolean(),
  uncertainties: z.array(z.string()),
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      why: z.string(),
      options: z.array(z.string()),
    }),
  ),
  reuse_safe: z.boolean(),
  reuse_safety_note: z.string(),
  // Added for uncertainty handling. Optional, so analyses stored before this
  // change still parse and render (backward compatible; no migration needed).
  identification_reason: z.string().nullable().optional(),
  next_step: z.string().nullable().optional(),
});
export type Analysis = z.infer<typeof analysisSchema>;

export const disposalAiSchema = z.object({
  status: z.enum(["verified", "conditional", "insufficient"]),
  category: z.string(),
  explanation: z.string(),
  preparation: z.array(z.string()),
  conditions: z.array(z.string()),
  exceptions: z.array(z.string()),
  limitations: z.array(z.string()),
  citations: z.array(z.object({ passage_id: z.string(), relevance: z.string() })),
  missing_information: z.array(z.string()),
  general_advice: z.string(),
});
export type DisposalAi = z.infer<typeof disposalAiSchema>;

/** One cited rule. Every field is copied from guide.ts, never from the model. */
export type DisposalEvidence = {
  id: string;
  title: string;
  category: string;
  scope: "local" | "national";
  source: string;
  section: string;
  url: string;
  topic: string;
  text: string;
  relevance: string;
};

/** Per-component disposal for mixed-material items. */
export type DisposalComponent = {
  component: string;
  material: string;
  /** null when no guide passage supports a category for this component. */
  category: string | null;
  passage_ids: string[];
  supported: boolean;
};

/**
 * Stored disposal result.
 *
 * BACKWARD COMPATIBILITY NOTE: `components` and `scope_note` were added for the
 * Gurugram guide work. Both are optional so disposals stored by earlier builds
 * still type-check and render (the UI treats a missing value as "none").
 */
export type Disposal = Omit<DisposalAi, "status"> & {
  /** Trust-gate can set "not_covered" which the AI schema never produces. */
  status: DisposalAi["status"] | "not_covered";
  evidence: DisposalEvidence[];
  components?: DisposalComponent[];
  scope_note?: string | null;
  query: string[];
  downgraded_reason: string | null;
  generated_at: string;
};

export const projectsSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string(),
      pitch: z.string(),
      use: z.string(),
      difficulty: z.enum(["easy", "medium", "involved"]),
      duration_minutes: z.number(),
      materials: z.array(z.object({ item: z.string(), have_it: z.boolean() })),
      tools: z.array(z.string()),
      steps: z.array(z.object({ title: z.string(), detail: z.string() })),
      safety_notes: z.array(z.string()),
      why_it_fits: z.string(),
    }),
  ),
});
export type Project = z.infer<typeof projectsSchema>["projects"][number];

export const recreatePrefsSchema = z.object({
  time: z.enum(["15 minutes", "1 hour", "an afternoon"]),
  difficulty: z.enum(["easy", "medium", "involved"]),
  tools: z.string().max(300),
  intent: z.string().max(300),
  buy_materials: z.boolean(),
});
export type RecreatePrefs = z.infer<typeof recreatePrefsSchema>;
