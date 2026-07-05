# Bolt Performance Journal

**Date:** 2023-10-25
**Title:** Single-pass array counting over multiple filters
**Learning:** Performing multiple `.filter().length` passes on an array to count item categories causes redundant O(M*N) iterations. O(N) array iteration with a single `.reduce()` is significantly more efficient, especially as the array size scales.
**Action:** Replaced multiple filter calls in `AlertCenter.tsx` with a single `.reduce()` pass and memoized the result to prevent unnecessary recalculations on re-renders.
