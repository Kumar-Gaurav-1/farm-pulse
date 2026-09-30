## 2024-05-14 - React inline hook pattern violation
**Learning:** React hooks like `React.useCallback` should never be declared inline directly in JSX (e.g. `onTabChange={React.useCallback(...)}`). This violates rules of hooks, causing errors or un-optimized renders.
**Action:** Extract any inline handlers that require memoization into a `const handleSomething = React.useCallback(...)` block above the return statement.

## 2024-05-14 - Redundant API Calls on Re-mount
**Learning:** Fetching expensive data like `contextualCropWeatherAdvisory` directly in `useEffect` without caching causes redundant API calls whenever the component re-mounts (e.g. switching tabs). This degrades performance and wastes resources.
**Action:** Implement a module-level Promise cache for expensive API calls to prevent redundant network requests and improve perceived loading times.
