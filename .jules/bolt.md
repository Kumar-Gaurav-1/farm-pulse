## 2024-05-24 - Initializing Bolt Journal
**Learning:** Starting performance journal.
**Action:** Always measure before optimizing.

## 2024-05-24 - Optimizing Redundant API Calls on Unmount/Remount
**Learning:** In Next.js applications, tab switching components often unmount and remount, causing identical data fetching requests via `useEffect`. Module-level caching for non-realtime or slowly changing data avoids redundant network calls and dramatically speeds up perceived performance when switching views.
**Action:** Implement module-level Promise caches for specific feature data fetches (e.g., `marketDataCache` in `MarketDashboard`) so components immediately resolve with previously fetched data on remount. Ensure caching handles errors correctly (resetting cache) and provides manual bypass methods for user-initiated refreshes.
