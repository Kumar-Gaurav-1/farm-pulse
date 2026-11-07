## 2024-05-18 - Lazy-loading Next.js Dashboard Components
**Learning:** In this Next.js application, conditionally rendered UI components (like hidden dashboard tabs) that are statically imported cause an unnecessary bloat to the initial "First Load JS" bundle size.
**Action:** When implementing conditionally rendered UI components that are not visible by default, lazy-load them using `next/dynamic` to minimize the initial First Load JS size while keeping default visible components statically imported to avoid loading flashes.
