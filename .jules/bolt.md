## 2024-05-24 - Layout State Re-renders
**Learning:** The dashboard architecture relies on global layout state (e.g., activeTab, currentLocation, isBriefing) in the parent page component. When unrelated layout state changes, it triggers unnecessary re-renders of heavy data-fetching child components. Passing inline functions as props negates React.memo.
**Action:** Wrapped heavy data-fetching child feature components in React.memo() and replaced inline functions with useCallback handlers to prevent them from re-rendering on unrelated layout state changes, improving rendering performance.
