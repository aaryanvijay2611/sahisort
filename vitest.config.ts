
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    envDir: ".",
    server: {
      allowedHosts: ["sharon-edmonton-asylum-date.trycloudflare.com"],
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
