import { Ct as array, Ft as string, Mt as number, Nt as object, bt as _enum, wt as boolean } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { d as getRequest } from "./createServerFn-BhqelEmK.mjs";
import { t as createMiddleware } from "./createMiddleware-B_4t7rW1.mjs";
import { i as DEMO_USER_ID, n as DEMO_MODE } from "./demo-RRegnQR7.mjs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
//#region node_modules/.nitro/vite/services/ssr/assets/schemas-Bx9mjOqh.js
var adminApp;
function getAdminApp() {
	if (adminApp) return adminApp;
	if (getApps().length > 0) {
		adminApp = getApps()[0];
		return adminApp;
	}
	const projectId = process.env["FIREBASE_PROJECT_ID"] || process.env["VITE_FIREBASE_PROJECT_ID"] || process.env["GCLOUD_PROJECT"] || "sahisort-app";
	const clientEmail = process.env["FIREBASE_CLIENT_EMAIL"];
	const privateKey = process.env["FIREBASE_PRIVATE_KEY"]?.replace(/\\n/g, "\n");
	if (clientEmail && privateKey) adminApp = initializeApp({
		credential: cert({
			projectId,
			clientEmail,
			privateKey
		}),
		projectId
	});
	else adminApp = initializeApp({ projectId });
	return adminApp;
}
function getAdminAuth() {
	return getAuth(getAdminApp());
}
function getAdminDb() {
	return getFirestore(getAdminApp());
}
var requireFirebaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const request = getRequest();
	if (!request?.headers) throw new Error("Unauthorized: No request headers available");
	const authHeader = request.headers.get("authorization");
	let userId = "";
	let email = null;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		if (!DEMO_MODE) throw new Error("Unauthorized: Please sign in to access your discoveries and journey.");
		userId = DEMO_USER_ID;
	} else {
		const token = authHeader.replace("Bearer ", "").trim();
		if (!token) throw new Error("Unauthorized: Empty authorization token provided.");
		try {
			const decoded = await getAdminAuth().verifyIdToken(token);
			userId = decoded.uid;
			email = decoded.email || null;
		} catch (err) {
			try {
				const parts = token.split(".");
				if (parts.length === 3) {
					const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
					if (payload.sub || payload.user_id) {
						userId = payload.sub || payload.user_id;
						email = payload.email || null;
					}
				}
			} catch {}
			if (!userId) {
				const message = err instanceof Error ? err.message : String(err);
				console.error("[Firebase Auth] Token validation failed:", message);
				throw new Error("Unauthorized: Invalid session. Please sign in again.");
			}
		}
	}
	return next({ context: {
		userId,
		email
	} });
});
var analysisSchema = object({
	object_name: string(),
	summary: string(),
	identifiable: boolean(),
	observations: array(string()),
	materials: array(object({
		component: string(),
		material: string(),
		basis: _enum([
			"observed",
			"inferred",
			"user_confirmed"
		]),
		certainty: _enum([
			"clear",
			"likely",
			"unsure"
		])
	})),
	mixed_materials: boolean(),
	uncertainties: array(string()),
	questions: array(object({
		id: string(),
		question: string(),
		why: string(),
		options: array(string())
	})),
	reuse_safe: boolean(),
	reuse_safety_note: string(),
	identification_reason: string().nullable().optional(),
	next_step: string().nullable().optional()
});
var disposalAiSchema = object({
	status: _enum([
		"verified",
		"conditional",
		"insufficient"
	]),
	category: string(),
	explanation: string(),
	preparation: array(string()),
	conditions: array(string()),
	exceptions: array(string()),
	limitations: array(string()),
	citations: array(object({
		passage_id: string(),
		relevance: string()
	})),
	missing_information: array(string()),
	general_advice: string()
});
var projectsSchema = object({ projects: array(object({
	title: string(),
	pitch: string(),
	use: string(),
	difficulty: _enum([
		"easy",
		"medium",
		"involved"
	]),
	duration_minutes: number(),
	materials: array(object({
		item: string(),
		have_it: boolean()
	})),
	tools: array(string()),
	steps: array(object({
		title: string(),
		detail: string()
	})),
	safety_notes: array(string()),
	why_it_fits: string()
})) });
var recreatePrefsSchema = object({
	time: _enum([
		"15 minutes",
		"1 hour",
		"an afternoon"
	]),
	difficulty: _enum([
		"easy",
		"medium",
		"involved"
	]),
	tools: string().max(300),
	intent: string().max(300),
	buy_materials: boolean()
});
//#endregion
export { recreatePrefsSchema as a, projectsSchema as i, disposalAiSchema as n, requireFirebaseAuth as o, getAdminDb as r, analysisSchema as t };
