Date: 2024-07-26
Title: Optimize notification category counting
Learning: Redundant array iterations can be aggregated into a single `.reduce()` pass for significant performance gains, especially as arrays grow larger over time.
Action: Replaced 4x `.filter().length` array iterations in `AlertCenter.tsx` with a single `.reduce()` calculation, storing the result in a `categoryCounts` map that is accessed directly.
