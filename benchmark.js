const { performance } = require('perf_hooks');

const generateNotifications = (count) => {
  const types = ['weather', 'market', 'field', 'system'];
  const notifications = [];
  for (let i = 0; i < count; i++) {
    notifications.push({
      type: types[Math.floor(Math.random() * types.length)]
    });
  }
  return notifications;
};

const runBenchmark = (notifications) => {
  const ITERATIONS = 1000;

  // Baseline
  let startBaseline = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    const result = [
      { label: 'Weather', count: notifications.filter(n => n.type === 'weather').length },
      { label: 'Field Health', count: notifications.filter(n => n.type === 'field').length },
      { label: 'Market Signals', count: notifications.filter(n => n.type === 'market').length },
      { label: 'System Logs', count: notifications.filter(n => n.type === 'system').length },
    ];
  }
  let endBaseline = performance.now();
  const baselineTime = endBaseline - startBaseline;

  // Optimized
  let startOptimized = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    const counts = notifications.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, { weather: 0, field: 0, market: 0, system: 0 });

    const result = [
      { label: 'Weather', count: counts.weather },
      { label: 'Field Health', count: counts.field },
      { label: 'Market Signals', count: counts.market },
      { label: 'System Logs', count: counts.system },
    ];
  }
  let endOptimized = performance.now();
  const optimizedTime = endOptimized - startOptimized;

  console.log(`Array length: ${notifications.length}, Iterations: ${ITERATIONS}`);
  console.log(`Baseline time: ${baselineTime.toFixed(2)}ms`);
  console.log(`Optimized time: ${optimizedTime.toFixed(2)}ms`);
  console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}% faster`);
};

runBenchmark(generateNotifications(100));
runBenchmark(generateNotifications(1000));
runBenchmark(generateNotifications(10000));
