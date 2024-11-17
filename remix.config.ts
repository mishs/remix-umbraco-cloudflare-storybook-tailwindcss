
import type { Config } from "@remix-run/dev";

export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  dev: {
    port: 8002,
  },
  cloudflare: {
    kv: {
      TODO_LIST: {
        binding: "TODO_LIST",
        preview: {
          namespace: "preview-todo-list",
        },
        production: {
          namespace: "production-todo-list",
        },
      },
    },
  },
} satisfies Config;
