import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as ClientOnly, S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useLocation, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as signOutUser } from "./client-dBu0b8No.mjs";
import { t as useAuth } from "./use-auth-B4hykVTJ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$8 } from "./discoveries._id-DG-hywlo.mjs";
import { c as guideLabel, f as isGuidePending, n as GUIDE_META } from "./guide-Dvwp24Fc.mjs";
import { t as Route$9 } from "./projects._id-BzLQd1-I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DePkthwN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CAx9KHzh.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message: describeThrown(error),
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
var NAV = [
	{
		to: "/discover",
		label: "Discover"
	},
	{
		to: "/recreate",
		label: "RE:CREATE"
	},
	{
		to: "/collection",
		label: "Collection"
	},
	{
		to: "/journey",
		label: "Journey"
	},
	{
		to: "/guide",
		label: "Guide"
	}
];
function Logo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-baseline gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-3xl leading-none",
			children: "Sahi"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-3xl italic leading-none text-primary",
			children: "Sort"
		})]
	});
}
function SiteHeader() {
	const { user, demo, exitDemo } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b bg-background/85 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						className: "rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
						activeProps: { className: "bg-secondary text-foreground" },
						children: n.label
					}, n.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						demo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground sm:inline",
							children: "Try-out mode"
						}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => signOutUser(),
							children: "Sign out"
						}) : demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: exitDemo,
							children: "Exit demo"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "shrink-0 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/discover",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sm:hidden",
									children: "Discover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Discover an object"
								})]
							})
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex gap-1 overflow-x-auto px-4 pb-2 md:hidden",
			children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: n.to,
				className: "shrink-0 rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors active:scale-95",
				activeProps: { className: "bg-secondary text-foreground" },
				children: n.label
			}, n.to))
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t bg-sage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm text-muted-foreground",
						children: "Sort it right. Give it a second life."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-xs font-semibold text-foreground",
						children: guideLabel()
					}),
					isGuidePending() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Local guide not loaded yet — national rules are shown instead."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-md text-xs text-muted-foreground",
						children: [
							"SahiSort's AI can be wrong. Disposal guidance comes from ",
							GUIDE_META.authority,
							" rules once supplied, and from India's national waste rules until then. It does not cover collection schedules or facilities. Always follow local instructions."
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid content-start gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow text-muted-foreground",
						children: "Product"
					}), NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						className: "hover:text-primary",
						children: n.label
					}, n.to))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid content-start gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow text-muted-foreground",
							children: "SahiSort"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "hover:text-primary",
							children: "About"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guide",
							className: "hover:text-primary",
							children: "How evidence works"
						})
					]
				})
			]
		})
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function useReveal() {
	const { pathname } = useLocation();
	(0, import_react.useEffect)(() => {
		const els = Array.from(document.querySelectorAll("main section, main article, main [data-reveal]"));
		const io = new IntersectionObserver((entries) => entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("is-visible");
				io.unobserve(e.target);
			}
		}), {
			threshold: .08,
			rootMargin: "0px 0px -40px 0px"
		});
		els.forEach((el) => {
			el.classList.add("reveal");
			io.observe(el);
		});
		return () => io.disconnect();
	}, [pathname]);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-8xl text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "This page has no next chapter"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try again or head home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border px-5 py-2 text-sm",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SahiSort | Sort it right. Give it a second life." },
			{
				name: "description",
				content: "AI-powered object intelligence, responsible disposal and creative reuse."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { fallback: null }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative min-h-[70vh] overflow-x-clip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })
		]
	});
}
var $$splitComponentImporter$6 = () => import("./routes-DJAJZ-Fa.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "SahiSort | Sort it right. Give it a second life." },
		{
			name: "description",
			content: "Discover what everyday objects are made of, where they belong, and what they could become next."
		},
		{
			property: "og:title",
			content: "SahiSort | Sort it right. Give it a second life."
		},
		{
			property: "og:description",
			content: "AI object intelligence, evidence-backed disposal and creative reuse projects."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./about-DJVcMUs8.mjs");
var Route$5 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About | SahiSort" },
		{
			name: "description",
			content: "Why SahiSort exists, how it uses AI, and what it can't do."
		},
		{
			property: "og:title",
			content: "About | SahiSort"
		},
		{
			property: "og:description",
			content: "Everyday objects have possibilities beyond their immediate use."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./collection-CC7QqE-m.mjs");
var Route$4 = createFileRoute("/collection")({
	head: () => ({ meta: [
		{ title: "Collection | SahiSort" },
		{
			name: "description",
			content: "Your saved discoveries and reuse projects."
		},
		{
			property: "og:title",
			content: "Collection | SahiSort"
		},
		{
			property: "og:description",
			content: "A curated archive of your discoveries and projects."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./discover-BGfwrR0p.mjs");
var Route$3 = createFileRoute("/discover")({
	head: () => ({ meta: [
		{ title: "Discover an object | SahiSort" },
		{
			name: "description",
			content: "Upload a photo or describe an object. SahiSort's AI identifies it and its likely materials."
		},
		{
			property: "og:title",
			content: "Discover an object | SahiSort"
		},
		{
			property: "og:description",
			content: "Multimodal AI object identification with honest uncertainty."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./guide-BEdfArqP.mjs");
var Route$2 = createFileRoute("/guide")({
	head: () => ({ meta: [
		{ title: "The Guide | SahiSort" },
		{
			name: "description",
			content: "The waste-management guide SahiSort uses as evidence, and how recommendations are verified."
		},
		{
			property: "og:title",
			content: "The Guide | SahiSort"
		},
		{
			property: "og:description",
			content: "Transparent sources behind every SahiSort disposal recommendation."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./journey-DZNBLgLo.mjs");
var Route$1 = createFileRoute("/journey")({
	head: () => ({ meta: [
		{ title: "Journey | SahiSort" },
		{
			name: "description",
			content: "Your complete sustainability journey, tracking all your discoveries, answered questions, corrections, and confirmed actions."
		},
		{
			property: "og:title",
			content: "Journey | SahiSort"
		},
		{
			property: "og:description",
			content: "Real activity: discoveries, inputs, confirmed disposals and completed projects."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./recreate-B4ZCt24B.mjs");
var Route = createFileRoute("/recreate")({
	head: () => ({ meta: [
		{ title: "RE:CREATE studio | SahiSort" },
		{
			name: "description",
			content: "Turn identified objects into practical, AI-drafted reuse projects tuned to your time and tools."
		},
		{
			property: "og:title",
			content: "RE:CREATE studio | SahiSort"
		},
		{
			property: "og:description",
			content: "Creative reuse projects for everyday objects."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AboutRoute: Route$5.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$7
	}),
	CollectionRoute: Route$4.update({
		id: "/collection",
		path: "/collection",
		getParentRoute: () => Route$7
	}),
	DiscoverRoute: Route$3.update({
		id: "/discover",
		path: "/discover",
		getParentRoute: () => Route$7
	}),
	GuideRoute: Route$2.update({
		id: "/guide",
		path: "/guide",
		getParentRoute: () => Route$7
	}),
	JourneyRoute: Route$1.update({
		id: "/journey",
		path: "/journey",
		getParentRoute: () => Route$7
	}),
	RecreateRoute: Route.update({
		id: "/recreate",
		path: "/recreate",
		getParentRoute: () => Route$7
	}),
	DiscoveriesIdRoute: Route$8.update({
		id: "/discoveries/$id",
		path: "/discoveries/$id",
		getParentRoute: () => Route$7
	}),
	ProjectsIdRoute: Route$9.update({
		id: "/projects/$id",
		path: "/projects/$id",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
