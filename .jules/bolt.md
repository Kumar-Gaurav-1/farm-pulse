## 2024-05-24 - Module-Level Caching for API Requests
**Learning:** Redundant API calls that take significant time (e.g., fetching exchange rates) can be avoided by caching their Promises at the module level.
**Action:** When working with API functions that fetch static or infrequently changing data, consider using a module-level `Map` to cache the pending or resolved Promise to prevent concurrent and subsequent redundant requests. Implement an eviction strategy (e.g., TTL) for cache freshness.
