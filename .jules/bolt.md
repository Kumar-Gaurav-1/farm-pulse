Date: 2024-08-12
Title: Optimize Category Filtering in AlertCenter
Learning: Calling `Array.prototype.filter()` multiple times inline within a React component's render method can cause performance bottlenecks as the array size scales. Pre-computing counts in a single pass using `Array.prototype.reduce()` and memoizing the result with `useMemo` significantly reduces CPU cycles during re-renders.
Action: Optimized `AlertCenter.tsx` to compute `categoryCounts` in a single pass using `reduce` instead of filtering the notifications array four times during every render.
