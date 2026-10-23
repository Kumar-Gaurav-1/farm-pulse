
## 2024-05-15 - Promise caching for external API calls
**Learning:** Implementing a module-level Promise cache for external API calls prevents redundant network requests during component remounts or simultaneous calls, significantly reducing latency and avoiding rate limits.
**Action:** When integrating with external APIs in a frontend service layer, implement a Promise cache (e.g., using a Map) to ensure identical concurrent requests are deduplicated and only one network call is made.
