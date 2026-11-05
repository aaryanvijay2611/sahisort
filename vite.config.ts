import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Build the server for Netlify Functions when building on Netlify (NETLIFY=true);
// other environments, like the Lovable sandbox, keep their default preset.
// Declared outside the literal because the config's types omit nitro's
// rollupConfig/traceDeps, which are still forwarded to nitro.
const nitro = {
  ...(process.env["NETLIFY"] ? { preset: "netlify" } : {}),
  rollupConfig: {
    external: [/^firebase-admin(?:\/|$)/, /^@google-cloud\/firestore(?:\/|$)/],
  },
  traceDeps: ["firebase-admin*", "@google-cloud/firestore*"],
};

export default defineConfig({
  vite: {
    envDir: ".",
  },
  nitro,
  tanstackStart: {
    server: { entry: "server" },
  },
});
