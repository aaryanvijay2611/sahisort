import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as signUpWithEmail, n as signInWithEmail, r as signInWithGoogle } from "./client-dBu0b8No.mjs";
import { t as useAuth } from "./use-auth-B4hykVTJ.mjs";
import { t as Label$1 } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { p as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-card-B0GPvUkd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Label$1.displayName;
function AuthCard({ title = "Sign in to keep your discoveries" }) {
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { demoMode, startDemo } = useAuth();
	async function handleGoogleSignIn() {
		setBusy(true);
		try {
			await signInWithGoogle();
			toast.success("Signed in with Google!");
		} catch (err) {
			console.error("[Google Auth Error]:", err);
			const code = err?.code;
			if (code === "auth/operation-not-allowed") toast.error("Google sign-in is disabled in Firebase Console. Enable it under Authentication → Sign-in method.");
			else if (code === "auth/unauthorized-domain") toast.error(`Domain "${window.location.hostname}" is not authorized. Add it in Firebase Console → Authentication → Settings → Authorized domains.`);
			else if (code === "auth/popup-blocked") toast.error("Google sign-in popup was blocked by your browser. Please allow popups.");
			else if (code === "auth/popup-closed-by-user") toast.info("Sign-in cancelled.");
			else {
				const message = err instanceof Error ? err.message : "Failed to sign in with Google";
				toast.error(message);
			}
		} finally {
			setBusy(false);
		}
	}
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "in") {
				await signInWithEmail(email, password);
				toast.success("Welcome back!");
			} else {
				await signUpWithEmail(email, password);
				toast.success("Account created successfully!");
			}
		} catch (err) {
			console.error(err);
			const message = err instanceof Error ? err.message : "Authentication error";
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-md rounded-3xl border bg-card p-8 shadow-soft animate-rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-eyebrow text-primary",
				children: "SahiSort account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-4xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Your discoveries, projects and journey are stored privately to your account."
			}),
			demoMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-2xl border border-dashed bg-sage/60 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "h-11 w-full rounded-full text-sm font-medium",
					onClick: startDemo,
					children: "Try without signing in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Opens a shared demo session on this device only. Nothing is saved to an account."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "h-11 w-full gap-2 text-sm font-medium",
					onClick: handleGoogleSignIn,
					disabled: busy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "size-4",
						viewBox: "0 0 24 24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#4285F4",
								d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#34A853",
								d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#FBBC05",
								d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "#EA4335",
								d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
							})
						]
					}), "Continue with Google"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
					"or email",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "pw",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pw",
							type: "password",
							required: true,
							minLength: 6,
							value: password,
							onChange: (e) => setPassword(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: busy,
						children: [
							busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }),
							" ",
							mode === "in" ? "Sign in" : "Create account"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline",
				onClick: () => setMode(mode === "in" ? "up" : "in"),
				children: mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"
			})
		]
	});
}
function RequireAuth({ children, title }) {
	const { session, ready } = useAuth();
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin text-primary" })
	});
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-6 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCard, { title })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { RequireAuth as n, Input as t };
