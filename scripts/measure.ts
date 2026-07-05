import { marketTrendSynthesis } from '../src/ai/flows/market-trend-synthesis-flow';
import { ApiServices } from '../src/lib/api-services';

async function run() {
  const start = performance.now();
  await Promise.all([
    marketTrendSynthesis({
      cropType: "Wheat & Soybeans",
      location: "United States (Midwest)",
      recentMarketNews: "Exports to Europe increasing due to regional shortage. Logistics costs stabilizing."
    }),
    ApiServices.getExchangeRates('USD', 'EUR'),
    ApiServices.getDeadlines()
  ]);
  console.log(`Execution time: ${(performance.now() - start).toFixed(2)}ms`);
}

run();
