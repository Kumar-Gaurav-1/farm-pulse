const notifications = Array.from({ length: 10000 }, (_, i) => ({
  type: ['weather', 'field', 'market', 'system'][Math.floor(Math.random() * 4)]
}));

console.time('filter');
for(let k=0; k<1000; k++) {
  const counts = {
    weather: notifications.filter(n => n.type === 'weather').length,
    field: notifications.filter(n => n.type === 'field').length,
    market: notifications.filter(n => n.type === 'market').length,
    system: notifications.filter(n => n.type === 'system').length,
  };
}
console.timeEnd('filter');

console.time('reduce');
for(let k=0; k<1000; k++) {
  const counts = notifications.reduce(
    (acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    },
    { weather: 0, field: 0, market: 0, system: 0 } as Record<string, number>
  );
}
console.timeEnd('reduce');
