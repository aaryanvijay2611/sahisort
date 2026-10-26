import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { G as isRedirect, S as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as array, Ft as string, Mt as number, Nt as object, Pt as record, bt as _enum, wt as boolean } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-D-BjRgEk.mjs";
import { a as recreatePrefsSchema, o as requireFirebaseAuth } from "./schemas-Bx9mjOqh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sahisort.functions-BxD3aRsb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var analyseObject = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({
	description: string().max(1e3).nullable(),
	image: string().startsWith("data:image/").max(4e6).nullable()
}).refine((v) => v.image || v.description && v.description.trim().length > 2, "Add a photo or a description.").parse(d)).handler(createSsrRpc("678d70d4edf1ce0b55461cd99cd57ba9098627c25916613d49e484acba3eb295"));
/** Apply answers or a correction, re-run analysis, and mark dependent results stale. */
var refineDiscovery = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({
	id: string().min(1),
	answers: record(string(), string().max(300)),
	correction: string().max(500).nullable()
}).parse(d)).handler(createSsrRpc("6d1073e949e285453dc5a773eafe9f37d310f9307b0b6ec38415b277714026b8"));
var computeDisposal = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({ id: string().min(1) }).parse(d)).handler(createSsrRpc("72e4e77bef6dc7ef89f220afd01111e3c85f6e95a1da51ba8258b31487319cd9"));
var generateProjects = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({
	id: string().min(1),
	prefs: recreatePrefsSchema
}).parse(d)).handler(createSsrRpc("7f8b0f98c69e688c687b21ac6e58a42c8fca2b49dbb851e154db22b5d5d744e7"));
var getDiscovery = createServerFn({ method: "GET" }).middleware([requireFirebaseAuth]).validator((d) => object({ id: string().min(1) }).parse(d)).handler(createSsrRpc("2ad2477f3848a6b9b28c2ecfc8cac5026d626f44eb7e2be900ea9055eba46354"));
var getProject = createServerFn({ method: "GET" }).middleware([requireFirebaseAuth]).validator((d) => object({ id: string().min(1) }).parse(d)).handler(createSsrRpc("a0506029861af1574d6f950c71ee6e260ac17de7e7358ddb91f5edda8a7b3e68"));
var listMine = createServerFn({ method: "GET" }).middleware([requireFirebaseAuth]).handler(createSsrRpc("c9007a646e0bad97c60a7de2d7b7c265679530a1f37eb916f9df5d293b9cf739"));
var getJourneyLogs = createServerFn({ method: "GET" }).middleware([requireFirebaseAuth]).handler(createSsrRpc("055b45760a661e4748b0cf281c0ca01b883a26f0a9fde11a474fc8a553773a90"));
var updateFlags = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({
	table: _enum(["discoveries", "projects"]),
	id: string().min(1),
	saved: boolean().optional(),
	confirmDisposal: boolean().optional(),
	completed: boolean().optional(),
	completedSteps: array(number()).optional()
}).parse(d)).handler(createSsrRpc("450a36aebb2a97ce88b2ee3ac2683470044ec395c3c78fcd59cccd8a400adb80"));
//#endregion
export { getJourneyLogs as a, refineDiscovery as c, getDiscovery as i, updateFlags as l, computeDisposal as n, getProject as o, generateProjects as r, listMine as s, analyseObject as t, useServerFn as u };
