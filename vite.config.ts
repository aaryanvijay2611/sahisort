import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
  preset: "vercel",
  rollupConfig: {
    external: [
      /^firebase-admin(?:\/|$)/,
      /^@google-cloud\/firestore(?:\/|$)/,
    ],
  },
  traceDeps: [
    "firebase-admin*",
    "@google-cloud/firestore*",
  ],
},
  tanstackStart: {
    server: { entry: "server" },
  },
});