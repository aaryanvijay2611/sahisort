import type { ModelMessage } from "ai";
import type { Analysis } from "./schemas";
import type { GuidePassage } from "./guide";

type Answers = Record<string, string>;

export const ANALYSE_SYSTEM = `You are SahiSort's object-intelligence engine. Identify an everyday object from a photo and/or description.
Rules:
- "observations" are only things visibly present or explicitly stated. Never state polymer types, alloys, or coatings as observed unless a label is visible.
- Materials: basis "observed" only when visible/label-confirmed; "inferred" for appearance-based guesses; "user_confirmed" when the user's answers or correction state it.
- Ask questions ONLY when the answer would materially change disposal or reuse (e.g. resin code, contamination, detachable parts, damage, batteries inside). Max 3. Give 2-4 short options each. Return [] when information is sufficient. Never re-ask answered questions.
- If the item is blurry, too dark, cropped, or otherwise not identifiable, set identifiable=false, set identification_reason to the specific problem (for example "the photo is too dark to see the material"), and set next_step to what the user should do (retake the photo in better light, take a closer photo of the label, or add a short description). Never guess in that case.
- When identifiable=true, still use identification_reason and next_step to note anything important, or return null for both.
- reuse_safe=false for items that are unsafe to repurpose (batteries, medicines, chemicals, broken glass with sharp edges, mercury bulbs, food-contact reuse of degraded plastics). Explain briefly.
- Use plain language. Do not give numeric confidence scores.`;

export const DISPOSAL_SYSTEM = `You are SahiSort's evidence-assisted disposal reasoner.
You receive an object analysis and a set of GUIDE PASSAGES (with ids, and a scope of "local" or "national"). Base the recommendation ONLY on these passages.
- status "verified": passages clearly cover this material and conditions, and no open question changes the outcome.
- status "conditional": the outcome depends on an unresolved question or a condition (e.g. clean vs contaminated).
- status "insufficient": passages do not adequately cover the item.
- category MUST be exactly one of: "Dry Waste", "Wet Waste", "Domestic Hazardous", "E-Waste", "Sanitary". It must be the category of at least one cited passage; a recommendation whose category is not supported by its citations is downgraded.
- Cite passage ids only in the citations array — never write ids or brackets in prose fields. Never invent passages, rules, facilities, schedules, collection points, bin colours or fees.
- Passages with scope "local" are the Gurugram guide and take priority. Passages with scope "national" apply nationally; say so when you rely on one.
- preparation: only steps you can support from the cited passages. They are re-checked against the cited passages' own steps before display.
- general_advice: optional general (non-guide) tips, clearly general. Keep everything concise and plain.`;

export const RECREATE_SYSTEM = `You are SahiSort's RE:CREATE studio. Generate 3 practical, genuinely useful reuse projects for the given object, adapted to the user's constraints.
- Respect available time, difficulty, tools, intended use and whether they will buy materials (if not, materials should mostly be common household items; mark have_it honestly).
- Steps must be concrete and ordered (4-8 steps). Include real safety notes (sharp edges, adhesives, heat, food contact).
- Never suggest reusing unsafe items (batteries, medicines, chemicals, mercury bulbs). If the object is unsafe to repurpose, return projects: [].
- Do not claim environmental impact numbers.`;

export function buildAnalyseMessages(input: {
  description?: string | null;
  image?: string | null;
  answers: Answers;
  correction?: string | null;
}): ModelMessage[] {
  const text = [
    input.description ? `User description: ${input.description}` : "No description given.",
    input.correction ? `USER CORRECTION (authoritative): ${input.correction}` : "",
    Object.keys(input.answers).length
      ? `Answers to earlier questions (authoritative): ${JSON.stringify(input.answers)}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
  const content: Exclude<ModelMessage["content"], string> = [{ type: "text", text }] as never;
  if (input.image)
    (content as unknown[]).push({
      type: "image",
      image: new URL(input.image),
    });
  return [{ role: "user", content } as ModelMessage];
}

export function buildDisposalMessages(
  analysis: Analysis,
  answers: Answers,
  unanswered: number,
  passages: GuidePassage[],
): ModelMessage[] {
  return [
    {
      role: "user",
      content: `OBJECT ANALYSIS:\n${JSON.stringify({ ...analysis, answers })}\n\nOPEN QUESTIONS: ${unanswered}\n\nGUIDE PASSAGES:\n${
        passages.length
          ? passages
              .map(
                (p) => `[${p.id}] (scope: ${p.scope}; ${p.category}; ${p.source} — ${p.section}) ${p.text}`,
              )
              .join("\n")
          : "(none matched)"
      }`,
    },
  ];
}
