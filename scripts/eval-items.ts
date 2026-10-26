/**
 * Runs the full SahiSort pipeline over the demo item set and writes a table to
 * eval-results.md.
 *
 *   npx tsx scripts/eval-items.ts
 *
 * (tsx ships with the project's Vite toolchain, so no extra dependency.)
 *
 * Requires GOOGLE_GENERATIVE_AI_API_KEY (read from .env by dotenv).
 *
 * This exercises the same modules the app uses, minus the browser and auth:
 *   analyseObject  → runStructured + ANALYSE_SYSTEM + analysisSchema
 *   computeDisposal → retrieve + buildDisposal (trust gate + verbatim evidence)
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { analysisSchema, disposalAiSchema, type Analysis } from "@/lib/schemas";
import { runStructured } from "@/lib/ai.server";
import {
  ANALYSE_SYSTEM,
  DISPOSAL_SYSTEM,
  buildAnalyseMessages,
  buildDisposalMessages,
} from "@/lib/prompts";
import { MIN_RELEVANCE_SCORE, retrieve, hasPendingLocalRule } from "@/lib/guide";
import {
  buildDisposal,
  buildQueryForAnalysis,
  unansweredQuestions,
} from "@/lib/disposal-pipeline";
import { DEMO_ITEMS } from "@/data/demo-items";

const OUT = path.resolve(process.cwd(), "eval-results.md");

type Row = {
  item: string;
  material: string;
  category: string;
  status: string;
  scope: string;
  citations: string;
  nationalOnly: boolean;
  pendingLocal: boolean;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function cell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

async function evaluate(item: (typeof DEMO_ITEMS)[number]): Promise<Row> {
  const analysis: Analysis = await runStructured(
    analysisSchema,
    ANALYSE_SYSTEM,
    buildAnalyseMessages({ description: item.description, image: null, answers: {} }),
  );

  const answers: Record<string, string> = {};
  const terms = buildQueryForAnalysis(analysis, answers);
  const { passages, topScore } = retrieve(terms);

  const ai =
    topScore < MIN_RELEVANCE_SCORE
      ? null
      : await runStructured(
          disposalAiSchema,
          DISPOSAL_SYSTEM,
          buildDisposalMessages(analysis, answers, unansweredQuestions(analysis, answers), passages),
        );

  const disposal = buildDisposal({ analysis, answers, ai, passages, topScore });

  const evidence = disposal.evidence;
  const scopes = [...new Set(evidence.map((e) => e.scope))];
  const nationalOnly = evidence.length > 0 && scopes.every((s) => s === "national");
  // A cited national passage whose local counterpart is still unfilled.
  const pendingLocal = evidence.some(
    (e) => e.scope === "national" && hasPendingLocalRule(e.id, terms),
  );

  const material = analysis.materials
    .map((m) => `${m.component}: ${m.material}`)
    .join("; ");

  return {
    item: item.label,
    material: material || analysis.object_name,
    category: disposal.status === "not_covered" ? "—" : disposal.category,
    status: disposal.status,
    scope: scopes.length ? scopes.join(" + ") : "—",
    citations: evidence.map((e) => e.id).join(", ") || "—",
    nationalOnly,
    pendingLocal,
  };
}

const rows: Row[] = [];
const failures: { item: string; error: string }[] = [];

for (const item of DEMO_ITEMS) {
  process.stdout.write(`· ${item.label} … `);
  let lastError = "";
  let done = false;
  for (let attempt = 1; attempt <= 3 && !done; attempt++) {
    try {
      rows.push(await evaluate(item));
      process.stdout.write("ok\n");
      done = true;
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      process.stdout.write(`attempt ${attempt} failed; `);
      if (attempt < 3) await sleep(2000 * attempt);
    }
  }
  if (!done) {
    failures.push({ item: item.label, error: lastError });
    process.stdout.write("giving up\n");
  }
  await sleep(250);
}

const count = (s: string) => rows.filter((r) => r.status === s).length;
const nationalOnly = rows.filter((r) => r.nationalOnly).length;
const pendingLocal = rows.filter((r) => r.pendingLocal).length;

const lines: string[] = [];
lines.push("# SahiSort evaluation — Gurugram demo item set");
lines.push("");
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push("");
lines.push(
  `**Summary:** ${rows.length} of ${DEMO_ITEMS.length} items evaluated — ` +
    `**Verified ${count("verified")}** · **Conditional ${count("conditional")}** · ` +
    `**Insufficient ${count("insufficient")}** · **Not covered ${count("not_covered")}**. ` +
    `**${nationalOnly}** relied on a national rule only` +
    (pendingLocal ? ` (${pendingLocal} of those because the Gurugram rule is still a placeholder).` : "."),
);
lines.push("");
lines.push(
  "The `correct?` column is intentionally blank — fill it in by hand when reviewing.",
);
lines.push("");
lines.push("| Item | Material | Category | Status | Scope of cited passage | Cited passage ids | Correct? |");
lines.push("| --- | --- | --- | --- | --- | --- | --- |");
for (const r of rows) {
  lines.push(
    `| ${cell(r.item)} | ${cell(r.material)} | ${cell(r.category)} | ${r.status} | ${cell(
      r.scope,
    )} | ${cell(r.citations)} |  |`,
  );
}
lines.push("");

if (failures.length) {
  lines.push("## Items that could not be evaluated");
  lines.push("");
  for (const f of failures) lines.push(`- **${f.item}** — ${f.error}`);
  lines.push("");
}

lines.push("## Notes");
lines.push("");
lines.push(
  "- Placeholder local passages are excluded from retrieval, so every citation above is either a national rule or a filled-in Gurugram rule.",
);
lines.push(
  "- The eval reuses the app's trust gate (`buildDisposal` → `validateDisposal`), so any category/citation mismatch is already downgraded here.",
);
lines.push("- Items are analysed from text only (no photo), which is the harder case.");

fs.writeFileSync(OUT, lines.join("\n") + "\n", "utf8");
console.log(`\nWrote ${OUT}`);
console.log(lines.slice(4, 6).join("\n"));
