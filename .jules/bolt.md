## 2025-02-18 - Module-level Promise Caching for APIs
**Learning:** When implementing module-level Promise caching for `fetch` requests, `fetch` only rejects on network failures. We must explicitly check `!res.ok` to trigger error handling, and if returning a Promise, remove the `async` keyword from the outer function to avoid double Promise-wrapping.
**Action:** Always check `!res.ok` for `fetch` calls in cached promises, remove the `async` keyword from the outer function signature, and delete the cache entry on rejection to avoid caching a failed state indefinitely.
