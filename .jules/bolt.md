## 2024-10-24 - Module-level Promise Caching for Duplicate API Calls
**Learning:** Duplicate fetching of external APIs on component mount is a common anti-pattern that can slow down rendering and increase latency.
**Action:** Implement a module-level Promise cache mapping a request to its promise to ensure all concurrent requests wait on a single fetch promise.
