## 2024-07-11 - [Dashboard Performance]
**Learning:** Many heavy dashboard components in this architecture (like AdvisoryDashboard) lack memoization, leading to unnecessary re-renders on global state changes in the parent layout (like tab changes).
**Action:** Always consider wrapping expensive, data-fetching components with React.memo when they do not rely on rapidly changing props, especially when they sit directly beneath a global layout state provider.
