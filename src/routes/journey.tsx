import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  HelpCircle,
  Lightbulb,
  ListFilter,
  Loader2,
  Pencil,
  Sparkles,
  Trash2,
} from "lucide-react";
import { RequireAuth } from "@/components/auth-card";
import { StatusBadge } from "@/components/status-badge";
import { listMine, getJourneyLogs } from "@/lib/sahisort.functions";
import { canonicalCategory } from "@/lib/disposal-rules";
import type { Analysis, Disposal } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const CATEGORY_FILTERS = [
  "All",
  "Dry Waste",
  "Wet Waste",
  "Domestic Hazardous",
  "E-Waste",
  "Sanitary",
  "Unclassified",
] as const;

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Journey | SahiSort" },
      {
        name: "description",
        content:
          "Your complete sustainability journey, tracking all your discoveries, answered questions, corrections, and confirmed actions.",
      },
      { property: "og:title", content: "Journey | SahiSort" },
      {
        property: "og:description",
        content: "Real activity: discoveries, inputs, confirmed disposals and completed projects.",
      },
    ],
  }),
  component: () => (
    <RequireAuth title="Sign in to see your journey">
      <Journey />
    </RequireAuth>
  ),
});

function Journey() {
  const fetchMine = useServerFn(listMine);
  const fetchLogs = useServerFn(getJourneyLogs);
  const [filter, setFilter] = useState<"all" | "actions" | "inputs">("all");
  const [category, setCategory] = useState<(typeof CATEGORY_FILTERS)[number]>("All");

  const qMine = useQuery({ queryKey: ["mine"], queryFn: () => fetchMine() });
  const qLogs = useQuery({ queryKey: ["journeyLogs"], queryFn: () => fetchLogs() });

  if (qMine.isLoading || !qMine.data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  const { discoveries, projects } = qMine.data;
  const confirmed = discoveries.filter((d) => d.disposal_confirmed_at);
  const completed = projects.filter((p) => p.completed_at);
  const logs = qLogs.data ?? [];

  const materials = new Map<string, number>();
  for (const d of discoveries) {
    for (const m of (d.analysis as unknown as Analysis).materials ?? []) {
      const k = (m.material.split(/[ (,]/)[0] ?? m.material).toLowerCase();
      materials.set(k, (materials.get(k) ?? 0) + 1);
    }
  }
  const mats = [...materials.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxM = Math.max(1, ...mats.map((m) => m[1]));

  const statuses = { verified: 0, conditional: 0, insufficient: 0, not_covered: 0 };
  for (const d of discoveries) {
    const s = (d.disposal as unknown as Disposal | null)?.status;
    if (s && s in statuses) statuses[s]++;
  }

  // Past discoveries table + category chart (disposal-based).
  const history = discoveries.map((d) => {
    const disposal = d.disposal as unknown as Disposal | null;
    const cat = disposal ? (canonicalCategory(disposal.category) ?? "Unclassified") : "Unclassified";
    const answers = (d.answers ?? {}) as Record<string, string>;
    return {
      id: d.id,
      item: d.object_name,
      category: cat,
      status: disposal?.status ?? null,
      created_at: d.created_at,
      correction: answers["correction"] ?? "",
    };
  });
  const filteredHistory = category === "All" ? history : history.filter((h) => h.category === category);
  const categoryCounts = CATEGORY_FILTERS.slice(1).map((c) => ({
    category: c,
    count: history.filter((h) => h.category === c).length,
  }));
  const maxCategory = Math.max(1, ...categoryCounts.map((c) => c.count));

  // Filter logs based on selection
  const filteredLogs = logs.filter((l) => {
    if (filter === "actions") {
      return (
        l.kind === "disposal_confirmed" ||
        l.kind === "project_completed" ||
        l.kind === "step_progress"
      );
    }
    if (filter === "inputs") {
      return (
        l.kind === "discovered" ||
        l.kind === "answered" ||
        l.kind === "corrected" ||
        l.kind === "projects_generated"
      );
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <p className="text-eyebrow text-primary">Journey</p>
      <h1 className="mt-2 max-w-3xl font-display text-title">A record of every input & action.</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        From initial object descriptions and answers to verified disposals and hand-made upcycles,
        SahiSort permanently records your sustainability steps.
      </p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Discoveries", discoveries.length],
          ["Disposals followed", confirmed.length],
          ["Projects drafted", projects.length],
          ["Projects completed", completed.length],
        ].map(([l, v]) => (
          <div key={l} className="bg-card p-8">
            <p className="font-display text-7xl text-primary">{v}</p>
            <p className="mt-2 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-3xl border bg-card p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-eyebrow">Past discoveries</p>
          <div className="flex flex-wrap gap-1 rounded-full bg-muted p-1 text-xs">
            {CATEGORY_FILTERS.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition-colors",
                  category === c && "bg-card text-foreground shadow-soft",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">
            No discoveries in this category yet.{" "}
            <Link to="/discover" className="text-primary underline">
              Start one
            </Link>
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2 pr-4 font-semibold">Item</th>
                  <th className="py-2 pr-4 font-semibold">Category</th>
                  <th className="py-2 pr-4 font-semibold">Status</th>
                  <th className="py-2 pr-4 font-semibold">Date</th>
                  <th className="py-2 font-semibold">Your correction</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((h) => (
                  <tr key={h.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <Link
                        to="/discoveries/$id"
                        params={{ id: h.id }}
                        className="font-medium hover:text-primary hover:underline"
                      >
                        {h.item}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{h.category}</td>
                    <td className="py-3 pr-4">
                      {h.status ? (
                        <StatusBadge status={h.status} />
                      ) : (
                        <span className="text-xs text-muted-foreground">Not checked</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-xs text-muted-foreground">
                      {new Date(h.created_at).toLocaleDateString()}
                    </td>
                    <td className="max-w-[16rem] py-3 text-xs">
                      {h.correction ? (
                        h.correction
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <p className="text-eyebrow">Discoveries by category</p>
          <div className="mt-4 grid gap-2">
            {categoryCounts.map((c) => (
              <div
                key={c.category}
                className="grid grid-cols-[9rem_1fr_2rem] items-center gap-3 text-sm"
              >
                <span>{c.category}</span>
                <div className="h-3 rounded-full bg-muted">
                  <div
                    className="h-3 rounded-full bg-primary"
                    style={{ width: `${(c.count / maxCategory) * 100}%` }}
                  />
                </div>
                <span className="text-right text-muted-foreground">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1.3fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-sage p-8">
            <p className="text-eyebrow">Materials you've met</p>
            {mats.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">Nothing yet.</p>
            ) : (
              <div className="mt-6 grid gap-3">
                {mats.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[7rem_1fr_2rem] items-center gap-3 text-sm"
                  >
                    <span className="capitalize">{k}</span>
                    <div className="h-3 rounded-full bg-card">
                      <div
                        className="h-3 rounded-full bg-primary"
                        style={{ width: `${(v / maxM) * 100}%` }}
                      />
                    </div>
                    <span className="text-right text-muted-foreground">{v}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-8 text-eyebrow">Evidence quality of your recommendations</p>
            <div className="mt-3 flex gap-6 text-sm">
              <span>
                <b className="font-display text-3xl">{statuses.verified}</b> verified
              </span>
              <span>
                <b className="font-display text-3xl">{statuses.conditional}</b> conditional
              </span>
              <span>
                <b className="font-display text-3xl">{statuses.insufficient}</b> insufficient
              </span>
              <span>
                <b className="font-display text-3xl">{statuses.not_covered}</b> not covered
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <p className="text-eyebrow">Interactive Journey Timeline</p>
            <div className="flex gap-1 rounded-full bg-muted p-1 text-xs">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition-colors",
                  filter === "all" && "bg-card shadow-soft text-foreground",
                )}
              >
                All ({logs.length})
              </button>
              <button
                onClick={() => setFilter("actions")}
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition-colors",
                  filter === "actions" && "bg-card shadow-soft text-foreground",
                )}
              >
                Actions
              </button>
              <button
                onClick={() => setFilter("inputs")}
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition-colors",
                  filter === "inputs" && "bg-card shadow-soft text-foreground",
                )}
              >
                Inputs & Notes
              </button>
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              No activity matching this filter.{" "}
              <Link to="/discover" className="text-primary underline">
                Start a new discovery
              </Link>
            </p>
          ) : (
            <ol className="mt-6 grid gap-5 border-l border-border pl-6">
              {filteredLogs.map((log) => {
                const Icon =
                  log.kind === "disposal_confirmed"
                    ? CheckCircle2
                    : log.kind === "project_completed"
                      ? Sparkles
                      : log.kind === "corrected"
                        ? Pencil
                        : log.kind === "answered"
                          ? HelpCircle
                          : log.kind === "projects_generated"
                            ? Lightbulb
                            : Clock;

                const link = log.discovery_id
                  ? `/discoveries/${log.discovery_id}`
                  : log.project_id
                    ? `/projects/${log.project_id}`
                    : null;

                return (
                  <li key={log.id} className="relative group">
                    <span className="absolute -left-[2.1rem] top-1 flex size-5 items-center justify-center rounded-full bg-card border border-primary text-primary">
                      <Icon className="size-3" />
                    </span>

                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      {link ? (
                        <Link
                          to={link}
                          className="text-sm font-semibold hover:text-primary hover:underline"
                        >
                          {log.title}
                        </Link>
                      ) : (
                        <span className="text-sm font-semibold">{log.title}</span>
                      )}
                      <time className="text-[11px] text-muted-foreground">
                        {new Date(log.created_at).toLocaleString()}
                      </time>
                    </div>

                    {log.detail && (
                      <p className="mt-1 text-xs text-muted-foreground bg-muted/40 rounded-xl px-3 py-1.5 border">
                        {log.detail}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
