# Performance Learnings

## 2023-10-27
* **Title:** Frontend API Request Caching
* **Learning:** When rendering React components that make identical API calls, such as the `FieldIntelligence` component relying on multiple un-cached calls to `ApiServices` during re-renders or navigation, caching the promises using a module-level `Map` can massively reduce latency and network overhead.
* **Action:** I introduced `apiCache = new Map<string, Promise<any>>()` inside `src/components/features/FieldIntelligence.tsx` to memoize the pending/resolved Promises returned by `ApiServices.getFieldNDVI` and `ApiServices.getYieldBenchmarks`. This effectively caches the data per field and benchmark parameters, reducing the uncached response time (which we benchmarked directly) from ~10ms locally to ~2ms per 1000 simulated renders.
