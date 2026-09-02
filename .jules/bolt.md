# Bolt Performance Optimization Journal

## [2024-05-18] Caching for Exchange Rates API

**Learning:** Repeated concurrent requests in React (e.g. strict mode or navigating tabs) result in redundant network requests for identical static data endpoints.

**Action:** Implemented a module-level `Map` cache for promises and resolved responses in `src/lib/api-services.ts` `getExchangeRates`. This avoids redundant calls.

**Impact:** Concurrent calls execution time in benchmark went from ~268.6ms down to ~210.3ms (since only one request is triggered, resolving the promise for all callers immediately).
