import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as updateFlags, o as getProject, u as useServerFn } from "./sahisort.functions-BxD3aRsb.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as BookmarkCheck, D as ArrowLeft, S as Bookmark, b as CircleCheck, c as ShieldAlert, g as Gauge, p as LoaderCircle, v as Clock } from "../_libs/lucide-react.mjs";
import { n as RequireAuth } from "./auth-card-B0GPvUkd.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./projects._id-BzLQd1-I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._id-D7KaH1n6.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectRouteComponent() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectView, { id }) });
}
function ProjectView({ id }) {
	const fetchIt = useServerFn(getProject);
	const flagFn = useServerFn(updateFlags);
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["project", id],
		queryFn: () => fetchIt({ data: { id } })
	});
	const flag = useMutation({
		mutationFn: (v) => flagFn({ data: {
			table: "projects",
			id,
			...v
		} }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["project", id] });
			qc.invalidateQueries({ queryKey: ["mine"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin text-primary" })
	});
	if (!q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-24 text-center",
		children: "Project not found."
	});
	const p = q.data.data;
	const disc = q.data.discoveries;
	const done = q.data.completed_steps ?? [];
	function toggleStep(index) {
		const next = done.includes(index) ? done.filter((x) => x !== index) : [...done, index];
		flag.mutate({ completedSteps: next });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-6 py-12",
		children: [disc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/discoveries/$id",
			params: { id: disc.id },
			className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }),
				" From your ",
				disc.object_name
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-10 lg:grid-cols-[1fr_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-primary",
					children: "RE:CREATE project · AI-drafted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-title",
					children: p.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg text-muted-foreground",
					children: p.pitch
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
								" ",
								p.duration_minutes,
								" min"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 capitalize",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-4" }),
								" ",
								p.difficulty
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-lime px-3 py-1",
							children: p.use
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-12 text-eyebrow text-muted-foreground",
					children: "Steps"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 grid gap-3",
					children: p.steps.map((s, i) => {
						const on = done.includes(i);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toggleStep(i),
							className: cn("flex w-full gap-5 rounded-2xl border bg-card p-5 text-left transition-colors", on && "border-primary/40 bg-sage"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("font-display text-4xl leading-none", on ? "text-primary" : "text-spring"),
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("block font-semibold", on && "line-through opacity-60"),
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm text-muted-foreground",
								children: s.detail
							})] })]
						}) }, i);
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "grid content-start gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow text-muted-foreground",
								children: "Materials"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 grid gap-2 text-sm",
								children: p.materials.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.item }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-xs", m.have_it ? "text-primary" : "text-muted-foreground"),
										children: m.have_it ? "likely have" : "may need"
									})]
								}, m.item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-eyebrow text-muted-foreground",
								children: "Tools"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: p.tools.join(", ")
							})
						]
					}),
					p.safety_notes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-apricot/50 p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" }), " Safety"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 grid gap-1 text-sm",
							children: p.safety_notes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s }, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl bg-sage p-6 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Why this fits you"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: p.why_it_fits
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "rounded-full",
						onClick: () => flag.mutate({ saved: !q.data.saved }),
						children: q.data.saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, {}), " Saved"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {}), " Save project"] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "rounded-full",
						variant: q.data.completed_at ? "secondary" : "default",
						onClick: () => flag.mutate({ completed: !q.data.completed_at }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
							" ",
							q.data.completed_at ? "Completed (undo)" : "I made this"
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { ProjectRouteComponent as component };
