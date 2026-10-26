import { Ct as array, Ft as string, Mt as number, Nt as object, Pt as record, bt as _enum, wt as boolean } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-BhqelEmK.mjs";
import { n as DEMO_MODE } from "./demo-RRegnQR7.mjs";
import { a as recreatePrefsSchema, i as projectsSchema, n as disposalAiSchema, o as requireFirebaseAuth, r as getAdminDb, t as analysisSchema } from "./schemas-Bx9mjOqh.mjs";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/sahisort.functions-11ym-mot.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var STORE_DIR = path.resolve(process.cwd(), ".data");
var STORE_PATH = path.join(STORE_DIR, "sahisort_store.json");
function readLocalStore() {
	try {
		if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true });
		if (fs.existsSync(STORE_PATH)) {
			const raw = fs.readFileSync(STORE_PATH, "utf8");
			return JSON.parse(raw);
		}
	} catch (err) {
		console.warn("[Store] Error reading local store:", err);
	}
	return {
		discoveries: {},
		projects: {},
		journeys: {}
	};
}
function writeLocalStore(store) {
	try {
		if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true });
		fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
	} catch (err) {
		console.error("[Store] Error writing local store:", err);
	}
}
function patchLocalDiscovery(id, patch) {
	const store = readLocalStore();
	const doc = store.discoveries[id];
	if (!doc) return;
	Object.assign(doc, patch);
	writeLocalStore(store);
}
function patchLocalProject(id, patch) {
	const store = readLocalStore();
	const doc = store.projects[id];
	if (!doc) return;
	Object.assign(doc, patch);
	writeLocalStore(store);
}
function hasCloudFirestore() {
	if (DEMO_MODE) return false;
	return !!(process.env["FIREBASE_CLIENT_EMAIL"] && process.env["FIREBASE_PRIVATE_KEY"] || process.env["GOOGLE_APPLICATION_CREDENTIALS"] || process.env["FIRESTORE_EMULATOR_HOST"]);
}
var dbService = {
	async addJourneyLog(entry) {
		const id = crypto.randomUUID();
		const created_at = (/* @__PURE__ */ new Date()).toISOString();
		const log = {
			...entry,
			id,
			created_at
		};
		if (hasCloudFirestore()) try {
			await getAdminDb().collection("journeys").doc(id).set(log);
			return log;
		} catch (e) {
			console.warn("[Firestore] Failed to write journey log, falling back to local store:", e);
		}
		const store = readLocalStore();
		store.journeys[id] = log;
		writeLocalStore(store);
		return log;
	},
	async listJourneyLogs(userId) {
		if (hasCloudFirestore()) try {
			return (await getAdminDb().collection("journeys").where("user_id", "==", userId).get()).docs.map((d) => d.data()).sort((a, b) => b.created_at.localeCompare(a.created_at));
		} catch (e) {
			console.warn("[Firestore] Failed to read journey logs, falling back to local store:", e);
		}
		const store = readLocalStore();
		return Object.values(store.journeys).filter((j) => j.user_id === userId).sort((a, b) => b.created_at.localeCompare(a.created_at));
	},
	async createDiscovery(data) {
		const id = crypto.randomUUID();
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const discovery = {
			id,
			user_id: data.userId,
			object_name: data.objectName,
			description: data.description,
			image_data: data.imageData,
			analysis: data.analysis,
			answers: {},
			disposal: null,
			disposal_stale: false,
			disposal_confirmed_at: null,
			saved: false,
			created_at: now,
			updated_at: now
		};
		if (hasCloudFirestore()) try {
			await getAdminDb().collection("discoveries").doc(id).set(discovery);
		} catch (e) {
			console.warn("[Firestore] createDiscovery fallback:", e);
			const store = readLocalStore();
			store.discoveries[id] = discovery;
			writeLocalStore(store);
		}
		else {
			const store = readLocalStore();
			store.discoveries[id] = discovery;
			writeLocalStore(store);
		}
		await this.addJourneyLog({
			user_id: data.userId,
			discovery_id: id,
			kind: "discovered",
			title: `Discovered "${data.objectName}"`,
			detail: data.description || "Uploaded photo for material intelligence"
		});
		return id;
	},
	async getDiscovery(id, userId) {
		let discovery = null;
		let projects = [];
		if (hasCloudFirestore()) try {
			const firestore = getAdminDb();
			const docSnap = await firestore.collection("discoveries").doc(id).get();
			if (docSnap.exists) discovery = docSnap.data();
			projects = (await firestore.collection("projects").where("discovery_id", "==", id).get()).docs.map((d) => d.data());
		} catch (e) {
			console.warn("[Firestore] getDiscovery fallback:", e);
		}
		if (!discovery) {
			const store = readLocalStore();
			discovery = store.discoveries[id] || null;
			projects = Object.values(store.projects).filter((p) => p.discovery_id === id);
		}
		if (!discovery) throw new Error("Discovery not found");
		projects.sort((a, b) => b.created_at.localeCompare(a.created_at));
		return {
			discovery,
			projects
		};
	},
	async refineDiscovery(data) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const patch = {
			analysis: data.analysis,
			object_name: data.objectName,
			answers: data.answers,
			disposal_stale: data.disposalStale,
			updated_at: now
		};
		if (hasCloudFirestore()) try {
			await getAdminDb().collection("discoveries").doc(data.id).update(patch);
		} catch (e) {
			console.warn("[Firestore] refineDiscovery fallback:", e);
			patchLocalDiscovery(data.id, patch);
		}
		else patchLocalDiscovery(data.id, patch);
		if (data.correction) await this.addJourneyLog({
			user_id: data.userId,
			discovery_id: data.id,
			kind: "corrected",
			title: `Corrected identification of "${data.objectName}"`,
			detail: `User correction: "${data.correction}"`
		});
		if (Object.keys(data.answers).length > 0 && !data.correction) await this.addJourneyLog({
			user_id: data.userId,
			discovery_id: data.id,
			kind: "answered",
			title: `Answered clarifying questions for "${data.objectName}"`,
			detail: Object.values(data.answers).join(" • ")
		});
	},
	async updateDisposal(data) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const patch = {
			disposal: data.disposal,
			disposal_stale: false,
			updated_at: now
		};
		if (hasCloudFirestore()) try {
			await getAdminDb().collection("discoveries").doc(data.id).update(patch);
		} catch (e) {
			console.warn("[Firestore] updateDisposal fallback:", e);
			patchLocalDiscovery(data.id, patch);
		}
		else patchLocalDiscovery(data.id, patch);
	},
	async createProjects(data) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const docs = data.projects.map((p) => ({
			id: crypto.randomUUID(),
			user_id: data.userId,
			discovery_id: data.discoveryId,
			title: p.title,
			data: p.data,
			completed_steps: [],
			completed_at: null,
			saved: false,
			created_at: now,
			updated_at: now
		}));
		if (hasCloudFirestore()) try {
			const firestore = getAdminDb();
			const batch = firestore.batch();
			for (const doc of docs) batch.set(firestore.collection("projects").doc(doc.id), doc);
			await batch.commit();
		} catch (e) {
			console.warn("[Firestore] createProjects fallback:", e);
			const store = readLocalStore();
			for (const doc of docs) store.projects[doc.id] = doc;
			writeLocalStore(store);
		}
		else {
			const store = readLocalStore();
			for (const doc of docs) store.projects[doc.id] = doc;
			writeLocalStore(store);
		}
		const prefsObj = data.prefs;
		await this.addJourneyLog({
			user_id: data.userId,
			discovery_id: data.discoveryId,
			kind: "projects_generated",
			title: `Drafted ${docs.length} reuse projects for "${data.objectName}"`,
			detail: `Time: ${prefsObj?.time || "Any"} • Difficulty: ${prefsObj?.difficulty || "Any"} • Tools: ${prefsObj?.tools || "Standard"}`
		});
		return docs.length;
	},
	async getProject(id) {
		let project = null;
		let discovery = null;
		if (hasCloudFirestore()) try {
			const firestore = getAdminDb();
			const pSnap = await firestore.collection("projects").doc(id).get();
			if (pSnap.exists) {
				project = pSnap.data();
				const dSnap = await firestore.collection("discoveries").doc(project.discovery_id).get();
				if (dSnap.exists) discovery = dSnap.data();
			}
		} catch (e) {
			console.warn("[Firestore] getProject fallback:", e);
		}
		if (!project) {
			const store = readLocalStore();
			project = store.projects[id] || null;
			if (project) discovery = store.discoveries[project.discovery_id] || null;
		}
		if (!project) throw new Error("Project not found");
		if (!discovery) return project;
		return {
			...project,
			discoveries: {
				id: discovery.id,
				object_name: discovery.object_name,
				image_data: discovery.image_data
			}
		};
	},
	async listMine(userId) {
		let discoveries = [];
		let projects = [];
		if (hasCloudFirestore()) try {
			const firestore = getAdminDb();
			const [dSnap, pSnap] = await Promise.all([firestore.collection("discoveries").where("user_id", "==", userId).get(), firestore.collection("projects").where("user_id", "==", userId).get()]);
			discoveries = dSnap.docs.map((d) => d.data());
			projects = pSnap.docs.map((p) => p.data());
		} catch (e) {
			console.warn("[Firestore] listMine fallback:", e);
		}
		if (discoveries.length === 0 && projects.length === 0) {
			const store = readLocalStore();
			discoveries = Object.values(store.discoveries).filter((d) => d.user_id === userId);
			projects = Object.values(store.projects).filter((p) => p.user_id === userId);
		}
		discoveries.sort((a, b) => b.created_at.localeCompare(a.created_at));
		projects.sort((a, b) => b.created_at.localeCompare(a.created_at));
		return {
			discoveries,
			projects
		};
	},
	async updateFlags(data) {
		const now = (/* @__PURE__ */ new Date()).toISOString();
		if (data.table === "discoveries") {
			const patch = { updated_at: now };
			if (data.saved !== void 0) patch.saved = data.saved;
			if (data.confirmDisposal !== void 0) patch.disposal_confirmed_at = data.confirmDisposal ? now : null;
			if (hasCloudFirestore()) try {
				await getAdminDb().collection("discoveries").doc(data.id).update(patch);
			} catch (e) {
				console.warn("[Firestore] updateFlags discoveries fallback:", e);
				patchLocalDiscovery(data.id, patch);
			}
			else patchLocalDiscovery(data.id, patch);
			if (data.confirmDisposal) {
				const objName = readLocalStore().discoveries[data.id]?.object_name || "item";
				await this.addJourneyLog({
					user_id: data.userId,
					discovery_id: data.id,
					kind: "disposal_confirmed",
					title: `Followed disposal guidance for "${objName}"`,
					detail: `Confirmed responsible sorting and disposal according to verified guidelines`
				});
			}
		} else {
			const patch = { updated_at: now };
			if (data.saved !== void 0) patch.saved = data.saved;
			if (data.completed !== void 0) patch.completed_at = data.completed ? now : null;
			if (data.completedSteps !== void 0) patch.completed_steps = data.completedSteps;
			if (hasCloudFirestore()) try {
				await getAdminDb().collection("projects").doc(data.id).update(patch);
			} catch (e) {
				console.warn("[Firestore] updateFlags projects fallback:", e);
				patchLocalProject(data.id, patch);
			}
			else patchLocalProject(data.id, patch);
			if (data.completed) {
				const title = readLocalStore().projects[data.id]?.title || "project";
				await this.addJourneyLog({
					user_id: data.userId,
					project_id: data.id,
					kind: "project_completed",
					title: `Completed RE:CREATE project "${title}"`,
					detail: `Successfully repurposed object into a new creation!`
				});
			}
		}
	}
};
var ANALYSE_SYSTEM = `You are SahiSort's object-intelligence engine. Identify an everyday object from a photo and/or description.
Rules:
- "observations" are only things visibly present or explicitly stated. Never state polymer types, alloys, or coatings as observed unless a label is visible.
- Materials: basis "observed" only when visible/label-confirmed; "inferred" for appearance-based guesses; "user_confirmed" when the user's answers or correction state it.
- Ask questions ONLY when the answer would materially change disposal or reuse (e.g. resin code, contamination, detachable parts, damage, batteries inside). Max 3. Give 2-4 short options each. Return [] when information is sufficient. Never re-ask answered questions.
- If the item is blurry, too dark, cropped, or otherwise not identifiable, set identifiable=false, set identification_reason to the specific problem (for example "the photo is too dark to see the material"), and set next_step to what the user should do (retake the photo in better light, take a closer photo of the label, or add a short description). Never guess in that case.
- When identifiable=true, still use identification_reason and next_step to note anything important, or return null for both.
- reuse_safe=false for items that are unsafe to repurpose (batteries, medicines, chemicals, broken glass with sharp edges, mercury bulbs, food-contact reuse of degraded plastics). Explain briefly.
- Use plain language. Do not give numeric confidence scores.`;
var DISPOSAL_SYSTEM = `You are SahiSort's evidence-assisted disposal reasoner.
You receive an object analysis and a set of GUIDE PASSAGES (with ids, and a scope of "local" or "national"). Base the recommendation ONLY on these passages.
- status "verified": passages clearly cover this material and conditions, and no open question changes the outcome.
- status "conditional": the outcome depends on an unresolved question or a condition (e.g. clean vs contaminated).
- status "insufficient": passages do not adequately cover the item.
- category MUST be exactly one of: "Dry Waste", "Wet Waste", "Domestic Hazardous", "E-Waste", "Sanitary". It must be the category of at least one cited passage; a recommendation whose category is not supported by its citations is downgraded.
- Cite passage ids only in the citations array — never write ids or brackets in prose fields. Never invent passages, rules, facilities, schedules, collection points, bin colours or fees.
- Passages with scope "local" are the Gurugram guide and take priority. Passages with scope "national" apply nationally; say so when you rely on one.
- preparation: only steps you can support from the cited passages. They are re-checked against the cited passages' own steps before display.
- general_advice: optional general (non-guide) tips, clearly general. Keep everything concise and plain.`;
var RECREATE_SYSTEM = `You are SahiSort's RE:CREATE studio. Generate 3 practical, genuinely useful reuse projects for the given object, adapted to the user's constraints.
- Respect available time, difficulty, tools, intended use and whether they will buy materials (if not, materials should mostly be common household items; mark have_it honestly).
- Steps must be concrete and ordered (4-8 steps). Include real safety notes (sharp edges, adhesives, heat, food contact).
- Never suggest reusing unsafe items (batteries, medicines, chemicals, mercury bulbs). If the object is unsafe to repurpose, return projects: [].
- Do not claim environmental impact numbers.`;
function buildAnalyseMessages(input) {
	const content = [{
		type: "text",
		text: [
			input.description ? `User description: ${input.description}` : "No description given.",
			input.correction ? `USER CORRECTION (authoritative): ${input.correction}` : "",
			Object.keys(input.answers).length ? `Answers to earlier questions (authoritative): ${JSON.stringify(input.answers)}` : ""
		].filter(Boolean).join("\n")
	}];
	if (input.image) content.push({
		type: "image",
		image: new URL(input.image)
	});
	return [{
		role: "user",
		content
	}];
}
function buildDisposalMessages(analysis, answers, unanswered, passages) {
	return [{
		role: "user",
		content: `OBJECT ANALYSIS:\n${JSON.stringify({
			...analysis,
			answers
		})}\n\nOPEN QUESTIONS: ${unanswered}\n\nGUIDE PASSAGES:\n${passages.length ? passages.map((p) => `[${p.id}] (scope: ${p.scope}; ${p.category}; ${p.source} — ${p.section}) ${p.text}`).join("\n") : "(none matched)"}`
	}];
}
async function aiDeps() {
	const { runStructured } = await import("./ai.server-CJopYZdy.mjs");
	return runStructured;
}
var analyseObject_createServerFn_handler = createServerRpc({
	id: "678d70d4edf1ce0b55461cd99cd57ba9098627c25916613d49e484acba3eb295",
	name: "analyseObject",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => analyseObject.__executeServer(opts));
var analyseObject = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({
	description: string().max(1e3).nullable(),
	image: string().startsWith("data:image/").max(4e6).nullable()
}).refine((v) => v.image || v.description && v.description.trim().length > 2, "Add a photo or a description.").parse(d)).handler(analyseObject_createServerFn_handler, async ({ data, context }) => {
	const analysis = await (await aiDeps())(analysisSchema, ANALYSE_SYSTEM, buildAnalyseMessages({
		...data,
		answers: {}
	}));
	return { id: await dbService.createDiscovery({
		userId: context.userId,
		description: data.description,
		imageData: data.image,
		objectName: analysis.object_name,
		analysis
	}) };
});
var refineDiscovery_createServerFn_handler = createServerRpc({
	id: "6d1073e949e285453dc5a773eafe9f37d310f9307b0b6ec38415b277714026b8",
	name: "refineDiscovery",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => refineDiscovery.__executeServer(opts));
var refineDiscovery = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({
	id: string().min(1),
	answers: record(string(), string().max(300)),
	correction: string().max(500).nullable()
}).parse(d)).handler(refineDiscovery_createServerFn_handler, async ({ data, context }) => {
	const { discovery: disc } = await dbService.getDiscovery(data.id, context.userId);
	const answers = {
		...disc.answers,
		...data.answers
	};
	if (data.correction) answers["correction"] = data.correction;
	const analysis = await (await aiDeps())(analysisSchema, ANALYSE_SYSTEM, buildAnalyseMessages({
		description: disc.description,
		image: disc.image_data,
		answers,
		correction: data.correction
	}));
	await dbService.refineDiscovery({
		id: data.id,
		userId: context.userId,
		analysis,
		objectName: analysis.object_name,
		answers,
		correction: data.correction,
		disposalStale: disc.disposal != null
	});
	return { ok: true };
});
var computeDisposal_createServerFn_handler = createServerRpc({
	id: "72e4e77bef6dc7ef89f220afd01111e3c85f6e95a1da51ba8258b31487319cd9",
	name: "computeDisposal",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => computeDisposal.__executeServer(opts));
var computeDisposal = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({ id: string().min(1) }).parse(d)).handler(computeDisposal_createServerFn_handler, async ({ data, context }) => {
	const { retrieve, MIN_RELEVANCE_SCORE } = await import("./guide-Dvwp24Fc.mjs").then((n) => n.l).then((n) => n.u);
	const { buildDisposal, buildQueryForAnalysis, unansweredQuestions } = await import("./disposal-pipeline-CFCCNINT.mjs");
	const { discovery: disc } = await dbService.getDiscovery(data.id, context.userId);
	const analysis = disc.analysis;
	const answers = disc.answers;
	const { passages, topScore } = retrieve(buildQueryForAnalysis(analysis, answers));
	let ai = null;
	if (topScore >= MIN_RELEVANCE_SCORE) ai = await (await aiDeps())(disposalAiSchema, DISPOSAL_SYSTEM, buildDisposalMessages(analysis, answers, unansweredQuestions(analysis, answers), passages));
	const disposal = buildDisposal({
		analysis,
		answers,
		ai,
		passages,
		topScore
	});
	await dbService.updateDisposal({
		id: data.id,
		userId: context.userId,
		disposal
	});
	return { ok: true };
});
var generateProjects_createServerFn_handler = createServerRpc({
	id: "7f8b0f98c69e688c687b21ac6e58a42c8fca2b49dbb851e154db22b5d5d744e7",
	name: "generateProjects",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => generateProjects.__executeServer(opts));
var generateProjects = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({
	id: string().min(1),
	prefs: recreatePrefsSchema
}).parse(d)).handler(generateProjects_createServerFn_handler, async ({ data, context }) => {
	const { discovery: disc } = await dbService.getDiscovery(data.id, context.userId);
	const analysis = disc.analysis;
	if (!analysis.reuse_safe) return {
		count: 0,
		unsafe: analysis.reuse_safety_note
	};
	const out = await (await aiDeps())(projectsSchema, RECREATE_SYSTEM, [{
		role: "user",
		content: `OBJECT:\n${JSON.stringify({
			...analysis,
			answers: disc.answers
		})}\n\nPREFERENCES:\n${JSON.stringify(data.prefs)}`
	}]);
	if (!out.projects.length) return {
		count: 0,
		unsafe: "SahiSort couldn't find a safe reuse for this item."
	};
	const projectPayloads = out.projects.map((p) => ({
		title: p.title,
		data: {
			...p,
			prefs: data.prefs
		}
	}));
	return {
		count: await dbService.createProjects({
			userId: context.userId,
			discoveryId: data.id,
			objectName: analysis.object_name,
			projects: projectPayloads,
			prefs: data.prefs
		}),
		unsafe: null
	};
});
var getDiscovery_createServerFn_handler = createServerRpc({
	id: "2ad2477f3848a6b9b28c2ecfc8cac5026d626f44eb7e2be900ea9055eba46354",
	name: "getDiscovery",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => getDiscovery.__executeServer(opts));
var getDiscovery = createServerFn({ method: "GET" }).middleware([requireFirebaseAuth]).validator((d) => object({ id: string().min(1) }).parse(d)).handler(getDiscovery_createServerFn_handler, async ({ data, context }) => {
	return await dbService.getDiscovery(data.id, context.userId);
});
var getProject_createServerFn_handler = createServerRpc({
	id: "a0506029861af1574d6f950c71ee6e260ac17de7e7358ddb91f5edda8a7b3e68",
	name: "getProject",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => getProject.__executeServer(opts));
var getProject = createServerFn({ method: "GET" }).middleware([requireFirebaseAuth]).validator((d) => object({ id: string().min(1) }).parse(d)).handler(getProject_createServerFn_handler, async ({ data }) => {
	return await dbService.getProject(data.id);
});
var listMine_createServerFn_handler = createServerRpc({
	id: "c9007a646e0bad97c60a7de2d7b7c265679530a1f37eb916f9df5d293b9cf739",
	name: "listMine",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => listMine.__executeServer(opts));
var listMine = createServerFn({ method: "GET" }).middleware([requireFirebaseAuth]).handler(listMine_createServerFn_handler, async ({ context }) => {
	return await dbService.listMine(context.userId);
});
var getJourneyLogs_createServerFn_handler = createServerRpc({
	id: "055b45760a661e4748b0cf281c0ca01b883a26f0a9fde11a474fc8a553773a90",
	name: "getJourneyLogs",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => getJourneyLogs.__executeServer(opts));
var getJourneyLogs = createServerFn({ method: "GET" }).middleware([requireFirebaseAuth]).handler(getJourneyLogs_createServerFn_handler, async ({ context }) => {
	return await dbService.listJourneyLogs(context.userId);
});
var updateFlags_createServerFn_handler = createServerRpc({
	id: "450a36aebb2a97ce88b2ee3ac2683470044ec395c3c78fcd59cccd8a400adb80",
	name: "updateFlags",
	filename: "src/lib/sahisort.functions.ts"
}, (opts) => updateFlags.__executeServer(opts));
var updateFlags = createServerFn({ method: "POST" }).middleware([requireFirebaseAuth]).validator((d) => object({
	table: _enum(["discoveries", "projects"]),
	id: string().min(1),
	saved: boolean().optional(),
	confirmDisposal: boolean().optional(),
	completed: boolean().optional(),
	completedSteps: array(number()).optional()
}).parse(d)).handler(updateFlags_createServerFn_handler, async ({ data, context }) => {
	await dbService.updateFlags({
		userId: context.userId,
		table: data.table,
		id: data.id,
		saved: data.saved,
		confirmDisposal: data.confirmDisposal,
		completed: data.completed,
		completedSteps: data.completedSteps
	});
	return { ok: true };
});
//#endregion
export { analyseObject_createServerFn_handler, computeDisposal_createServerFn_handler, generateProjects_createServerFn_handler, getDiscovery_createServerFn_handler, getJourneyLogs_createServerFn_handler, getProject_createServerFn_handler, listMine_createServerFn_handler, refineDiscovery_createServerFn_handler, updateFlags_createServerFn_handler };
