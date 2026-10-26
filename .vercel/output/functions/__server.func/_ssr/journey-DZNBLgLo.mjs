import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getJourneyLogs, s as listMine, u as useServerFn } from "./sahisort.functions-BxD3aRsb.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { b as CircleCheck, d as Pencil, i as Sparkles, m as Lightbulb, p as LoaderCircle, v as Clock, y as CircleQuestionMark } from "../_libs/lucide-react.mjs";
import { n as RequireAuth } from "./auth-card-B0GPvUkd.mjs";
import { n as StatusBadge } from "./status-badge-IQSR0t-o.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as canonicalCategory } from "./disposal-rules-D4Sj2tb2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journey-DZNBLgLo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORY_FILTERS = [
	"All",
	"Dry Waste",
	"Wet Waste",
	"Domestic Hazardous",
	"E-Waste",
	"Sanitary",
	"Unclassified"
];
function Journey() {
	const fetchMine = useServerFn(listMine);
	const fetchLogs = useServerFn(getJourneyLogs);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [category, setCategory] = (0, import_react.useState)("All");
	const qMine = useQuery({
		queryKey: ["mine"],
		queryFn: () => fetchMine()
	});
	const qLogs = useQuery({
		queryKey: ["journeyLogs"],
		queryFn: () => fetchLogs()
	});
	if (qMine.isLoading || !qMine.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin text-primary" })
	});
	const { discoveries, projects } = qMine.data;
	const confirmed = discoveries.filter((d) => d.disposal_confirmed_at);
	const completed = projects.filter((p) => p.completed_at);
	const logs = qLogs.data ?? [];
	const materials = /* @__PURE__ */ new Map();
	for (const d of discoveries) for (const m of d.analysis.materials ?? []) {
		const k = (m.material.split(/[ (,]/)[0] ?? m.material).toLowerCase();
		materials.set(k, (materials.get(k) ?? 0) + 1);
	}
	const mats = [...materials.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
	const maxM = Math.max(1, ...mats.map((m) => m[1]));
	const statuses = {
		verified: 0,
		conditional: 0,
		insufficient: 0,
		not_covered: 0
	};
	for (const d of discoveries) {
		const s = d.disposal?.status;
		if (s && s in statuses) statuses[s]++;
	}
	const history = discoveries.map((d) => {
		const disposal = d.disposal;
		const cat = disposal ? canonicalCategory(disposal.category) ?? "Unclassified" : "Unclassified";
		const answers = d.answers ?? {};
		return {
			id: d.id,
			item: d.object_name,
			category: cat,
			status: disposal?.status ?? null,
			created_at: d.created_at,
			correction: answers["correction"] ?? ""
		};
	});
	const filteredHistory = category === "All" ? history : history.filter((h) => h.category === category);
	const categoryCounts = CATEGORY_FILTERS.slice(1).map((c) => ({
		category: c,
		count: history.filter((h) => h.category === c).length
	}));
	const maxCategory = Math.max(1, ...categoryCounts.map((c) => c.count));
	const filteredLogs = logs.filter((l) => {
		if (filter === "actions") return l.kind === "disposal_confirmed" || l.kind === "project_completed" || l.kind === "step_progress";
		if (filter === "inputs") return l.kind === "discovered" || l.kind === "answered" || l.kind === "corrected" || l.kind === "projects_generated";
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-eyebrow text-primary",
				children: "Journey"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 max-w-3xl font-display text-title",
				children: "A record of every input & action."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-muted-foreground",
				children: "From initial object descriptions and answers to verified disposals and hand-made upcycles, SahiSort permanently records your sustainability steps."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-4",
				children: [
					["Discoveries", discoveries.length],
					["Disposals followed", confirmed.length],
					["Projects drafted", projects.length],
					["Projects completed", completed.length]
				].map(([l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-7xl text-primary",
						children: v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: l
					})]
				}, l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-3xl border bg-card p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow",
							children: "Past discoveries"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1 rounded-full bg-muted p-1 text-xs",
							children: CATEGORY_FILTERS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCategory(c),
								"aria-pressed": category === c,
								className: cn("rounded-full px-3 py-1 font-medium transition-colors", category === c && "bg-card text-foreground shadow-soft"),
								children: c
							}, c))
						})]
					}),
					filteredHistory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-sm text-muted-foreground",
						children: [
							"No discoveries in this category yet.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/discover",
								className: "text-primary underline",
								children: "Start one"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[40rem] border-collapse text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b text-left text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-semibold",
										children: "Item"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-semibold",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-semibold",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-semibold",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-semibold",
										children: "Your correction"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredHistory.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/discoveries/$id",
											params: { id: h.id },
											className: "font-medium hover:text-primary hover:underline",
											children: h.item
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4 text-muted-foreground",
										children: h.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4",
										children: h.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: h.status }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Not checked"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4 text-xs text-muted-foreground",
										children: new Date(h.created_at).toLocaleDateString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "max-w-[16rem] py-3 text-xs",
										children: h.correction ? h.correction : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "—"
										})
									})
								]
							}, h.id)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow",
							children: "Discoveries by category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-2",
							children: categoryCounts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[9rem_1fr_2rem] items-center gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.category }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-3 rounded-full bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-3 rounded-full bg-primary",
											style: { width: `${c.count / maxCategory * 100}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-right text-muted-foreground",
										children: c.count
									})
								]
							}, c.category))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-[1.1fr_1.3fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-sage p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow",
								children: "Materials you've met"
							}),
							mats.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted-foreground",
								children: "Nothing yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid gap-3",
								children: mats.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[7rem_1fr_2rem] items-center gap-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "capitalize",
											children: k
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-3 rounded-full bg-card",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-3 rounded-full bg-primary",
												style: { width: `${v / maxM * 100}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-right text-muted-foreground",
											children: v
										})
									]
								}, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-8 text-eyebrow",
								children: "Evidence quality of your recommendations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-6 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "font-display text-3xl",
										children: statuses.verified
									}), " verified"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "font-display text-3xl",
										children: statuses.conditional
									}), " conditional"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "font-display text-3xl",
										children: statuses.insufficient
									}), " insufficient"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "font-display text-3xl",
										children: statuses.not_covered
									}), " not covered"] })
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border bg-card p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-b pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow",
							children: "Interactive Journey Timeline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1 rounded-full bg-muted p-1 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setFilter("all"),
									className: cn("rounded-full px-3 py-1 font-medium transition-colors", filter === "all" && "bg-card shadow-soft text-foreground"),
									children: [
										"All (",
										logs.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilter("actions"),
									className: cn("rounded-full px-3 py-1 font-medium transition-colors", filter === "actions" && "bg-card shadow-soft text-foreground"),
									children: "Actions"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFilter("inputs"),
									className: cn("rounded-full px-3 py-1 font-medium transition-colors", filter === "inputs" && "bg-card shadow-soft text-foreground"),
									children: "Inputs & Notes"
								})
							]
						})]
					}), filteredLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-sm text-muted-foreground",
						children: [
							"No activity matching this filter.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/discover",
								className: "text-primary underline",
								children: "Start a new discovery"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 grid gap-5 border-l border-border pl-6",
						children: filteredLogs.map((log) => {
							const Icon = log.kind === "disposal_confirmed" ? CircleCheck : log.kind === "project_completed" ? Sparkles : log.kind === "corrected" ? Pencil : log.kind === "answered" ? CircleQuestionMark : log.kind === "projects_generated" ? Lightbulb : Clock;
							const link = log.discovery_id ? `/discoveries/${log.discovery_id}` : log.project_id ? `/projects/${log.project_id}` : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -left-[2.1rem] top-1 flex size-5 items-center justify-center rounded-full bg-card border border-primary text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-baseline justify-between gap-2",
										children: [link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: link,
											className: "text-sm font-semibold hover:text-primary hover:underline",
											children: log.title
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold",
											children: log.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											className: "text-[11px] text-muted-foreground",
											children: new Date(log.created_at).toLocaleString()
										})]
									}),
									log.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground bg-muted/40 rounded-xl px-3 py-1.5 border",
										children: log.detail
									})
								]
							}, log.id);
						})
					})]
				})]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
	title: "Sign in to see your journey",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journey, {})
});
//#endregion
export { SplitComponent as component };
