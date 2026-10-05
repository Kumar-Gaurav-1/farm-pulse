## 2024-10-05 - [Module-level Promise Caching for Redundant API Calls]
**Learning:** [When multiple components or parallel requests fetch the same data simultaneously, a simple value cache is insufficient. Caching the active Promise prevents duplicate network requests and eliminates redundant processing overhead.]
**Action:** [Implement module-level Promise caching with a TTL/failure-clearing mechanism to deduplicate in-flight requests and safely cache successful responses.]
