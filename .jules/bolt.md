## 2024-05-24 - API Promise Caching and Deduping
**Learning:** In frontend API service layers, identical concurrent fetches can cause redundant network requests, blocking rendering or consuming unnecessary bandwidth. Standard caching doesn't handle concurrent fetches unless the *promise itself* is cached.
**Action:** Implement module-level Promise caching with TTL for time-sensitive data, and remove `async` from the outer function to avoid microtask overhead. Ensure failed requests clear the cache to avoid poisoning.
