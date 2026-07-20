## 2024-11-20 - Memoizing Dashboard Layout State
**Learning:** The main `Dashboard` layout in `src/app/page.tsx` causes significant cascading re-renders to expensive layout components (`SidebarNav`, `TopNav`, `FieldHealth`) when the `activeTab` or `currentLocation` states change.
**Action:** When designing top-level layout components that hold application state, always wrap child components in `React.memo` and strictly use `useCallback` for any event handlers passed down as props to prevent these layout components from re-rendering unnecesssarily.
