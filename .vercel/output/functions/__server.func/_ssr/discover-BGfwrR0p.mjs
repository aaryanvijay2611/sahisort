import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as analyseObject, u as useServerFn } from "./sahisort.functions-BxD3aRsb.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as ImagePlus, l as ScanSearch, p as LoaderCircle, t as X, u as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as RequireAuth } from "./auth-card-B0GPvUkd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discover-BGfwrR0p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
/** Downscale an image file to a JPEG data URL (max edge px) for upload. */
async function fileToDataUrl(file, max = 1024) {
	const bmp = await createImageBitmap(file);
	const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(bmp.width * scale);
	canvas.height = Math.round(bmp.height * scale);
	canvas.getContext("2d").drawImage(bmp, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL("image/jpeg", .85);
}
var ACCEPTED = [
	"image/jpeg",
	"image/png",
	"image/webp"
];
var DEMO_ITEMS = [
	{
		id: "plastic-bottle",
		label: "Plastic bottle",
		description: "Empty 1 litre PET water bottle with its cap, rinsed"
	},
	{
		id: "newspaper",
		label: "Newspaper",
		description: "Stack of old newspapers, dry and clean"
	},
	{
		id: "cardboard-box",
		label: "Cardboard box",
		description: "Flattened cardboard delivery box with packing tape still on it"
	},
	{
		id: "greasy-pizza-box",
		label: "Greasy pizza box",
		description: "Pizza box with a greasy, cheese-stained base and a clean lid"
	},
	{
		id: "coffee-cup",
		label: "Takeaway coffee cup",
		description: "Takeaway coffee cup with a plastic lid and a little coffee left inside"
	},
	{
		id: "tetra-pak",
		label: "Tetra Pak carton",
		description: "Empty Tetra Pak juice carton with a plastic straw attached"
	},
	{
		id: "chips-wrapper",
		label: "Chips wrapper",
		description: "Empty chips packet, shiny multilayer foil wrapper"
	},
	{
		id: "banana-peel",
		label: "Banana peel",
		description: "One banana peel from today's breakfast"
	},
	{
		id: "cooked-leftovers",
		label: "Cooked leftovers",
		description: "Half-eaten bowl of cooked rice and dal"
	},
	{
		id: "used-battery",
		label: "Used batteries",
		description: "Two used AA batteries taken out of a TV remote"
	},
	{
		id: "cfl-bulb",
		label: "CFL bulb",
		description: "Burnt-out compact fluorescent (CFL) bulb, still intact"
	},
	{
		id: "phone-charger",
		label: "Phone charger",
		description: "Old phone charger with a frayed cable and a two-pin plug"
	},
	{
		id: "old-phone",
		label: "Old phone",
		description: "Broken Android smartphone with a cracked screen"
	},
	{
		id: "sanitary-pad",
		label: "Sanitary pad",
		description: "Used sanitary pad wrapped in its original pouch"
	},
	{
		id: "medicine-strip",
		label: "Medicine strip",
		description: "Expired medicine blister strip with a few tablets still inside"
	},
	{
		id: "aerosol-can",
		label: "Aerosol can",
		description: "Empty deodorant aerosol spray can"
	},
	{
		id: "ceramic-plate",
		label: "Broken ceramic plate",
		description: "Broken ceramic dinner plate with sharp edges"
	},
	{
		id: "aluminium-foil",
		label: "Aluminium foil",
		description: "Crinkled aluminium foil used to wrap rotis"
	}
];
function Discover() {
	const [image, setImage] = (0, import_react.useState)(null);
	const [desc, setDesc] = (0, import_react.useState)("");
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const input = (0, import_react.useRef)(null);
	const analyse = useServerFn(analyseObject);
	const navigate = useNavigate();
	async function take(file) {
		if (!file) return;
		if (!ACCEPTED.includes(file.type)) {
			toast.error("Please use a JPG, PNG or WEBP image.");
			return;
		}
		if (file.size > 15e6) {
			toast.error("That image is over 15 MB.");
			return;
		}
		try {
			setImage(await fileToDataUrl(file));
		} catch {
			toast.error("Couldn't read that image.");
		}
	}
	async function submit() {
		if (!image && desc.trim().length < 3) return setErr("Add a photo or a short description to begin.");
		setErr(null);
		setBusy(true);
		try {
			const r = await analyse({ data: {
				image,
				description: desc.trim() || null
			} });
			navigate({
				to: "/discoveries/$id",
				params: { id: r.id }
			});
		} catch (e) {
			setErr(e instanceof Error ? e.message : "Something went wrong.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-6 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-eyebrow text-primary",
				children: "Discover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-title",
				children: "What are we looking at?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted-foreground",
				children: "A photo, a description, or both. Labels and close-ups help SahiSort tell materials apart."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onDragOver: (e) => {
						e.preventDefault();
						setDrag(true);
					},
					onDragLeave: () => setDrag(false),
					onDrop: (e) => {
						e.preventDefault();
						setDrag(false);
						take(e.dataTransfer.files[0]);
					},
					className: cn("relative flex min-h-[24rem] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed bg-card transition-colors", drag && "border-primary bg-sage"),
					children: [image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: image,
							alt: "Your upload",
							className: "absolute inset-0 h-full w-full object-contain p-4"
						}),
						busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 h-0.5 bg-primary shadow-lift animate-scan" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute right-3 top-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => input.current?.click(),
								disabled: busy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), " Replace"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setImage(null),
								disabled: busy,
								"aria-label": "Remove image",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => input.current?.click(),
						className: "flex flex-col items-center gap-3 p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-16 items-center justify-center rounded-full bg-sage text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Drop a photo or click to choose"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "JPG, PNG or WEBP · up to 15 MB"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: input,
						type: "file",
						accept: ACCEPTED.join(","),
						className: "hidden",
						onChange: (e) => take(e.target.files?.[0])
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col rounded-3xl bg-sage p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "desc",
							className: "text-sm font-semibold",
							children: [
								"Describe it",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-muted-foreground",
									children: "(optional with a photo)"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "desc",
							value: desc,
							onChange: (e) => setDesc(e.target.value),
							maxLength: 1e3,
							rows: 6,
							placeholder: "e.g. a yoghurt tub with a foil lid, a little dirty",
							className: "mt-2 bg-card"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Or try a common household item (",
									DEMO_ITEMS.length,
									"):"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex max-h-44 flex-wrap gap-2 overflow-y-auto pr-1",
								children: DEMO_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									title: item.description,
									onClick: () => setDesc(item.description),
									className: cn("rounded-full border bg-card px-3 py-1 text-xs hover:border-primary", desc === item.description && "border-primary bg-primary text-primary-foreground"),
									children: item.label
								}, item.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto pt-8",
							children: [
								err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "mb-3 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive",
									children: err
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "h-12 w-full rounded-full text-base",
									onClick: submit,
									disabled: busy,
									children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Looking closely…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanSearch, {}), " Identify this object"] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-center text-xs text-muted-foreground",
									children: "AI identification can be wrong, so you can correct it on the next screen."
								})
							]
						})
					]
				})]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, {
	title: "Sign in to start a discovery",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Discover, {})
});
//#endregion
export { SplitComponent as component };
