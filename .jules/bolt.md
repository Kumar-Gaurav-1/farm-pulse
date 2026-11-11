## 2024-05-18 - Reduce Initial Load JS with dynamic imports
**Learning:** By statically importing conditionally rendered UI components (e.g. tabs in the dashboard), the First Load JS size grows unnecessarily since those tabs are not instantly visible.
**Action:** When working on Next.js applications, use `next/dynamic` to lazily load conditionally rendered UI components (like hidden dashboard tabs) while keeping the default components statically imported to avoid layout flashes.
