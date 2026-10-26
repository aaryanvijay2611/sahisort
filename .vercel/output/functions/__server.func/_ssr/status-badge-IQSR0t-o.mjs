import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as ShieldQuestionMark, c as ShieldAlert, o as ShieldOff, s as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-IQSR0t-o.js
var import_jsx_runtime = require_jsx_runtime();
var STATUS = {
	verified: {
		label: "Verified",
		icon: ShieldCheck,
		cls: "bg-verified/12 text-verified border-verified/30",
		desc: "The guide clearly supports this recommendation for this material and condition."
	},
	conditional: {
		label: "Conditional",
		icon: ShieldQuestionMark,
		cls: "bg-conditional/15 text-foreground border-conditional/40",
		desc: "This depends on a condition or an unanswered question. Check the conditions below."
	},
	insufficient: {
		label: "Insufficient evidence",
		icon: ShieldAlert,
		cls: "bg-insufficient/12 text-foreground border-insufficient/40",
		desc: "The configured guide doesn't adequately cover this item. Treat any advice as general."
	},
	not_covered: {
		label: "Not covered",
		icon: ShieldOff,
		cls: "bg-muted text-muted-foreground border-border",
		desc: "This item is not covered by the configured waste-management guide. Contact your local authority for guidance."
	}
};
function StatusBadge({ status, className }) {
	const s = STATUS[status];
	const Icon = s.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold", s.cls, className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }),
			" ",
			s.label
		]
	});
}
//#endregion
export { StatusBadge as n, STATUS as t };
