## 2026-07-23 - Prevent unnecessary re-renders of TopNav and SidebarNav on unrelated layout state changes
**Learning:** TopNav and SidebarNav in Next.js/React dashbard applications will re-render unnecessarily on parent state changes like `activeTab` and `isDiagnosing` unless memoized. Inline function props like `onTabChange` or `onLocationChange` break `React.memo` unless they are wrapped in `useCallback`.
**Action:** Add `React.memo` to TopNav and SidebarNav, and wrap their callback functions in `useCallback` in the parent component.
