## 2024-05-24 - Promise Caching for External APIs
**Learning:** Repeated calls to the same external API within the same view (e.g. currency conversion) can cause unnecessary network overhead. Fetch doesn't cache promises by default.
**Action:** Implement a module-level Promise cache using a Map keyed by request parameters. Ensure the promise is removed from the cache on rejection to prevent a failed request from blocking future retries.
