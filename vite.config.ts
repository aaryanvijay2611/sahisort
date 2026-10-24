
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    envDir: ".",
    ssr: {
      external: ["@google-cloud/firestore"],
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
