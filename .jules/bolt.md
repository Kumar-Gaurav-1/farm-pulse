
## 2024-11-03 - Dynamic Imports for Conditionally Rendered Next.js Components
**Learning:** In a single-page Next.js dashboard where most views are conditionally rendered behind state-based tabs, statically importing all tab components drastically inflates the 'First Load JS' bundle size.
**Action:** Always wrap non-default, conditionally rendered heavy UI components with `next/dynamic` to utilize code splitting, ensuring the initial bundle only contains what is needed for the first paint.
