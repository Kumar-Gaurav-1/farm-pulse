## 2024-05-24
**Title**: Caching external APIs in Client Components
**Learning**: In Next.js client components, external static or slow API calls can cause unnecessary re-fetches and delays on mount or interactions if they are inside `useEffect` without any local caching. Re-fetching these every time causes duplicate network requests.
**Action**: Implement module-level variable caching with a Time-To-Live (TTL) for API calls that return mostly static data (like `ApiServices.getExchangeRates` and `ApiServices.getDeadlines`) to reduce duplicate network requests and improve performance on client component mounts/renders.
