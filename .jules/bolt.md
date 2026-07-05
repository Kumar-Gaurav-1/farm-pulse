# Performance Journal

Date: 2024-05-18
Title: Array iterations in React component renders
Learning: Using multiple `.filter().length` passes over an array inside a component's render function (or inline definitions like array mappings) causes O(M*N) complexity. It is significantly faster (~2x to ~7x depending on the method) to use a single `reduce` or `for` loop to compute all aggregations simultaneously, combined with `useMemo` to prevent recalculation when unrelated state changes.
Action: Updated `AlertCenter.tsx` to precalculate notification counts in a single O(N) pass and cache the result with `useMemo`.
