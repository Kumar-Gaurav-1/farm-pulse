## 2024-10-27 - Lazy load non-default Next.js tabs
**Learning:** In Next.js, conditionally rendered components in a monolithic dashboard view are included in the initial "First Load JS" bundle if statically imported, even if they aren't visible on mount.
**Action:** Use `next/dynamic` for conditionally rendered components that are not visible by default to reduce the initial JavaScript payload.
