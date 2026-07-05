
## 2025-07-05 - Optimize AlertCenter markAllAsRead

**Title:** Avoid redundant object allocation when iterating arrays.

**Learning:** When using `map()` to update the state of objects in an array, if some objects already have the desired state, conditionally returning the existing object reference avoids unnecessary allocations and garbage collection, providing significant speedups for large collections.

**Action:** Optimized `markAllAsRead` in `AlertCenter.tsx` to return the original object if `read` is already true. Baseline: 1778.59 ms, Optimized: 588.18 ms, Improvement: 66.93% faster (measured with 100,000 items on 100 iterations).
