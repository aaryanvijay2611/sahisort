import { createFileRoute } from "@tanstack/react-router";
import { GUIDE, GUIDE_META } from "@/lib/guide";
import { STATUS, StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "The Guide | SahiSort" },
      {
        name: "description",
        content:
          "The waste-management guide SahiSort uses as evidence, and how recommendations are verified.",
      },
      { property: "og:title", content: "The Guide | SahiSort" },
      {
        property: "og:description",
        content: "Transparent sources behind every SahiSort disposal recommendation.",
      },
    ],
  }),
  component: Guide,
});

function Guide() {
  const sources = [...new Set(GUIDE.map((g) => g.source))];
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-eyebrow text-primary">The Guide</p>
      <h1 className="mt-3 font-display text-title">What SahiSort reads before it recommends.</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        {GUIDE_META.name}. {GUIDE_META.jurisdiction}
      </p>
      <p className="mt-3 rounded-2xl bg-apricot/40 p-4 text-sm">{GUIDE_META.note}</p>

      <h2 className="mt-14 font-display text-3xl">How a recommendation is made</h2>
      <ol className="mt-5 grid gap-3 text-sm">
        {[
          "Identify the object and its likely materials",
          "Build a search query from the object, materials and your answers",
          "Retrieve matching passages from the guide",
          "Ask the AI to reason only from those passages and cite them",
          "Validate: drop citations that weren't retrieved; downgrade if uncited or questions remain open",
          "Show the result with its evidence",
        ].map((s, i) => (
          <li key={s} className="flex gap-4">
            <span className="font-display text-2xl text-primary">{i + 1}</span>
            <span className="pt-1">{s}</span>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-3xl">The three states</h2>
      <div className="mt-5 grid gap-4">
        {(Object.keys(STATUS) as (keyof typeof STATUS)[]).map((k) => (
          <div
            key={k}
            className="flex flex-col gap-2 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:gap-5"
          >
            <StatusBadge status={k} className="shrink-0" />
            <p className="text-sm text-muted-foreground">{STATUS[k].desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl">Sources</h2>
      <ul className="mt-4 grid gap-1 text-sm">
        {sources.map((s) => (
          <li key={s}>
            <a
              href={GUIDE.find((g) => g.source === s)!.url}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:underline"
            >
              {s} ↗
            </a>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 font-display text-3xl">All passages</h2>
      <div className="mt-6 grid gap-6">
        {GUIDE.map((g) => (
          <article key={g.id} id={g.id} className="border-t pt-6">
            <p className="text-eyebrow text-muted-foreground">{g.topic}</p>
            <p className="mt-2 font-display text-xl leading-snug">{g.text}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {g.source} · {g.section}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
