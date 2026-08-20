## 2026-08-20 - Prevent Redundant API Calls on Remount
**Learning:** Found an opportunity to cache expensive LLM API calls in `MarketDashboard` and `AdvisoryDashboard`. These components make external LLM API calls via `fetchMarketIntelligence` and `fetchAdvisory` every time they are mounted, which happens repeatedly during tab switching in the Next.js app.
**Action:** Implemented a module-level Promise cache to prevent redundant API calls across component mounts, ensuring a fallback mechanism to clear the cache if the promise rejects.
