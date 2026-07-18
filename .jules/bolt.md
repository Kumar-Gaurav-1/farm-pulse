
## 2024-05-24 - [React.memo in layout architecture]
**Learning:** The dashboard architecture relies on global layout state (e.g. `activeTab`, `currentLocation`). Unnecessary re-renders occur when a single layout state updates. Since inline functions negate `React.memo`, passing down function props from `page.tsx` directly was causing cascading renders across heavy data-fetching children.
**Action:** Always wrap heavy components and layout structural components in `React.memo` and ensure the parent (e.g. `page.tsx`) uses `React.useCallback` for all function props to maintain stable references, avoiding full application re-renders on minor layout state changes.
