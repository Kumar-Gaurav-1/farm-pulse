# Performance Learnings

## Date: 2024-08-12
**Title:** Module-level caching for Next.js features
**Learning:** Components mounted via conditional rendering (like tab switching in `app/page.tsx`) frequently unmount and remount, losing their local state and re-triggering their `useEffect` hooks. For expensive operations like LLM API calls and multiple REST requests without a global state manager (like Redux, Zustand or React Query), simple module-level variables provide an extremely lightweight and effective cache.
**Action:** Implemented a module-level variable to store the result of `Promise.all` inside `MarketDashboard.tsx`, drastically reducing redundant data fetching by checking cache validity and TTL.
