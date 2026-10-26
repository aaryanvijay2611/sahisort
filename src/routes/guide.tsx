import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, MapPin } from "lucide-react";
import {
  GUIDE_META,
  GUIDE,
  LOCAL_LOADED,
  LOCAL_PENDING,
  contactLine,
  guideLabel,
  isGuidePending,
  isTodo,
} from "@/lib/guide";
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

function MetaRow({ label, value }: { label: string; value: string }) {
  const missing = isTodo(value);
  return (
    <div className="flex flex-col gap-0.5 border-b py-2 text-sm sm:flex-row sm:justify-between sm:gap-6">
      <span className="text-muted-foreground">{label}</span>
      <span className={missing ? "font-mono text-xs text-destructive" : "text-right"}>
        {missing ? "TODO — not supplied yet" : value}
      </span>
    </div>
  );
}

function Guide() {
  const pending = isGuidePending();
  const sources = [...new Set(GUIDE.map((g) => g.source))];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-eyebrow text-primary">The Guide</p>
      <h1 className="mt-3 font-display text-title">What SahiSort reads before it recommends.</h1>

      <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-foreground">
        <MapPin className="size-4 text-primary" /> {guideLabel()}
      </p>

      {pending && (
        <div
          role="status"
          className="mt-4 flex gap-3 rounded-2xl border border-dashed border-conditional/60 bg-apricot/40 p-4 text-sm"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-semibold">Local guide not loaded yet</p>
            <p className="mt-1 text-muted-foreground">
              The Gurugram passages are placeholders. Until they are filled in, SahiSort only shows
              national rules and says so on every recommendation.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-2xl border bg-card p-5">
        <p className="text-eyebrow text-muted-foreground">Guide metadata</p>
        <div className="mt-2">
          <MetaRow label="Locality" value={GUIDE_META.locality} />
          <MetaRow label="Authority" value={GUIDE_META.authority} />
          <MetaRow label="Guide title" value={GUIDE_META.guideTitle} />
          <MetaRow label="Guide source" value={GUIDE_META.guideSource} />
          <MetaRow label="Last updated" value={GUIDE_META.lastUpdated} />
          <MetaRow label="Contact" value={GUIDE_META.contact} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          When an item is not covered, SahiSort tells you to {contactLine()}.
        </p>
      </div>

      <h2 className="mt-14 font-display text-3xl">How a recommendation is made</h2>
      <ol className="mt-5 grid gap-3 text-sm">
        {[
          "Identify the object and its likely materials",
          "Build a search query from the object, materials and your answers",
          "Retrieve matching passages from the guide (Gurugram rules outrank national ones)",
          "If nothing is relevant enough, stop: no AI guess, status “Not covered”",
          "Otherwise ask the AI to reason only from those passages and cite them",
          "Validate: drop citations that weren't retrieved, check the category is supported by a citation, and replace its wording with the guide's own text",
          "Show the result with its evidence",
        ].map((s, i) => (
          <li key={s} className="flex gap-4">
            <span className="font-display text-2xl text-primary">{i + 1}</span>
            <span className="pt-1">{s}</span>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 font-display text-3xl">The four states</h2>
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
        {sources.map((s) => {
          const passage = GUIDE.find((g) => g.source === s)!;
          return (
            <li key={s}>
              {passage.url ? (
                <a
                  href={passage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  {s} ↗
                </a>
              ) : (
                s
              )}
            </li>
          );
        })}
      </ul>

      <h2 className="mt-14 font-display text-3xl">Gurugram rules loaded</h2>
      {LOCAL_LOADED.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          None yet. Every recommendation currently relies on national rules.
        </p>
      ) : (
        <div className="mt-6 grid gap-6">
          {LOCAL_LOADED.map((g) => (
            <article key={g.id} id={g.id} className="border-t pt-6">
              <p className="text-eyebrow text-muted-foreground">
                {g.topic} · Gurugram local rule
              </p>
              <p className="mt-2 font-display text-xl leading-snug">{g.text}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {g.source} · {g.section}
              </p>
            </article>
          ))}
        </div>
      )}

      <h2 className="mt-14 font-display text-3xl">National rules</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        These apply in Gurugram, and are labelled “National rule (applies in Gurugram)” wherever
        they are cited.
      </p>
      <div className="mt-6 grid gap-6">
        {GUIDE.filter((g) => g.scope === "national").map((g) => (
          <article key={g.id} id={g.id} className="border-t pt-6">
            <p className="text-eyebrow text-muted-foreground">
              {g.topic} · National rule (applies in Gurugram)
            </p>
            <p className="mt-2 font-display text-xl leading-snug">{g.text}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {g.source} · {g.section}
            </p>
          </article>
        ))}
      </div>

      {LOCAL_PENDING.length > 0 && (
        <div className="mt-14 rounded-2xl border border-dashed p-5">
          <p className="text-eyebrow text-muted-foreground">Not covered by the loaded guide</p>
          <p className="mt-2 text-sm">
            {LOCAL_PENDING.length === 1
              ? "1 local passage is "
              : `${LOCAL_PENDING.length} local passages are `}
            still a placeholder, because the MCG advisory does not state a rule for it. Placeholders
            are excluded from retrieval and are never shown as rules; national rules are used
            instead, with a note.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-xs">
            {LOCAL_PENDING.map((p) => (
              <li key={p.id} className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
                {p.title} · {p.category}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-14 text-sm text-muted-foreground">
        How the evidence is checked is described on{" "}
        <Link to="/about" className="text-primary underline">
          About
        </Link>
        .
      </p>
    </div>
  );
}
