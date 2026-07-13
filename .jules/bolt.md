## 2026-07-13 - Dashboard Layout Re-renders
**Learning:** The dashboard architecture relies on global layout state in `page.tsx` (like `activeTab`, `currentLocation`, `isBriefing`). State changes here cause expensive data-fetching child components (like `AdvisoryDashboard`, `MarketDashboard`, `SustainabilityDashboard`) to re-render unnecessarily if not memoized, wasting CPU cycles and potentially re-triggering effects.
**Action:** Wrap heavy data-fetching feature components in `React.memo` to prevent unnecessary re-renders on layout state changes.
