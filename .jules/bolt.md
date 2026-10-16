## 2024-10-16 - [Promise Caching]
**Learning:** Caching the active Promise instance rather than only the resolved data reduces latency to 0ms for simultaneous requests (thundering herd problem). Returning the inner Promise without `async` prevents microtask delays.
**Action:** When creating module-level request caches, cache the fetch Promise and handle its catch gracefully, deleting the cache item if it rejects to avoid permanently serving a failed promise.
