# Performance Learning: Module-Level Caching for API Service Calls

**Date:** 2024-05-24 (Current run)
**Title:** Module-level Promise caching for repeated static API calls
**Learning:** Concurrent mounts or redundant calls across the codebase for static or semi-static data (like currency exchange rates) can result in multiple identical network requests. By implementing a module-level `Map` that caches the fetch `Promise` (not just the resolved data), redundant requests wait on the same Promise, improving execution time (from ~250ms to ~162ms for 10 concurrent requests) and reducing redundant I/O and network overhead.
**Action:** When creating utility functions for external API data in React or Next.js codebases, use module-scoped variables to cache Promises for identical requests, ensuring there is a `forceRefresh` option for intentional data fetching and a cache deletion fallback on error to avoid persisting rejected Promises.