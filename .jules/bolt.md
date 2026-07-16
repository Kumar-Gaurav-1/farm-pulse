# Bolt Performance Optimizations

## Date: $(date +"%Y-%m-%d")
### Title: Memoize Tab Title String Manipulation
**Learning:** Performing multiple string manipulations (split, map, charAt, toUpperCase, slice, join) directly inside the render loop causes unnecessary CPU cycles on every render, even when the `activeTab` value hasn't changed.
**Action:** Extracted the tab title formatting logic into a `useMemo` hook (`formattedTabTitle`) dependent on `[activeTab]`. This ensures the string manipulation only runs when the tab actually changes, rather than on every re-render of the large `Dashboard` component.
