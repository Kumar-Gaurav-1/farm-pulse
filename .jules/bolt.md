## 2025-05-20 - [Module-Level Promise Caching]
**Learning:** React components (like `MarketDashboard`) fetching identical data using `Promise.all` alongside other slower requests can block UI updates or cause race conditions on remounts if the network fetch doesn't use a cache.
**Action:** When integrating APIs in shared utility services that don't need real-time data on every mount (like exchange rates), use a module-level `Map` to cache not just the results, but the active Promise itself to avoid race conditions and redundant network calls from simultaneous requests.
