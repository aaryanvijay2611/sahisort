import { o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { a as signInWithEmailAndPassword, n as createUserWithEmailAndPassword, o as signInWithPopup, r as getAuth, s as signOut, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { t as getFirestore } from "../_libs/@firebase/firestore+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-dBu0b8No.js
var env = {
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
};
var firebaseConfig = {
	apiKey: env["VITE_FIREBASE_API_KEY"] || "AIzaSyDummyKeyForDevelopment123456",
	authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"] || (env["VITE_FIREBASE_PROJECT_ID"] ? `${env["VITE_FIREBASE_PROJECT_ID"]}.firebaseapp.com` : "sahisort-app.firebaseapp.com"),
	projectId: env["VITE_FIREBASE_PROJECT_ID"] || env["FIREBASE_PROJECT_ID"] || "sahisort-app",
	storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"] || (env["VITE_FIREBASE_PROJECT_ID"] ? `${env["VITE_FIREBASE_PROJECT_ID"]}.appspot.com` : "sahisort-app.appspot.com"),
	messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "1234567890",
	appId: env["VITE_FIREBASE_APP_ID"] || "1:1234567890:web:abcdef123456"
};
var app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
var auth = getAuth(app);
getFirestore(app);
var googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
async function signInWithGoogle() {
	return await signInWithPopup(auth, googleProvider);
}
async function signInWithEmail(email, pass) {
	return await signInWithEmailAndPassword(auth, email, pass);
}
async function signUpWithEmail(email, pass) {
	return await createUserWithEmailAndPassword(auth, email, pass);
}
async function signOutUser() {
	return await signOut(auth);
}
//#endregion
export { signUpWithEmail as a, signOutUser as i, signInWithEmail as n, signInWithGoogle as r, auth as t };
