## 2024-05-24 - Dynamic Imports for Conditionally Rendered Components
**Learning:** In Next.js, conditionally rendered components (like dashboard tabs) are included in the initial JS bundle if statically imported, increasing 'First Load JS'.
**Action:** Use next/dynamic to lazy load components that aren't immediately visible, preserving static imports only for the default view to avoid loading flashes.
