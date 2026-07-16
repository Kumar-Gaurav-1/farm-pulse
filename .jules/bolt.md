## Date
2024-05-24

## Title
LLM Advisory Caching

## Learning
Uncached LLM calls in React components run on every mount, resulting in slow load times (2-5 seconds) and unnecessary API costs.

## Action
Implemented a `localStorage` cache for `AdvisoryDashboard` with a 3-hour expiration to bypass the LLM call entirely for recent requests.
