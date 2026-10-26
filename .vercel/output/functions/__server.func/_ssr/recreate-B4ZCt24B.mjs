import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as listMine, u as useServerFn } from "./sahisort.functions-BxD3aRsb.mjs";
import { t as useAuth } from "./use-auth-B4hykVTJ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { E as ArrowRight, p as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as recreate_workshop_default } from "./recreate-workshop-DRqZp_b9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recreate-B4ZCt24B.js
var import_jsx_runtime = require_jsx_runtime();
function Recreate() {
	const { session } = useAuth();
	const fn = useServerFn(listMine);
	const q = useQuery({
		queryKey: ["mine"],
		queryFn: () => fn(),
		enabled: !!session
	});
	const reusable = (q.data?.discoveries ?? []).filter((d) => d.analysis?.reuse_safe);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: recreate_workshop_default,
			alt: "Reuse workshop table",
			width: 1536,
			height: 1024,
			className: "h-[46vh] min-h-80 w-full object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto -mt-28 max-w-7xl px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-2xl rounded-[2rem] bg-card p-10 shadow-lift",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow text-primary",
						children: "The studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-display text-title",
						children: ["RE:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "CREATE" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Pick something you've discovered. SahiSort drafts projects shaped by your time, tools and what you want to make, with steps and safety notes. Unsafe items are never repurposed."
					})
				]
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-7xl px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Your workbench"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/discover",
						children: "Discover something new"
					})
				})]
			}),
			!session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/discover",
						className: "text-primary underline",
						children: "Sign in and discover an object"
					}),
					" ",
					"to start creating."
				]
			}) : q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mt-10 animate-spin text-primary" }) : reusable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-3xl border border-dashed p-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl",
					children: "Nothing on the bench yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Discover an object and its reuse ideas will appear here."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: reusable.map((d) => {
					const count = q.data.projects.filter((p) => p.discovery_id === d.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/discoveries/$id",
						params: { id: d.id },
						className: "group overflow-hidden rounded-3xl border bg-card transition-shadow hover:shadow-lift",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[4/3] bg-sage",
							children: d.image_data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: d.image_data,
								alt: d.object_name,
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center font-display text-7xl text-primary",
								children: d.object_name[0]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: d.object_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: count ? `${count} project ideas` : "No projects yet"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-1" })]
						})]
					}, d.id);
				})
			}),
			q.data && q.data.projects.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-16 text-eyebrow text-muted-foreground",
				children: "Recent projects"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 md:grid-cols-2",
				children: q.data.projects.slice(0, 6).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects/$id",
					params: { id: p.id },
					className: "rounded-2xl bg-sage p-5 hover:bg-lime",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: p.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: p.data.pitch
					})]
				}, p.id))
			})] })
		]
	})] });
}
//#endregion
export { Recreate as component };
