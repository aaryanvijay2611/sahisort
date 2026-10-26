import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
import { t as auth } from "./client-dBu0b8No.mjs";
import { t as createCsrfMiddleware } from "./createCsrfMiddleware-jzif2P7h.mjs";
import { t as renderErrorPage } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-7edhuTR1.js
function dedupeSerializationAdapters(deduped, serializationAdapters) {
	for (let i = 0, len = serializationAdapters.length; i < len; i++) {
		const current = serializationAdapters[i];
		if (!deduped.has(current)) {
			deduped.add(current);
			if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
		}
	}
}
var createStart = (getOptions) => {
	return {
		getOptions: async () => {
			const options = await getOptions();
			if (options.serializationAdapters) {
				const deduped = /* @__PURE__ */ new Set();
				dedupeSerializationAdapters(deduped, options.serializationAdapters);
				options.serializationAdapters = Array.from(deduped);
			}
			return options;
		},
		createMiddleware
	};
};
var attachFirebaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
	let token;
	if (auth.currentUser) try {
		token = await auth.currentUser.getIdToken();
	} catch (err) {
		console.warn("[Firebase] Could not retrieve ID token:", err);
	}
	return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
});
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var csrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
var startInstance = createStart(() => ({
	functionMiddleware: [attachFirebaseAuth],
	requestMiddleware: [errorMiddleware, csrfMiddleware]
}));
//#endregion
export { startInstance };
