## 2024-11-05 - Lazy Load Hidden Dashboard Components
**Learning:** Conditionally rendered Next.js components (like hidden tabs) significantly bloat the initial 'First Load JS' bundle if statically imported. In this app's architecture, lazy-loading all non-default tabs via `next/dynamic` drops the first-load JS size from ~284kB to ~162kB.
**Action:** Use `next/dynamic` for heavy components that are not visible on the initial page render, ensuring to use `.then()` for named exports.
