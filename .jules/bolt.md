## 2024-11-20 - Memoizing list filters to prevent O(n) rendering bottlenecks
**Learning:** Found that arrays resulting from filter operations inside components (like `notifications.filter()`) were causing unnecessary recalculations on every render, especially on unoptimized UI components handling many array items.
**Action:** Use `useMemo` specifically when generating derived lists or aggregates (like counts per category) based on frequently updated arrays to prevent the application from doing O(n) recalculations on every render cycle.
