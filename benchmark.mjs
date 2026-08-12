import { performance } from 'perf_hooks';

const notifications = Array.from({ length: 10000 }).map((_, i) => ({
  type: ['weather', 'market', 'field', 'system'][i % 4]
}));

// Warmup
for (let i = 0; i < 10; i++) {
    notifications.filter(n => n.type === 'weather');
}

// Baseline (Filtering 4 times per render)
const startBaseline = performance.now();
for (let i = 0; i < 100; i++) {
  const categories = [
    { label: 'Weather', count: notifications.filter(n => n.type === 'weather').length, color: 'bg-blue-500' },
    { label: 'Field Health', count: notifications.filter(n => n.type === 'field').length, color: 'bg-red-500' },
    { label: 'Market Signals', count: notifications.filter(n => n.type === 'market').length, color: 'bg-orange-500' },
    { label: 'System Logs', count: notifications.filter(n => n.type === 'system').length, color: 'bg-primary' },
  ];
}
const endBaseline = performance.now();
console.log(`Baseline (4x filter): ${(endBaseline - startBaseline).toFixed(2)} ms`);

// Optimized (Single pass count)
const startOptimized = performance.now();
for (let i = 0; i < 100; i++) {
  const counts = { weather: 0, field: 0, market: 0, system: 0 };
  for (let j = 0; j < notifications.length; j++) {
    counts[notifications[j].type]++;
  }
  const categories = [
    { label: 'Weather', count: counts.weather, color: 'bg-blue-500' },
    { label: 'Field Health', count: counts.field, color: 'bg-red-500' },
    { label: 'Market Signals', count: counts.market, color: 'bg-orange-500' },
    { label: 'System Logs', count: counts.system, color: 'bg-primary' },
  ];
}
const endOptimized = performance.now();
console.log(`Optimized (1x pass): ${(endOptimized - startOptimized).toFixed(2)} ms`);
