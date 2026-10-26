import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as DEMO_MODE, r as DEMO_STORAGE_KEY, t as DEMO_EVENT } from "./demo-RRegnQR7.mjs";
import { i as onAuthStateChanged } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { t as auth } from "./client-dBu0b8No.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-B4hykVTJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function readDemoSession() {
	if (!DEMO_MODE || typeof window === "undefined") return false;
	return window.localStorage.getItem(DEMO_STORAGE_KEY) === "1";
}
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [demo, setDemo] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setReady(true);
		});
		return () => unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!DEMO_MODE) return;
		setDemo(readDemoSession());
		const sync = () => setDemo(readDemoSession());
		window.addEventListener(DEMO_EVENT, sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener(DEMO_EVENT, sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	const startDemo = (0, import_react.useCallback)(() => {
		if (!DEMO_MODE) return;
		window.localStorage.setItem(DEMO_STORAGE_KEY, "1");
		window.dispatchEvent(new Event(DEMO_EVENT));
	}, []);
	const exitDemo = (0, import_react.useCallback)(() => {
		window.localStorage.removeItem(DEMO_STORAGE_KEY);
		window.dispatchEvent(new Event(DEMO_EVENT));
	}, []);
	return {
		user,
		demo,
		demoMode: DEMO_MODE,
		startDemo,
		exitDemo,
		session: user ? { user } : demo ? {
			user: null,
			demo: true
		} : null,
		ready
	};
}
//#endregion
export { useAuth as t };
