import { performance } from 'perf_hooks';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  priority: string;
  read: boolean;
}

// Generate a large array of notifications
const NUM_ITEMS = 100000;
const notifications: Notification[] = Array.from({ length: NUM_ITEMS }, (_, i) => ({
  id: String(i),
  type: 'system',
  title: 'Test',
  message: 'Test message',
  time: 'Now',
  priority: 'low',
  read: i % 2 === 0, // Half are already read
}));

// Baseline: current implementation
function baseline() {
  return notifications.map(n => ({ ...n, read: true }));
}

// Optimized: skip already read items
function optimized() {
  return notifications.map(n => n.read ? n : { ...n, read: true });
}

// Warmup
for (let i = 0; i < 10; i++) {
  baseline();
  optimized();
}

// Measure Baseline
const baselineStart = performance.now();
for (let i = 0; i < 100; i++) {
  baseline();
}
const baselineEnd = performance.now();
const baselineTime = baselineEnd - baselineStart;

// Measure Optimized
const optimizedStart = performance.now();
for (let i = 0; i < 100; i++) {
  optimized();
}
const optimizedEnd = performance.now();
const optimizedTime = optimizedEnd - optimizedStart;

console.log(`Baseline (100 iterations, ${NUM_ITEMS} items): ${baselineTime.toFixed(2)} ms`);
console.log(`Optimized (100 iterations, ${NUM_ITEMS} items): ${optimizedTime.toFixed(2)} ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% faster`);
