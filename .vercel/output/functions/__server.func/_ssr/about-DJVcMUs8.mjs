import { t as hero_still_life_default } from "./hero-still-life-DgQAH9AH.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DJVcMUs8.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-[1.1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-primary",
					children: "About"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-title",
					children: "Everyday objects have possibilities beyond their immediate use."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-5 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Some belong in a particular disposal stream. Some can be reused. Some contain mixed materials that need a closer look. Some should never be repurposed because it would be unsafe." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-foreground",
						children: "Sahi"
					}), " means \"right\" in Hindi. SahiSort helps you understand those possibilities and choose the right next step — with AI that shows its reasoning and admits uncertainty."] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-12 font-display text-3xl",
					children: "What it can't do"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 grid gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "It can't prove a material from a photo. Labels and your answers matter." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Its guide covers India's national rules, not your city's collection days or facilities." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "AI-drafted projects are ideas, not tested instructions. Use the safety notes." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/guide",
					className: "mt-8 inline-block text-sm text-primary underline",
					children: "See the Guide"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_still_life_default,
				alt: "Everyday objects in daylight",
				loading: "lazy",
				width: 1536,
				height: 1152,
				className: "h-full w-full rounded-[2rem] object-cover"
			})]
		})
	});
}
//#endregion
export { About as component };
