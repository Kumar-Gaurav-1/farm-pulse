
## 2024-06-25 - [Preventing Concurrent Redundant Fetch Requests in Next.js/React Client Components]
**Learning:** [When multiple client components (or the same component re-rendering/mounting quickly) trigger the same API call concurrently, a simple data cache doesn't prevent redundant in-flight network requests. If 3 requests fire before the first resolves, all 3 hit the network.]
**Action:** [Implement a two-tier module-level cache: one `Map` for resolved data (with TTL) and another `Map` for active in-flight Promises. Return the active Promise for concurrent requests so they all share the single network request, and always delete the active Promise upon resolution/rejection.]
