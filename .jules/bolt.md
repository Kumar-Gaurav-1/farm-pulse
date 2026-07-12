## 2024-05-24 - Prevent Dashboard Re-renders
**Learning:** The application's dashboard architecture relies on global layout state (`activeTab`, `currentLocation`), meaning heavy data-fetching child components re-render unnecessarily on unrelated layout changes.
**Action:** Always wrap heavy data-fetching child components (like `MarketDashboard`, `AdvisoryDashboard`) in `React.memo` to prevent unnecessary re-renders.
