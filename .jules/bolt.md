## 2026-07-05 - Next.js Route Bundle Optimization
**Learning:** Initial page loads were synchronously importing 10 heavy dashboard feature components (like AdvisoryDashboard, FieldHealth) causing the First Load JS for the '/' route to be massive (~284 kB).
**Action:** Use `next/dynamic` to lazy load these feature components in `src/app/page.tsx` since only one is rendered at a time based on the active tab, resulting in a ~45% reduction in initial load bundle size.
