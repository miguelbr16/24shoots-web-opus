import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Cloudflare Workers build (OpenNext). Every page is prerendered (SSG) and the site
 * never revalidates, so prerendered HTML is read straight from Workers static assets:
 * no KV/R2/D1 needed for caching — 0 € on the Workers Free plan.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
