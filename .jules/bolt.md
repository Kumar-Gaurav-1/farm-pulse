## 2026-07-27 - [React.memo Missing on Heavy Components]
**Learning:** [The dashboard relies heavily on layout state like `activeTab` or `currentLocation` that changes often. When layout state changes in `src/app/page.tsx`, heavy child components like `AdvisoryDashboard` that do data fetching re-render needlessly unless wrapped in `React.memo` or managed properly.]
**Action:** [Wrap `AdvisoryDashboard` with `React.memo` since it manages its own async state fetching. Verify `React` is imported since Next.js often uses the new JSX transform without it explicitly in scope.]
