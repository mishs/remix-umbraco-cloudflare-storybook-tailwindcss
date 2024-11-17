import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  // Add Cloudflare worker environment simulation
  worker: {
    format: 'es',
    plugins: () => []
  },
  // Enable source maps for better debugging
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        format: 'es',
        inlineDynamicImports: true
      }
    }
  },
  // Add environment variables that match Cloudflare's
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.CLOUDFLARE_WORKER': JSON.stringify(true)
  }
});