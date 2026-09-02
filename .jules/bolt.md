# Performance Learnings

## Cache API exchange rates to optimize performance

* **Date:** 2023-11-20
* **Title:** Module-Level Promise Caching for API Requests
* **Learning:** When optimizing React components that frequently request static/semi-static data on mount, use a module-level `Map` to cache the resolved *Promises* instead of just the raw data. This is crucial for avoiding duplicate requests when components rapidly unmount/remount (like during Next.js client-side navigation) or when multiple components fetch simultaneously. Crucially, always remove failed requests from the cache so the system can retry rather than serving a stale error indefinitely. Implement a `forceRefresh` parameter to allow manual user re-fetches.
* **Action:** Implemented a module-level `exchangeRateCache` in `src/lib/api-services.ts` that caches the `fetchPromise`. Added a `forceRefresh` flag that the UI uses when a user clicks "Sync Streams", ensuring cache invalidation only happens deliberately.
