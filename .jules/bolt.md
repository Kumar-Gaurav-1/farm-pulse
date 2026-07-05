## Date: 2024-05-24
## Title: Optimizing Node.js Audio Buffer Manipulation
## Learning:
When dealing with audio streams or generic raw binary conversions in Node.js, the overhead of stream pipelines (specifically Node core streams emitting 'data' and 'end' events continuously for chunks) can severely block the Event Loop for long buffers. Writing the proper byte specification format directly into a buffer synchronously avoids async overhead when the entire buffer is already available in memory.
## Action:
Replaced the Node.js `wav` package stream processing implementation with a 44-byte raw `Buffer.alloc` header and a synchronous `Buffer.concat([header, pcmData])`. This resulted in a ~7X speedup (from 1.28s to ~188ms) while creating the correct format efficiently without external dependencies.
