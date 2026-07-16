# Bolt Performance Optimizations

Date: 2025-07-16
Title: Optimize Redundant Array Filtering in AlertCenter
Learning: Iterating over an array multiple times inside a render block, especially inside another array map, using `filter` can create an `O(N*M)` execution complexity where N is array length and M is categories, causing unnecessary performance overhead on every re-render.
Action: Replaced four separate `notifications.filter` calls with a single-pass `reduce` inside a `useMemo` block, calculating all category counts upfront in `O(N)` time and referencing the cached results during rendering.
