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

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const exchangeRateCache = new Map<string, CacheEntry<CurrencyImpact>>();
const exchangeRateActivePromises = new Map<string, Promise<CurrencyImpact>>();
const EXCHANGE_RATE_TTL = 5 * 60 * 1000; // 5 minutes

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
   * ⚡ Bolt: Implemented module-scoped Promise cache to prevent redundant API calls
   */
  getExchangeRates(from: string = 'USD', to: string = 'EUR'): Promise<CurrencyImpact> {
    const key = `${from}-${to}`;

    // 1. Check if we have valid cached data
    const cached = exchangeRateCache.get(key);
    if (cached && Date.now() - cached.timestamp < EXCHANGE_RATE_TTL) {
      return Promise.resolve(cached.data);
    }

    // 2. Check if a fetch is already in progress
    const activePromise = exchangeRateActivePromises.get(key);
    if (activePromise) {
      return activePromise;
    }

    // 3. Initiate fetch and cache the promise
    const fetchPromise = fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const result: CurrencyImpact = {
          rate: data.rates[to],
          base: from,
          target: to,
          trend: 'up' as const
        };
        // Store in final cache and clean up active promise
        exchangeRateCache.set(key, { data: result, timestamp: Date.now() });
        exchangeRateActivePromises.delete(key);
        return result;
      })
      .catch(e => {
        // Clean up on failure to allow retries
        exchangeRateActivePromises.delete(key);
        // Return fallback
        return { rate: 0.92, base: from, target: to, trend: 'stable' as const };
      });

    exchangeRateActivePromises.set(key, fetchPromise);
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
