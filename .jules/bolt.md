## 2026-08-09 - Memoization in Next.js App Router Sidebar
**Learning:** Found an opportunity to optimize rendering in the main dashboard layout. The `SidebarNav` was re-rendering unnecessarily whenever the dashboard clock ticked or when context switched, despite its props remaining effectively identical.
**Action:** Applied `React.memo` to `SidebarNav` and stabilized the `onTabChange` callback in the parent using `useCallback`. Next time, look for static navigation components in high-level layouts as prime candidates for memoization.
