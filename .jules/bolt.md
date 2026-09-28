
## 2024-05-18 - Caching API calls to Frankfurter
**Learning:** Found an opportunity to cache the results of the `getExchangeRates` API call which is used in `MarketDashboard.tsx`. Because currency rates don't fluctuate violently by the millisecond, caching the result with a brief TTL (e.g., 5 minutes) can significantly improve performance for subsequent re-renders or tab switches without rendering stale data.
**Action:** Implemented a module-level Promise cache for `getExchangeRates` in `src/lib/api-services.ts`. It stores the unresolved Promise itself so that concurrent requests coalesce to the same promise instead of triggering multiple identical fetch calls.
