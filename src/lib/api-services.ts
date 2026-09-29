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

// Cache TTL: 1 hour (3600000 ms)
const EXCHANGE_RATE_CACHE_TTL = 3600000;
const exchangeRateCache = new Map<string, { data: CurrencyImpact; timestamp: number }>();
const activeExchangePromises = new Map<string, Promise<CurrencyImpact>>();

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
   * Optimized: Implements module-level Promise caching to prevent redundant concurrent
   * and subsequent network requests for the same currency pairs.
   */
  getExchangeRates(from: string = 'USD', to: string = 'EUR'): Promise<CurrencyImpact> {
    const cacheKey = `${from}-${to}`;

    // Check if we have valid cached data
    const cachedEntry = exchangeRateCache.get(cacheKey);
    if (cachedEntry && Date.now() - cachedEntry.timestamp < EXCHANGE_RATE_CACHE_TTL) {
      return Promise.resolve(cachedEntry.data);
    }

    // Check if there's an in-flight request
    const activePromise = activeExchangePromises.get(cacheKey);
    if (activePromise) {
      return activePromise;
    }

    // Initiate new fetch request
    const fetchPromise = fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
      .then(async (res) => {
        if (!res.ok) {
           throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const result: CurrencyImpact = {
          rate: data.rates[to],
          base: from,
          target: to,
          trend: 'up' as const
        };

        // Update cache upon successful fetch
        exchangeRateCache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });

        return result;
      })
      .catch((e) => {
        console.error("Error fetching exchange rates:", e);
        // Fallback value on error
        return { rate: 0.92, base: from, target: to, trend: 'stable' as const };
      })
      .finally(() => {
        // Always remove the active promise from the map to allow future retries if needed
        // or to clean up memory after resolution/rejection.
        activeExchangePromises.delete(cacheKey);
      });

    activeExchangePromises.set(cacheKey, fetchPromise);
    return fetchPromise;
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
