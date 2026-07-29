## 2024-07-29 - Stable References for State Setters
**Learning:** Passing inline arrow functions that merely invoke a React state setter (e.g., `(id) => setIsDiagnosing(id)`) defeats `React.memo` by generating a new function reference on every render, causing unnecessary re-renders of heavy child components like `FieldHealth`. State setters from `useState` already possess stable identities.
**Action:** Pass the state setter directly (e.g., `onDiagnose={setIsDiagnosing}`) and wrap the child component in `React.memo` to preserve its render bailout capability.
