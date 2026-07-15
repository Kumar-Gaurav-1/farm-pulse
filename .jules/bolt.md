## 2024-05-14 - Global Layout State Bottleneck
**Learning:** The application's dashboard architecture relies on global layout state (e.g., `activeTab`, `currentLocation` in `src/app/page.tsx`), meaning heavy data-fetching child components (`AdvisoryDashboard`, `MarketDashboard`, etc.) re-render unnecessarily on unrelated layout state changes (e.g. changing the sidebar state).
**Action:** Always wrap heavy, data-fetching leaf components with `React.memo()` in this architecture to prevent expensive re-renders and re-fetching on parent state changes.
