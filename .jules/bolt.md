Date: 2024-09-02
Title: Optimize Category Counting
Learning: For React components that repeatedly generate counts for multiple categories from an array, pre-computing the counts in a single pass using `Array.prototype.reduce()` and memoizing the result with `useMemo` is more performant than using multiple inline `Array.prototype.filter()` calls, avoiding redundant array traversals on every render.
Action: Replaced multiple `notifications.filter().length` with a single `reduce` pass grouped in a `useMemo` hook in `AlertCenter.tsx`.