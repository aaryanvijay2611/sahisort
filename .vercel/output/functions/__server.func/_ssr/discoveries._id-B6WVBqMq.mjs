import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as refineDiscovery, i as getDiscovery, l as updateFlags, n as computeDisposal, r as generateProjects, u as useServerFn } from "./sahisort.functions-BxD3aRsb.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as BookmarkCheck, S as Bookmark, _ as Eye, b as CircleCheck, d as Pencil, i as Sparkles, n as WandSparkles, p as LoaderCircle, r as TriangleAlert, v as Clock, w as BookOpen, x as Camera } from "../_libs/lucide-react.mjs";
import { n as RequireAuth, t as Input } from "./auth-card-B0GPvUkd.mjs";
import { n as StatusBadge, t as STATUS } from "./status-badge-IQSR0t-o.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./discoveries._id-DG-hywlo.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discoveries._id-B6WVBqMq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function DiscoveryRouteComponent() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoveryView, { id }) });
}
function DiscoveryView({ id }) {
	const fetchIt = useServerFn(getDiscovery);
	const q = useQuery({
		queryKey: ["discovery", id],
		queryFn: () => fetchIt({ data: { id } })
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin text-primary" })
	});
	if (q.error || !q.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-6 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We couldn't open this discovery." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/collection",
			className: "text-primary",
			children: "Back to collection"
		})]
	});
	const d = q.data.discovery;
	const a = d.analysis;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				id,
				name: d.object_name,
				image: d.image_data,
				saved: d.saved,
				summary: a.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				a,
				answers: d.answers,
				disposal: d.disposal,
				stale: d.disposal_stale
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Understand, {
					id,
					a,
					answers: d.answers
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid content-start gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dispose, {
						id,
						disposal: d.disposal,
						stale: d.disposal_stale,
						confirmed: d.disposal_confirmed_at,
						blocked: !a.identifiable
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recreate, {
						id,
						a,
						projects: q.data.projects
					})]
				})]
			})
		]
	});
}
/** The single confidence/status banner for a discovery. */
function StatusBanner({ a, answers, disposal, stale }) {
	if (!a.identifiable) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: "mt-10 rounded-3xl border-2 border-dashed border-destructive/40 bg-apricot/40 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: "SahiSort can't identify this item yet"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: a.identification_reason || "The photo doesn't show enough of the item to tell what it is or what it's made of."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-medium",
				children: a.next_step || "Retake the photo in good light (or closer to the label), or add a short description below."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "Disposal guidance stays locked until the item is clearer."
			})
		]
	});
	if (!disposal || stale) return null;
	const open = a.questions.filter((q) => !(q.id in answers));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 rounded-3xl border bg-card p-6 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: disposal.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: STATUS[disposal.status].desc
				})]
			}),
			disposal.status === "conditional" && open.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold",
					children: "Open questions that could change this"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 grid gap-1 pl-5 text-sm text-muted-foreground",
					children: open.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "list-disc",
						children: q.question
					}, q.id))
				})]
			}),
			disposal.downgraded_reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: ["Why it isn't stronger: ", disposal.downgraded_reason]
			}),
			disposal.scope_note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 rounded-xl bg-apricot/40 px-3 py-2 text-xs",
				children: disposal.scope_note
			}),
			disposal.status === "not_covered" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: "No AI guess was made for this item — the guide simply doesn't cover it."
			})
		]
	});
}
function useFlag(id) {
	const qc = useQueryClient();
	const fn = useServerFn(updateFlags);
	return useMutation({
		mutationFn: (v) => fn({ data: v }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["discovery", id] });
			qc.invalidateQueries({ queryKey: ["mine"] });
		},
		onError: (e) => toast.error(e.message)
	});
}
function Header({ id, name, image, saved, summary }) {
	const flag = useFlag(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-end gap-8 md:grid-cols-[auto_1fr_auto]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-40 overflow-hidden rounded-3xl bg-sage",
				children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: name,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center font-display text-6xl text-primary",
					children: name[0]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-primary",
					children: "Discovery"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-title",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: summary
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: saved ? "secondary" : "outline",
				className: "rounded-full",
				onClick: () => flag.mutate({
					table: "discoveries",
					id,
					saved: !saved
				}),
				children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, {}), " Saved"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {}), " Save to collection"] })
			})
		]
	});
}
var BASIS = {
	observed: "Observed",
	inferred: "Inferred",
	user_confirmed: "You confirmed"
};
function Understand({ id, a, answers }) {
	const qc = useQueryClient();
	const refine = useServerFn(refineDiscovery);
	const [pending, setPending] = (0, import_react.useState)({});
	const [correcting, setCorrecting] = (0, import_react.useState)(false);
	const [correction, setCorrection] = (0, import_react.useState)("");
	const m = useMutation({
		mutationFn: (v) => refine({ data: {
			id,
			...v
		} }),
		onSuccess: () => {
			setPending({});
			setCorrection("");
			setCorrecting(false);
			qc.invalidateQueries({ queryKey: ["discovery", id] });
			toast.success("Discovery updated");
		},
		onError: (e) => toast.error(e.message)
	});
	const open = a.questions.filter((q) => !(q.id in answers));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid content-start gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border bg-card p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "What SahiSort sees"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-2 text-sm",
						children: a.observations.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-primary" }), o]
						}, o))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-7 text-eyebrow text-muted-foreground",
						children: "Likely materials"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 divide-y rounded-2xl border",
						children: a.materials.map((mat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: mat.component
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: mat.material
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 flex-col items-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", mat.basis === "inferred" ? "bg-apricot/50" : "bg-spring/50"),
									children: BASIS[mat.basis]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground",
									children: mat.certainty === "clear" ? "clear" : mat.certainty === "likely" ? "likely" : "not sure"
								})]
							})]
						}, i))
					}),
					a.mixed_materials && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "Mixed materials. separating parts may change where each goes."
					}),
					a.uncertainties.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl bg-muted p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "What we can't tell from here"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 grid gap-1 text-muted-foreground",
							children: a.uncertainties.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: u }, u))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: correcting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoFocus: true,
								value: correction,
								onChange: (e) => setCorrection(e.target.value),
								placeholder: "e.g. It's a steel can, not aluminium",
								maxLength: 500
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: !correction.trim() || m.isPending,
								onClick: () => m.mutate({
									answers: {},
									correction: correction.trim()
								}),
								children: m.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : "Update"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCorrecting(true),
							className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), " Not right? Correct the identification"]
						})
					})
				]
			}),
			open.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-lime p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-eyebrow",
						children: ["A quick question", open.length > 1 ? "s" : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: "These answers could change the recommendation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-6",
						children: open.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: q.question
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs opacity-70",
								children: q.why
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: q.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setPending({
										...pending,
										[q.id]: o
									}),
									className: cn("rounded-full border border-foreground/15 bg-card px-3.5 py-1.5 text-sm", pending[q.id] === o && "border-primary bg-primary text-primary-foreground"),
									children: o
								}, o))
							})
						] }, q.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6 rounded-full",
						disabled: !Object.keys(pending).length || m.isPending,
						onClick: () => m.mutate({
							answers: Object.fromEntries(Object.entries(pending).map(([k, v]) => [k, `${open.find((x) => x.id === k)?.question} → ${v}`])),
							correction: null
						}),
						children: m.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Updating…"] }) : "Update discovery"
					})
				]
			}),
			!a.identifiable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-apricot/50 p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Why we stopped"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: a.identification_reason || "The item couldn't be identified reliably."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium",
						children: a.next_step || "Retake the photo or add a description, then correct the identification above."
					})
				]
			})
		]
	});
}
function Dispose({ id, disposal, stale, confirmed, blocked }) {
	const qc = useQueryClient();
	const fn = useServerFn(computeDisposal);
	const flag = useFlag(id);
	const m = useMutation({
		mutationFn: () => fn({ data: { id } }),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["discovery", id] }),
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border bg-card p-7 shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Where it belongs"
				})]
			}), disposal && !stale && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: disposal.status })]
		}), !disposal || stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5",
			children: [stale && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 flex items-center gap-2 rounded-xl bg-apricot/40 px-3 py-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), " The discovery changed — the previous recommendation is outdated."]
			}), blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex gap-2 rounded-xl bg-apricot/40 p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }), "Add a clearer photo or a description first. SahiSort won't guess where an unidentified item belongs."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "SahiSort will search its guide, weigh the evidence, and only call a result verified when the passages support it."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5 rounded-full",
				onClick: () => m.mutate(),
				disabled: m.isPending,
				children: m.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Checking the guide…"] }) : stale ? "Refresh recommendation" : "Find the right disposal route"
			})] })]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl",
						children: disposal.status === "not_covered" ? "Not covered by this guide" : disposal.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: disposal.explanation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: [STATUS[disposal.status].desc, disposal.downgraded_reason ? ` (${disposal.downgraded_reason})` : ""]
					})
				] }),
				(disposal.components?.length ?? 0) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow text-muted-foreground",
						children: "Component by component"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 divide-y rounded-2xl border",
						children: disposal.components.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3 px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: c.component
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: c.material
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold", c.supported && c.category ? "bg-spring/50 text-foreground" : "bg-muted text-muted-foreground"),
								children: c.supported && c.category ? c.category : "No guide rule for this part"
							})]
						}, `${c.component}-${c.material}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Each part is matched to the guide on its own, so parts can differ from the overall answer above."
					})
				] }),
				disposal.preparation.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-muted-foreground",
					children: "Prepare it"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 grid gap-2 text-sm",
					children: disposal.preparation.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl text-primary",
							children: i + 1
						}), p]
					}, i))
				})] }),
				[...disposal.conditions, ...disposal.exceptions].length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-muted p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Conditions & exceptions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 grid gap-1 text-muted-foreground",
						children: [...disposal.conditions, ...disposal.exceptions].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", c] }, c))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-muted-foreground",
					children: "Evidence lens"
				}), disposal.evidence.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "No guide passage supports this recommendation."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3",
					children: disposal.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "rounded-2xl border-l-4 border-primary bg-sage p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 text-[11px] font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full border border-primary/30 bg-card px-2 py-0.5",
									children: e.scope === "local" ? "Gurugram local rule" : "National rule (applies in Gurugram)"
								}), e.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-card/70 px-2 py-0.5 text-muted-foreground",
									children: e.category
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "mt-2 font-display text-lg leading-snug",
								children: [
									"\"",
									e.text,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "mt-3 text-xs text-muted-foreground",
								children: [
									e.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: e.url,
										target: "_blank",
										rel: "noreferrer",
										className: "font-semibold text-foreground underline-offset-2 hover:underline",
										children: e.source
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: e.source
									}),
									" ",
									"· ",
									e.section,
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic",
										children: "verbatim from the guide"
									})
								]
							}),
							e.relevance && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Why it applies:"
									}),
									" ",
									e.relevance
								]
							})
						]
					}, e.id))
				})] }),
				[...disposal.missing_information, ...disposal.limitations].length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-foreground",
						children: "Limitations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-1 grid gap-1",
						children: [...disposal.missing_information, ...disposal.limitations].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", l] }, l))
					})]
				}),
				disposal.general_advice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-2xl border border-dashed p-4 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "General tip (not from the guide):"
						}),
						" ",
						disposal.general_advice
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 border-t pt-5",
					children: [confirmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 text-sm text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " You confirmed you followed this"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "rounded-full",
						onClick: () => flag.mutate({
							table: "discoveries",
							id,
							confirmDisposal: true
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), " I followed this recommendation"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => m.mutate(),
						disabled: m.isPending,
						className: "text-xs text-muted-foreground hover:text-foreground",
						children: m.isPending ? "Re-checking…" : "Re-check"
					})]
				})
			]
		})]
	});
}
function Recreate({ id, a, projects }) {
	const qc = useQueryClient();
	const fn = useServerFn(generateProjects);
	const [prefs, setPrefs] = (0, import_react.useState)({
		time: "1 hour",
		difficulty: "easy",
		tools: "scissors, glue, paint",
		intent: "",
		buy_materials: false
	});
	const m = useMutation({
		mutationFn: () => fn({ data: {
			id,
			prefs
		} }),
		onSuccess: (r) => {
			if (r.unsafe) toast.message(r.unsafe);
			qc.invalidateQueries({ queryKey: ["discovery", id] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl bg-sage p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "RE:CREATE"
				})]
			}),
			!a.reuse_safe ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 flex gap-2 rounded-2xl bg-apricot/50 p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0" }),
					" ",
					a.reuse_safety_note || "This item isn't safe to repurpose. Please dispose of it as recommended."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							label: "Time",
							value: prefs.time,
							options: [
								"15 minutes",
								"1 hour",
								"an afternoon"
							],
							onChange: (v) => setPrefs({
								...prefs,
								time: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							label: "Difficulty",
							value: prefs.difficulty,
							options: [
								"easy",
								"medium",
								"involved"
							],
							onChange: (v) => setPrefs({
								...prefs,
								difficulty: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold",
								children: "Tools you have"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "bg-card",
								value: prefs.tools,
								onChange: (e) => setPrefs({
									...prefs,
									tools: e.target.value
								}),
								maxLength: 300
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold",
								children: "Use it for…"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "bg-card",
								placeholder: "storage, gift, garden…",
								value: prefs.intent,
								onChange: (e) => setPrefs({
									...prefs,
									intent: e.target.value
								}),
								maxLength: 300
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: prefs.buy_materials,
							onCheckedChange: (v) => setPrefs({
								...prefs,
								buy_materials: v
							})
						}),
						" ",
						"Happy to buy a few extra materials"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 rounded-full",
					onClick: () => m.mutate(),
					disabled: m.isPending,
					children: m.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Sketching projects…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " Generate projects"] })
				})
			] }),
			projects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-7 grid gap-3",
				children: projects.map((p) => {
					const d = p.data;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/projects/$id",
						params: { id: p.id },
						className: "group flex items-center justify-between gap-4 rounded-2xl bg-card p-4 transition-shadow hover:shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold group-hover:text-primary",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: d.pitch
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shrink-0 text-right text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
										" ",
										d.duration_minutes,
										" min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "capitalize",
									children: d.difficulty
								}),
								p.completed_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-primary",
									children: "Completed"
								})
							]
						})]
					}, p.id);
				})
			})
		]
	});
}
function Choice({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-1.5",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onChange(o),
				className: cn("rounded-full border bg-card px-3 py-1 text-sm capitalize", value === o && "border-primary bg-primary text-primary-foreground"),
				children: o
			}, o))
		})]
	});
}
//#endregion
export { DiscoveryRouteComponent as component };
