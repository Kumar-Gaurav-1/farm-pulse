## 2024-05-24 - Lazy Loading Hidden Next.js Dashboard Tabs
**Learning:** In this Next.js application, conditionally rendered UI components (e.g., hidden dashboard tabs) should be lazy-loaded using `next/dynamic` to minimize the initial 'First Load JS' bundle size, while the default visible components should remain statically imported to prevent loading flashes.
**Action:** Always evaluate conditionally rendered components in Next.js for lazy loading opportunities with `next/dynamic` to reduce the initial JS payload, keeping default components statically imported.
