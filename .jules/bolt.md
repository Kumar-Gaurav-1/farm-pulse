Date: 2024-08-12
Title: Caching React useEffect data fetching
Learning: Uncached data fetching in useEffect causes redundant network requests and performance overhead when components unmount and remount.
Action: Implemented a module-level promise cache to store the fetched data and reuse it across component mounts.
