import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as MapPin, r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as StatusBadge, t as STATUS } from "./status-badge-IQSR0t-o.mjs";
import { c as guideLabel, f as isGuidePending, i as LOCAL_PENDING, m as isTodo, n as GUIDE_META, r as LOCAL_LOADED, s as contactLine, t as GUIDE } from "./guide-Dvwp24Fc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-BEdfArqP.js
var import_jsx_runtime = require_jsx_runtime();
function MetaRow({ label, value }) {
	const missing = isTodo(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-0.5 border-b py-2 text-sm sm:flex-row sm:justify-between sm:gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: missing ? "font-mono text-xs text-destructive" : "text-right",
			children: missing ? "TODO — not supplied yet" : value
		})]
	});
}
function Guide() {
	const pending = isGuidePending();
	const sources = [...new Set(GUIDE.map((g) => g.source))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-eyebrow text-primary",
				children: "The Guide"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-title",
				children: "What SahiSort reads before it recommends."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 flex items-center gap-2 text-sm font-semibold text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary" }),
					" ",
					guideLabel()
				]
			}),
			pending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				className: "mt-4 flex gap-3 rounded-2xl border border-dashed border-conditional/60 bg-apricot/40 p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: "Local guide not loaded yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground",
					children: "The Gurugram passages are placeholders. Until they are filled in, SahiSort only shows national rules and says so on every recommendation."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow text-muted-foreground",
						children: "Guide metadata"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
								label: "Locality",
								value: GUIDE_META.locality
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
								label: "Authority",
								value: GUIDE_META.authority
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
								label: "Guide title",
								value: GUIDE_META.guideTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
								label: "Guide source",
								value: GUIDE_META.guideSource
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
								label: "Last updated",
								value: GUIDE_META.lastUpdated
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
								label: "Contact",
								value: GUIDE_META.contact
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: [
							"When an item is not covered, SahiSort tells you to ",
							contactLine(),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "How a recommendation is made"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 grid gap-3 text-sm",
				children: [
					"Identify the object and its likely materials",
					"Build a search query from the object, materials and your answers",
					"Retrieve matching passages from the guide (Gurugram rules outrank national ones)",
					"If nothing is relevant enough, stop: no AI guess, status “Not covered”",
					"Otherwise ask the AI to reason only from those passages and cite them",
					"Validate: drop citations that weren't retrieved, check the category is supported by a citation, and replace its wording with the guide's own text",
					"Show the result with its evidence"
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-primary",
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pt-1",
						children: s
					})]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "The four states"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-4",
				children: Object.keys(STATUS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
						status: k,
						className: "shrink-0"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: STATUS[k].desc
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "Sources"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-1 text-sm",
				children: sources.map((s) => {
					const passage = GUIDE.find((g) => g.source === s);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: passage.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: passage.url,
						target: "_blank",
						rel: "noreferrer",
						className: "underline-offset-2 hover:underline",
						children: [s, " ↗"]
					}) : s }, s);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "Gurugram rules loaded"
			}),
			LOCAL_LOADED.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "None yet. Every recommendation currently relies on national rules."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-6",
				children: LOCAL_LOADED.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					id: g.id,
					className: "border-t pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-eyebrow text-muted-foreground",
							children: [g.topic, " · Gurugram local rule"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-xl leading-snug",
							children: g.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								g.source,
								" · ",
								g.section
							]
						})
					]
				}, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-3xl",
				children: "National rules"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "These apply in Gurugram, and are labelled “National rule (applies in Gurugram)” wherever they are cited."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-6",
				children: GUIDE.filter((g) => g.scope === "national").map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					id: g.id,
					className: "border-t pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-eyebrow text-muted-foreground",
							children: [g.topic, " · National rule (applies in Gurugram)"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-xl leading-snug",
							children: g.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								g.source,
								" · ",
								g.section
							]
						})
					]
				}, g.id))
			}),
			LOCAL_PENDING.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 rounded-2xl border border-dashed p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow text-muted-foreground",
						children: "Not covered by the loaded guide"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [LOCAL_PENDING.length === 1 ? "1 local passage is " : `${LOCAL_PENDING.length} local passages are `, "still a placeholder, because the MCG advisory does not state a rule for it. Placeholders are excluded from retrieval and are never shown as rules; national rules are used instead, with a note."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-2 text-xs",
						children: LOCAL_PENDING.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-full bg-muted px-3 py-1 text-muted-foreground",
							children: [
								p.title,
								" · ",
								p.category
							]
						}, p.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-14 text-sm text-muted-foreground",
				children: [
					"How the evidence is checked is described on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "text-primary underline",
						children: "About"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
export { Guide as component };
