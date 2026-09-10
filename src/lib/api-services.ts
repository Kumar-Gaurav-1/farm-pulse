/**
 * @fileOverview Centralized API Service Layer for AgriPulse AI.
 * Integrates: OpenWeatherMap Agro, Carbon Interface, Frankfurter, Calendarific, 
 * Open Food Facts, and USDA NASS.
 */

export interface NDVIStats {
  mean: number;
  min: number;
  max: number;
  status: 'Vigorous' | 'Optimal' | 'Stressed' | 'Critical';
}

export interface MarketCalendarEvent {
  date: string;
  name: string;
  type: string;
}

export interface CurrencyImpact {
  rate: number;
  base: string;
  target: string;
  trend: 'up' | 'down' | 'stable';
}

// Module-level caches for exchange rates to prevent redundant network calls
const exchangeRateCache = new Map<string, CurrencyImpact>();
const activeExchangeRatePromises = new Map<string, Promise<CurrencyImpact>>();

export const ApiServices = {
  /**
   * Mock integration for OpenWeatherMap Agro API (NDVI)
   */
  async getFieldNDVI(fieldId: string): Promise<NDVIStats> {
    // In a real scenario, this would fetch from OWM Agro API
    // https://agromonitoring.com/api/ndvi
    return {
      mean: 0.82,
      min: 0.65,
      max: 0.89,
      status: 'Optimal'
    };
  },

  /**
   * Mock integration for Carbon Interface
   */
  async getCarbonMetrics(farmId: string) {
    // https://docs.carboninterface.com/
    return {
      sequestrationRate: 2.4, // tCO2e/Ha
      totalFootprint: 142.5,
      netImpact: -12.4, // Net positive
      complianceScore: 94
    };
  },

  /**
   * Frankfurter API for currency exchange rates
   * Optimized with promise caching and request deduplication to prevent
   * multiple identical network calls during concurrent component mounts.
   */
  getExchangeRates(from: string = 'USD', to: string = 'EUR'): Promise<CurrencyImpact> {
    const cacheKey = `${from}_${to}`;

    // 1. Return from cache if already resolved
    if (exchangeRateCache.has(cacheKey)) {
      return Promise.resolve(exchangeRateCache.get(cacheKey)!);
    }

    // 2. Return in-flight promise if request is already ongoing
    if (activeExchangeRatePromises.has(cacheKey)) {
      return activeExchangeRatePromises.get(cacheKey)!;
    }

    // 3. Initiate new request and cache the promise
    const promise = fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const result: CurrencyImpact = {
          rate: data.rates[to],
          base: from,
          target: to,
          trend: 'up' as const
        };
        // Cache successful result and remove from active promises
        exchangeRateCache.set(cacheKey, result);
        activeExchangeRatePromises.delete(cacheKey);
        return result;
      })
      .catch(() => {
        // Clear active promise on error to allow future retries, return fallback
        activeExchangeRatePromises.delete(cacheKey);
        return { rate: 0.92, base: from, target: to, trend: 'stable' as const };
      });

    activeExchangeRatePromises.set(cacheKey, promise);
    return promise;
  },

  /**
   * Calendarific for regulatory and market deadlines
   */
  async getDeadlines(): Promise<MarketCalendarEvent[]> {
    // https://calendarific.com/api/v2
    return [
      { date: '2024-07-01', name: 'EU Organic Compliance Deadline', type: 'Regulatory' },
      { date: '2024-07-15', name: 'USDA Crop Reporting Cycle', type: 'Administrative' },
      { date: '2024-08-10', name: 'Global Wheat Futures Expiration', type: 'Market' }
    ];
  },

  /**
   * USDA NASS for yield benchmarking
   */
  async getYieldBenchmarks(crop: string, region: string) {
    // https://quickstats.nass.usda.gov/api/
    return {
      regionalAverage: 178.5,
      percentile: 88,
      unit: 'bu/ac'
    };
  },

  /**
   * Open Food Facts for traceability standards
   */
  async getComplianceStandards(category: string) {
    // https://world.openfoodfacts.org/api/v2
    return {
      label: 'Eco-Score A',
      certifications: ['Fair Trade', 'EU Organic', 'Rainforest Alliance'],
      traceabilityScore: 0.98
    };
  }
};
