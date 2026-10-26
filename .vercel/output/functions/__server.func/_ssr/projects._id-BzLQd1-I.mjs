import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._id-BzLQd1-I.js
var $$splitComponentImporter = () => import("./projects._id-D7KaH1n6.mjs");
var Route = createFileRoute("/projects/$id")({
	head: () => ({ meta: [
		{ title: "Reuse project | SahiSort RE:CREATE" },
		{
			name: "description",
			content: "Materials, steps, difficulty and safety notes for a reuse project."
		},
		{
			property: "og:title",
			content: "Reuse project | SahiSort RE:CREATE"
		},
		{
			property: "og:description",
			content: "A practical AI-drafted reuse project."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
