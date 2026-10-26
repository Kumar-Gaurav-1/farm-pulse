
## 2024-03-24 - Dynamic Imports for Next.js Dashboards
**Learning:** Monolithic dashboard pages with numerous feature components can suffer from massive bundle sizes. Utilizing `next/dynamic` to lazy-load tabs/features that aren't immediately visible significantly reduces First Load JS.
**Action:** Always evaluate code splitting opportunities for off-screen or tabbed components in large Next.js pages.
