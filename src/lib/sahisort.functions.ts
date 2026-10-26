import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireFirebaseAuth } from "@/integrations/firebase/auth-middleware";
import { dbService } from "@/integrations/firebase/db.server";
import {
  analysisSchema,
  disposalAiSchema,
  projectsSchema,
  recreatePrefsSchema,
  type Analysis,
  type DisposalAi,
} from "./schemas";
import {
  ANALYSE_SYSTEM,
  DISPOSAL_SYSTEM,
  RECREATE_SYSTEM,
  buildAnalyseMessages,
  buildDisposalMessages,
} from "./prompts";

type Answers = Record<string, string>;

async function aiDeps() {
  const { runStructured } = await import("./ai.server");
  return runStructured;
}

export const analyseObject = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .validator((d: unknown) =>
    z
      .object({
        description: z.string().max(1000).nullable(),
        image: z.string().startsWith("data:image/").max(4_000_000).nullable(),
      })
      .refine(
        (v) => v.image || (v.description && v.description.trim().length > 2),
        "Add a photo or a description.",
      )
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const run = await aiDeps();
    const analysis = await run(
      analysisSchema,
      ANALYSE_SYSTEM,
      buildAnalyseMessages({ ...data, answers: {} }),
    );

    const id = await dbService.createDiscovery({
      userId: context.userId,
      description: data.description,
      imageData: data.image,
      objectName: analysis.object_name,
      analysis,
    });

    return { id };
  });

/** Apply answers or a correction, re-run analysis, and mark dependent results stale. */
export const refineDiscovery = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .validator((d: unknown) =>
    z
      .object({
        id: z.string().min(1),
        answers: z.record(z.string(), z.string().max(300)),
        correction: z.string().max(500).nullable(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { discovery: disc } = await dbService.getDiscovery(data.id, context.userId);
    const answers = { ...(disc.answers as Answers), ...data.answers };
    if (data.correction) answers["correction"] = data.correction;

    const run = await aiDeps();
    const analysis = await run(
      analysisSchema,
      ANALYSE_SYSTEM,
      buildAnalyseMessages({
        description: disc.description,
        image: disc.image_data,
        answers,
        correction: data.correction,
      }),
    );

    await dbService.refineDiscovery({
      id: data.id,
      userId: context.userId,
      analysis,
      objectName: analysis.object_name,
      answers,
      correction: data.correction,
      disposalStale: disc.disposal != null,
    });

    return { ok: true };
  });

export const computeDisposal = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .validator((d: unknown) => z.object({ id: z.string().min(1) }).parse(d))
  .handler(async ({ data, context }) => {
    const { retrieve, MIN_RELEVANCE_SCORE } = await import("./guide");
    const { buildDisposal, buildQueryForAnalysis, unansweredQuestions } = await import(
      "./disposal-pipeline"
    );
    const { discovery: disc } = await dbService.getDiscovery(data.id, context.userId);

    const analysis = disc.analysis as unknown as Analysis;
    const answers = disc.answers as Answers;
    const terms = buildQueryForAnalysis(analysis, answers);
    const { passages, topScore } = retrieve(terms);

    // Below the relevance floor: skip the model entirely and say so.
    let ai: DisposalAi | null = null;
    if (topScore >= MIN_RELEVANCE_SCORE) {
      const run = await aiDeps();
      ai = await run(
        disposalAiSchema,
        DISPOSAL_SYSTEM,
        buildDisposalMessages(
          analysis,
          answers,
          unansweredQuestions(analysis, answers),
          passages,
        ),
      );
    }

    const disposal = buildDisposal({ analysis, answers, ai, passages, topScore });

    await dbService.updateDisposal({
      id: data.id,
      userId: context.userId,
      disposal,
    });

    return { ok: true };
  });

export const generateProjects = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .validator((d: unknown) =>
    z.object({ id: z.string().min(1), prefs: recreatePrefsSchema }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { discovery: disc } = await dbService.getDiscovery(data.id, context.userId);
    const analysis = disc.analysis as unknown as Analysis;
    if (!analysis.reuse_safe) return { count: 0, unsafe: analysis.reuse_safety_note };

    const run = await aiDeps();
    const out = await run(projectsSchema, RECREATE_SYSTEM, [
      {
        role: "user",
        content: `OBJECT:\n${JSON.stringify({ ...analysis, answers: disc.answers })}\n\nPREFERENCES:\n${JSON.stringify(data.prefs)}`,
      },
    ]);
    if (!out.projects.length)
      return {
        count: 0,
        unsafe: "SahiSort couldn't find a safe reuse for this item.",
      };

    const projectPayloads = out.projects.map((p) => ({
      title: p.title,
      data: { ...p, prefs: data.prefs },
    }));

    const count = await dbService.createProjects({
      userId: context.userId,
      discoveryId: data.id,
      objectName: analysis.object_name,
      projects: projectPayloads,
      prefs: data.prefs,
    });

    return { count, unsafe: null };
  });

export const getDiscovery = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .validator((d: unknown) => z.object({ id: z.string().min(1) }).parse(d))
  .handler(async ({ data, context }) => {
    return await dbService.getDiscovery(data.id, context.userId);
  });

export const getProject = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .validator((d: unknown) => z.object({ id: z.string().min(1) }).parse(d))
  .handler(async ({ data }) => {
    return await dbService.getProject(data.id);
  });

export const listMine = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .handler(async ({ context }) => {
    return await dbService.listMine(context.userId);
  });

export const getJourneyLogs = createServerFn({ method: "GET" })
  .middleware([requireFirebaseAuth])
  .handler(async ({ context }) => {
    return await dbService.listJourneyLogs(context.userId);
  });

export const updateFlags = createServerFn({ method: "POST" })
  .middleware([requireFirebaseAuth])
  .validator((d: unknown) =>
    z
      .object({
        table: z.enum(["discoveries", "projects"]),
        id: z.string().min(1),
        saved: z.boolean().optional(),
        confirmDisposal: z.boolean().optional(),
        completed: z.boolean().optional(),
        completedSteps: z.array(z.number()).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await dbService.updateFlags({
      userId: context.userId,
      table: data.table,
      id: data.id,
      saved: data.saved,
      confirmDisposal: data.confirmDisposal,
      completed: data.completed,
      completedSteps: data.completedSteps,
    });
    return { ok: true };
  });
