## 2024-05-15 - [Initial]
**Learning:** Initial setup
**Action:** Ready to optimize

## 2024-09-26 - [TTL-based Promise Cache for fetch]
**Learning:** When adding a module-level cache for functions returning `fetch` promises, removing the `async` keyword allows returning the promise directly, avoiding a microtask delay. Also, catching network failures to delete the active promise ensures temporary fetch errors aren't permanently cached.
**Action:** Always map active promise caches alongside resolved caches with a TTL, and explicitly delete active failed requests to unblock immediate subsequent retries.
