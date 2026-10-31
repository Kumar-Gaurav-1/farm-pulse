## 2023-10-31 - Next.js First Load JS Size Reduction with Dynamic Imports
**Learning:** Statically importing heavily rendered components in a single-page layout drastically increases the First Load JS bundle size, even if those components are conditionally rendered and hidden on initial load.
**Action:** Use `next/dynamic` with `import(...).then(mod => mod.ComponentName)` to lazy-load conditional UI sections, while keeping default visible sections statically imported to prevent loading flashes.
