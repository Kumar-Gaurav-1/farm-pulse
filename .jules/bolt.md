## 2024-05-24 - [Lazy Loading Hidden Tabs]
**Learning:** [In Next.js applications with many hidden dashboard tabs conditionally rendered based on state, statically importing all tab components results in a bloated 'First Load JS' bundle. Only the default visible components need to be statically imported to prevent loading flashes.]
**Action:** [Use `next/dynamic` to lazy-load conditionally rendered UI components (e.g., hidden dashboard tabs) to minimize the initial bundle size.]
