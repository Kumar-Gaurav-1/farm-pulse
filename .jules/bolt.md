## 2024-03-01
- **Title:** Cache API exchange rates
- **Learning:** When a React component makes multiple network requests due to unmounts/remounts and route changes, performance decreases. A simple module-level promise cache implementation stops redundant network requests.
- **Action:** Created an `exchangeRatesCache` in `src/lib/api-services.ts`, keyed by currency combinations. Decreased processing time for duplicate requests significantly.
