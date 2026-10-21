## 2024-10-21 - [API Request Promise Caching]
**Learning:** External API requests in module utilities are often repeatedly called by multiple components on remount or in parallel, leading to redundant network calls when the data changes infrequently. Caching the raw values is insufficient if multiple requests fire before the first resolves.
**Action:** Implement module-level Promise caching with TTL and error-based cache eviction to coalesce parallel requests into a single network call.
