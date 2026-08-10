## 2024-08-10 - Dashboard Layout Global State Anti-Pattern
**Learning:** The Dashboard layout relies on a single parent (`page.tsx`) managing all global state (activeTab, currentLocation, etc). Because layout child components like `SidebarNav` receive inline function props (e.g., `onTabChange`), they needlessly re-render whenever ANY unrelated layout state (like `currentLocation` from `TopNav`) changes.
**Action:** Extract inline layout state handlers into `useCallback` hooks and wrap presentational sibling layout components in `memo()` to decouple their render cycles.
