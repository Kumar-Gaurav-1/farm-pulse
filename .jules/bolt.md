
## 2024-10-24 - Expensive AI Refetches on Component Remount
**Learning:** Navigating between dashboard tabs unmounts and remounts components, triggering expensive Genkit AI server actions repeatedly for the same data.
**Action:** Implemented a module-level Promise cache with TTL and lazy state initialization for active fetches to prevent redundant network and AI calls on tab remounts.
