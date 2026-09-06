Date: 2024-09-06
Title: Module-level Promise Caching
Learning: When implementing a module-level Promise cache for `fetch` requests, remember that `fetch` only rejects on network failures. You must explicitly check `!res.ok` and throw an error to ensure HTTP errors trigger your `.catch()` block. Always include error handling to clear or delete the cache entry if the promise rejects, preventing a failed request from being cached indefinitely and blocking future successful retries.
Action: Applied caching pattern to `getExchangeRates` to improve rendering performance on Dashboard.
