//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-D-BjRgEk.js
var manifest = {
	"055b45760a661e4748b0cf281c0ca01b883a26f0a9fde11a474fc8a553773a90": {
		functionName: "getJourneyLogs_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	},
	"2ad2477f3848a6b9b28c2ecfc8cac5026d626f44eb7e2be900ea9055eba46354": {
		functionName: "getDiscovery_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	},
	"450a36aebb2a97ce88b2ee3ac2683470044ec395c3c78fcd59cccd8a400adb80": {
		functionName: "updateFlags_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	},
	"678d70d4edf1ce0b55461cd99cd57ba9098627c25916613d49e484acba3eb295": {
		functionName: "analyseObject_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	},
	"6d1073e949e285453dc5a773eafe9f37d310f9307b0b6ec38415b277714026b8": {
		functionName: "refineDiscovery_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	},
	"72e4e77bef6dc7ef89f220afd01111e3c85f6e95a1da51ba8258b31487319cd9": {
		functionName: "computeDisposal_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	},
	"7f8b0f98c69e688c687b21ac6e58a42c8fca2b49dbb851e154db22b5d5d744e7": {
		functionName: "generateProjects_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	},
	"a0506029861af1574d6f950c71ee6e260ac17de7e7358ddb91f5edda8a7b3e68": {
		functionName: "getProject_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	},
	"c9007a646e0bad97c60a7de2d7b7c265679530a1f37eb916f9df5d293b9cf739": {
		functionName: "listMine_createServerFn_handler",
		importer: () => import("./_ssr/sahisort.functions-11ym-mot.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
