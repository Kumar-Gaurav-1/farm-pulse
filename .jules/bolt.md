
## 2024-03-24 - Lazy Loading Conditionally Rendered Next.js Components
**Learning:** In Next.js client components (`"use client"`), statically importing large components that are hidden behind tabs (like complex dashboard panels) forces them into the initial "First Load JS" bundle, slowing down the initial page load time significantly.
**Action:** Use `next/dynamic` to lazy load these conditionally rendered components. Ensure visible default components remain statically imported to prevent loading flashes.
