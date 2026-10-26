import { t as hero_still_life_default } from "./hero-still-life-DgQAH9AH.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { E as ArrowRight, T as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as StatusBadge } from "./status-badge-IQSR0t-o.mjs";
import { t as recreate_workshop_default } from "./recreate-workshop-DRqZp_b9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DJAJZ-Fa.js
var import_jsx_runtime = require_jsx_runtime();
var problem_flatlay_default = "/assets/problem-flatlay-CjC2aYz1.jpg";
var evidence_macro_default = "/assets/evidence-macro-OceCcxUm.jpg";
var PUZZLES = [
	{
		n: "01",
		t: "The oat-milk carton",
		d: "Paper on the outside. Plastic and aluminium layered within."
	},
	{
		n: "02",
		t: "Four AA batteries",
		d: "Small and ordinary, but never meant for the household bin."
	},
	{
		n: "03",
		t: "The padded envelope",
		d: "Kraft paper bonded to bubble film. Which stream wins?"
	},
	{
		n: "04",
		t: "A greasy pizza box",
		d: "Cardboard, yes. Clean enough to recycle? Depends."
	},
	{
		n: "05",
		t: "A broken bulb",
		d: "Is it an LED, an incandescent, or a mercury CFL?"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-12 lg:grid-cols-12 lg:pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-6 lg:pt-8 animate-rise",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow text-primary",
						children: "Object intelligence · Disposal · Reuse"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-6 font-display text-hero",
						children: [
							"Sort it right.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "text-primary",
								children: "Give it a second life."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 max-w-md text-lg text-muted-foreground",
						children: "Discover what your everyday objects are made of, where they belong, and what they could become next."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "h-12 rounded-full px-7 text-base",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/discover",
								children: ["Discover an Object ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/recreate",
							className: "group inline-flex items-center gap-1 px-3 text-base font-medium",
							children: [
								"Explore RE:CREATE",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "lg:col-span-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_still_life_default,
					alt: "Glass jar, crushed can, cardboard box, coffee cup, wooden spoon and charger in daylight",
					width: 1536,
					height: 1152,
					className: "aspect-[4/3] w-full rounded-xl object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "mt-3 flex justify-between gap-4 border-t pt-3 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fig. 1. A Tuesday's worth of leftovers from one kitchen." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Six objects, five different answers."
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-sage py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow text-primary",
							children: "The everyday problem"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-title",
							children: "\"Which bin?\" is rarely a simple question."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-muted-foreground",
							children: "Mixed materials, hidden components and contamination turn small decisions into guesswork."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: problem_flatlay_default,
						alt: "Carton, batteries, padded envelope, pizza box, toothbrush, broken bulb and takeaway box",
						loading: "lazy",
						width: 1536,
						height: 1024,
						className: "w-full rounded-3xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2",
						children: PUZZLES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 border-t border-foreground/10 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl text-primary",
								children: p.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: p.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: p.d
							})] })]
						}, p.n))
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-6 py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-title",
							children: "How it works, in plain terms."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-muted-foreground",
							children: "You show SahiSort something you're about to throw away. It tells you what it thinks the object is made of, and is honest about which parts it actually saw and which parts it is guessing. If something matters, like whether a bulb is a CFL, it asks you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "Then it looks up the relevant rules, shows you the passage it relied on, and suggests where the object should go. If the object is safe to reuse, you can ask for project ideas that fit the time and tools you actually have."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/discover",
							className: "mt-6 inline-block text-sm font-medium text-primary underline underline-offset-4",
							children: "Start a discovery"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "divide-y border-y lg:col-span-6 lg:col-start-7",
					children: [
						["Show it", "Take a photo, type a description, or do both. A label or a resin code helps a lot."],
						["Check it", "Read what was observed and what was inferred. Correct anything that's wrong."],
						["Sort it", "Get a disposal route tied to a specific passage from the guide, not a hunch."],
						["Reuse it", "If it's safe, get a few small projects with steps, materials and safety notes."]
					].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-semibold",
							children: t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-muted-foreground",
							children: d
						})]
					}, t))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y bg-card py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: "Why we made this"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 text-lg leading-relaxed text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Most of us want to do the right thing with our rubbish. The trouble is that the rules are written for municipalities, not for someone standing over a bin with a juice carton in one hand." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Search results disagree, packaging symbols are vague, and a lot of advice online is written for other countries. So people guess, and a single battery in the wrong bag can start a fire in a collection truck." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SahiSort won't fix the system. It just tries to make one small decision a little clearer, and it tells you when it doesn't know." })
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: evidence_macro_default,
				alt: "Recycling resin code on a container beside a highlighted document",
				loading: "lazy",
				width: 1280,
				height: 1280,
				className: "aspect-square w-full rounded-[2rem] object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow text-primary",
					children: "Intelligence with evidence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-title",
					children: "Recognising an object isn't the same as knowing where it goes."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-muted-foreground",
					children: "SahiSort retrieves passages from its configured waste guide, checks that they really support the recommendation, and shows you the source. When the evidence is thin, it says so."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-3",
					children: [
						"verified",
						"conditional",
						"insufficient"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s }) }, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/guide",
					className: "mt-8 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline",
					children: "Read the Guide →"
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative mt-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: recreate_workshop_default,
				alt: "Glass jars turned into planters and pencil holders, tin lantern, twine and tools",
				loading: "lazy",
				width: 1536,
				height: 1024,
				className: "h-[70vh] min-h-[28rem] w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-lg rounded-3xl bg-card/95 p-8 shadow-lift backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow text-primary",
							children: "RE:CREATE studio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl",
							children: "A jar becomes a planter. A tin becomes light."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "Tell SahiSort how much time and which tools you have. It drafts practical projects with steps and safety notes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-6 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/recreate",
								children: "Open the studio"
							})
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-7xl gap-6 px-6 py-24 md:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-lime p-10 md:col-span-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "A collection that grows with you"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-display text-4xl",
						children: "Every discovery, saved and revisitable."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm",
						children: "Come back to a discovery and pick up where you left off, with answers, evidence and projects intact."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/collection",
						className: "mt-6 inline-block text-sm font-semibold underline underline-offset-4",
						children: "View your collection"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-apricot/60 p-10 md:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "Your journey"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-display text-4xl",
						children: "Real actions only."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						children: "Journey counts what you confirm: disposals followed, projects completed. No invented carbon numbers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/journey",
						className: "mt-6 inline-block text-sm font-semibold underline underline-offset-4",
						children: "See your journey"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-5xl px-6 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-hero",
				children: ["Every object has a ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
					className: "text-primary",
					children: "next chapter."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "lg",
				className: "mt-10 h-12 rounded-full px-8 text-base",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/discover",
					children: ["Discover an Object ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				})
			})]
		})
	] });
}
//#endregion
export { Home as component };
