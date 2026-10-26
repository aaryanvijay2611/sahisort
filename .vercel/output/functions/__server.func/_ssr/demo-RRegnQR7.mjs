//#region node_modules/.nitro/vite/services/ssr/assets/demo-RRegnQR7.js
/**
* No-login demo mode.
*
* Enabled with VITE_DEMO_MODE=true. When on:
*   • /discover offers "Try without signing in", which skips Firebase Auth.
*   • Server functions accept requests without a bearer token and act as the
*     fixed DEMO_USER_ID below.
*   • Data for every request is kept in the local JSON store (.data/), never in
*     Firestore — see hasCloudFirestore() in integrations/firebase/db.server.ts.
*
* Turn it off for anything that must require a real account.
*/
var DEMO_MODE = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_FIREBASE_API_KEY": "AIzaSyBHmzbcLZ1fvuEm4Cek34ySgLOlSJ1AOn0",
	"VITE_FIREBASE_APP_ID": "1:28052214935:web:33bcc7c9e6244a3dba45d2",
	"VITE_FIREBASE_AUTH_DOMAIN": "sahisort.firebaseapp.com",
	"VITE_FIREBASE_MESSAGING_SENDER_ID": "28052214935",
	"VITE_FIREBASE_PROJECT_ID": "sahisort",
	"VITE_FIREBASE_STORAGE_BUCKET": "sahisort.firebasestorage.app"
}["VITE_DEMO_MODE"] === "true";
/** Fixed identity for the demo session. All demo discoveries share it. */
var DEMO_USER_ID = "demo-user";
/** localStorage key + window event used to sync the demo session across hooks. */
var DEMO_STORAGE_KEY = "sahisort.demo-session";
var DEMO_EVENT = "sahisort:demo-change";
//#endregion
export { DEMO_USER_ID as i, DEMO_MODE as n, DEMO_STORAGE_KEY as r, DEMO_EVENT as t };
