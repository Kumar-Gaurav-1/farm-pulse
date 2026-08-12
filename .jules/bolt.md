## Performance Optimizations

### Date: 2024-05-24
### Title: Memoize API Calls for SustainabilityDashboard
### Learning: When multiple components make the same expensive API calls on mount, caching the results can significantly reduce redundant network requests and improve load times.
### Action: Implemented a simple in-memory cache wrapper in `src/lib/api-services.ts` (or within the component) to memoize `ApiServices.getCarbonMetrics` and `ApiServices.getComplianceStandards` to avoid re-fetching data when the component unmounts and remounts.
