## 2025-02-18 - Lazy-loading conditionally rendered features in Next.js
**Learning:** Importing components that are only shown in secondary views can bloat the First Load JS size of Next.js apps.
**Action:** Use next/dynamic with .then() for named exports to load conditional views on-demand while retaining static imports for default visible components to prevent loading flashes.
