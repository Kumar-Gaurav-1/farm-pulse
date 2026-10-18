
## 2024-10-18 - Promise Caching for Redundant API Calls
**Learning:** In dashboard environments, unmemoized API service layer functions that fetch frequently-accessed but rarely-changing external data (like exchange rates) can lead to redundant network requests when components remount or update.
**Action:** Implement module-level Promise caching (e.g., storing the active `fetch` Promise in a module-scoped `Map`). Remove the outer `async` signature so the raw Promise is returned, and ensure failed requests are evicted from the cache to prevent permanently caching global error states. Add a TTL for time-sensitive data.
