## 2024-10-24 - Module-Level Promise Cache for API Services
**Learning:** In Next.js/React applications, calling external APIs (like exchange rates) without a module-level cache leads to redundant network requests across component remounts or multiple consumers.
**Action:** Implement a module-level `Map` to cache in-flight Promises and resolved data with a Time-To-Live (TTL) to prevent duplicate requests and serve stale data.
