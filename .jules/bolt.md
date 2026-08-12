# ⚡ Bolt Performance Journal

## [Current Date]
**Title:** Local Module State Caching for Expensive Network Requests

**Learning:**
In `MarketDashboard.tsx`, the `fetchMarketIntelligence` function issues multiple expensive network/LLM calls (`marketTrendSynthesis`, `ApiServices.getExchangeRates`, `ApiServices.getDeadlines`) concurrently via `Promise.all` on every component mount. By moving the caching state outside the React component (module-level cache), we can persist the fetched data across component remounts, thereby eliminating redundant network requests and drastically reducing load times on subsequent navigations to the dashboard. An active promise cache also prevents race conditions if the component mounts multiple times quickly or if `fetchMarketIntelligence` is triggered concurrently.

**Action:**
Implemented a module-level local cache with a 5-minute TTL and active promise tracking in `MarketDashboard.tsx`. This avoids repeated network calls during component remounts.
