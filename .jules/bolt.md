# Bolt's Journal

## 2024-07-25 - React Layout Re-renders
**Learning:** Structural layout components like `SidebarNav` and `TopNav` in the main layout (e.g. `Dashboard`) will re-render whenever global layout state (like `activeTab` or `currentLocation`) changes, causing unnecessary virtual DOM diffs and potentially expensive re-renders.
**Action:** Wrap these static or layout components in `React.memo()` and always ensure the parent passes stable references (e.g. using `useCallback()` for inline functions) to prevent React from invalidating the memoization.
