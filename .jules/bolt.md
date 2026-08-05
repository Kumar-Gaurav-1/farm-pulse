
## 2024-05-24 - Passing state setters directly to child components
**Learning:** In React, passing state setters (e.g. `setIsDiagnosing`) directly as props instead of wrapping them in inline arrow functions (e.g. `(id) => setIsDiagnosing(id)`) preserves the setter's stable identity. This prevents the child component from re-rendering unnecessarily if it is wrapped in `React.memo()`. Inline functions defeat the shallow equality check of `memo()`.
**Action:** Always pass the state setter function directly to child components instead of wrapping them in an inline function, and wrap the child in `memo()` to optimize re-renders.
