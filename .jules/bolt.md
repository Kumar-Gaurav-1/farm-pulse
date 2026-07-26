
## 2024-05-24: AlertCenter redundant array iterations
**Learning:** Computing categories via `.filter().length` in a JSX mapping iterates through an array $O(C \times N)$ times where $C$ is the number of categories.
**Action:** Use a single `reduce` or `for` loop wrapped in `React.useMemo` to consolidate counts into an object in $O(N)$ time.
