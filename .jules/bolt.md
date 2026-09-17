## 2023-11-09 - Redundant Fetch Issue

**Learning:** When making frequent component re-renders or concurrent API calls through a shared service layer, unmemoized `fetch` calls can cause significant redundant network overhead (e.g., from ~60ms to ~0.01ms for cached lookups). The native fetch promise cache effectively deduplicates both sequential and concurrent requests for identical resources.
**Action:** Always implement a Promise-based cache for external static or semi-static API integrations in service modules (like `ApiServices.ts`), handling both caching the ongoing promise (to deduplicate concurrent calls) and deleting cache on rejection to ensure fail-safety.
