## 2024-05-18 - Module-level Promise caching
**Learning:** Implementing module-level caching avoids duplicate requests but the active fetch promise must be removed from the cache on rejection to prevent blocking future retries.
**Action:** Always clean up rejected promises in the active fetch map.
