## 2024-10-09 - Module-level Promise Caching with TTL
**Learning:** Explicitly checking `!res.ok` to throw errors prevents caching failed HTTP responses, and returning promises directly avoids unnecessary microtasks.
**Action:** Always include error handling to clear rejected promises, and remove `async` when returning a cached or newly created Promise.
