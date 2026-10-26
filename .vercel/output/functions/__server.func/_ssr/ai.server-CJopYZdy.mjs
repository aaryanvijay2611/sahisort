import { t as google } from "../_libs/@ai-sdk/google+[...].mjs";
import { n as output_exports, t as generateText } from "../_libs/ai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.server-CJopYZdy.js
var PRIMARY_MODEL = process.env["GEMINI_MODEL"] || "gemini-3.5-flash-lite";
var FALLBACK_MODELS = ["gemini-flash-lite-latest", "gemini-3.5-flash"];
var AiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.name = "AiError";
		this.status = status;
	}
};
/** Runs a fast structured Gemini request server-side and returns the parsed object. */
async function runStructured(schema, system, messages) {
	if (!process.env["GOOGLE_GENERATIVE_AI_API_KEY"]) throw new AiError("Gemini API key is not configured.", 500);
	const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS.filter((m) => m !== PRIMARY_MODEL)];
	let lastError;
	for (const modelName of modelsToTry) {
		const start = Date.now();
		console.log(`[Gemini] Requesting "${modelName}"...`);
		try {
			const result = await generateText({
				model: google(modelName),
				system,
				messages,
				output: output_exports.object({ schema }),
				maxRetries: 1
			});
			console.log(`[Gemini] Success with "${modelName}" in ${Date.now() - start}ms`);
			return result.output;
		} catch (error) {
			const duration = Date.now() - start;
			console.warn(`[Gemini] Model "${modelName}" failed after ${duration}ms, trying next fallback...`);
			lastError = error;
		}
	}
	const err = lastError;
	const status = err?.statusCode ?? err?.status ?? 500;
	if (status === 429) throw new AiError("Gemini rate limit reached. Please try again shortly.", 429);
	if (status === 401 || status === 403) throw new AiError("Gemini API authentication failed. Check your API key and access.", status);
	throw new AiError(err?.message || "Gemini couldn't complete this request. Please try again.", status);
}
//#endregion
export { runStructured };
