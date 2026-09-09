## 2024-09-09 - React Double Render Deduplication
**Learning:** Concurrent identical fetches (e.g., from React Strict Mode or multiple components mounting simultaneously) can be deduplicated by caching the active fetch `Promise` at the module scope rather than waiting to cache the resolved data.
**Action:** When a function returns a Promise, cache the Promise object immediately using a Map based on the arguments, and ensure you clear the cache entry on failure (`.catch()`) so that a transient network error doesn't permanently block successful retries.
