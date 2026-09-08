## 2025-02-12 - [Initial Setup]
**Learning:** Checking for .jules/bolt.md exists.
**Action:** None.

## 2025-02-12 - [Module-Level Promise Caching]
**Learning:** In Next.js/React applications, when fetching data outside of the React lifecycle (e.g., in a utility file like `api-services.ts`), consecutive mounting/rendering can cause redundant network requests. Caching the resolved data is not enough if requests happen concurrently (waterfalling). We must cache the *Promise* itself, returning the active Promise to subsequent callers before it resolves, ensuring only a single network request is fired.
**Action:** Implement a module-level Promise cache (along with a resolved data cache) for `ApiServices.getExchangeRates`.
