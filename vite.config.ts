import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const nitro = {
  ...(process.env["NETLIFY"] ? { preset: "netlify" } : {}),
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