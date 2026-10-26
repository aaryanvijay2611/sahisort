import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as listMine, u as useServerFn } from "./sahisort.functions-BxD3aRsb.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { p as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as RequireAuth } from "./auth-card-B0GPvUkd.mjs";
import { n as StatusBadge } from "./status-badge-IQSR0t-o.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collection-CC7QqE-m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Collection() {
	const fn = useServerFn(listMine);
	const q = useQuery({
		queryKey: ["mine"],
		queryFn: () => fn()
	});
	const [tab, setTab] = (0, import_react.useState)("all");
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin text-primary" })
	});
	const discs = (q.data?.discoveries ?? []).filter((d) => tab !== "saved" || d.saved);
	const projects = (q.data?.projects ?? []).filter((p) => p.saved || p.completed_at);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-6 border-b pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-eyebrow text-primary",
				children: "Collection"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-title",
				children: "Your archive of objects."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 rounded-full bg-muted p-1 text-sm",
				children: [
					"all",
					"saved",
					"projects"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setTab(t),
					className: cn("rounded-full px-4 py-1.5 capitalize", tab === t && "bg-card shadow-soft"),
					children: t === "all" ? "All discoveries" : t === "saved" ? "Saved" : "Saved projects"
				}, t))
			})]
		}), tab === "projects" ? projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "Save or complete a project and it will live here." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-4 md:grid-cols-2",
			children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/projects/$id",
				params: { id: p.id },
				className: "rounded-3xl bg-sage p-6 hover:bg-lime",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl",
					children: p.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						p.completed_at ? "Completed" : "Saved",
						" ·",
						" ",
						new Date(p.created_at).toLocaleDateString()
					]
				})]
			}, p.id))
		}) : discs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "No discoveries yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3",
			children: discs.map((d, i) => {
				const disp = d.disposal;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/discoveries/$id",
					params: { id: d.id },
					className: "mb-5 block break-inside-avoid overflow-hidden rounded-3xl border bg-card transition-shadow hover:shadow-lift",
					children: [d.image_data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: d.image_data,
						alt: d.object_name,
						className: cn("w-full object-cover", i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex aspect-[4/3] items-center justify-center bg-sage font-display text-7xl text-primary",
						children: d.object_name[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: d.object_name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
							children: [
								disp && !d.disposal_stale ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: disp.status }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.disposal_stale ? "Recommendation outdated" : "No recommendation yet" }),
								d.saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-lime px-2 py-0.5 text-foreground",
									children: "Saved"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(d.created_at).toLocaleDateString() })
							]
						})]
					})]
				}, d.id);
			})
		})]
	});
}
function Empty({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 rounded-3xl border border-dashed p-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/discover",
			className: "mt-4 inline-block text-sm text-primary underline",
			children: "Discover an object"
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
	title: "Sign in to see your collection",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection, {})
});
//#endregion
export { SplitComponent as component };
