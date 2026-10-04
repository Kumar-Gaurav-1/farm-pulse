## 2024-03-24 - Deduplicating Concurrent API Requests
**Learning:** Simultaneous rendering of components making the same un-cached API calls can lead to redundant network requests, consuming unnecessary resources and potentially hitting API rate limits. Deduplicating these in-flight promises along with standard TTL caching prevents this race condition.
**Action:** Always maintain a map of active Promises for network requests alongside regular data caching when multiple components might request the same data simultaneously.
