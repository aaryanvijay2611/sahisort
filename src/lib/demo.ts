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
export const DEMO_MODE = import.meta.env["VITE_DEMO_MODE"] === "true";

/** Fixed identity for the demo session. All demo discoveries share it. */
export const DEMO_USER_ID = "demo-user";

/** localStorage key + window event used to sync the demo session across hooks. */
export const DEMO_STORAGE_KEY = "sahisort.demo-session";
export const DEMO_EVENT = "sahisort:demo-change";
