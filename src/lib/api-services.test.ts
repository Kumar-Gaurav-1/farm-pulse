import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { ApiServices } from './api-services';

describe('ApiServices', () => {
  describe('getExchangeRates', () => {
    it('should return valid rate on successful fetch', async () => {
      // Mock global fetch
      const originalFetch = global.fetch;
      mock.method(global, 'fetch', async () => {
        return {
          json: async () => ({ rates: { EUR: 0.85 } })
        };
      });

      const result = await ApiServices.getExchangeRates('USD', 'EUR');

      assert.strictEqual(result.rate, 0.85);
      assert.strictEqual(result.base, 'USD');
      assert.strictEqual(result.target, 'EUR');
      assert.strictEqual(result.trend, 'up');

      mock.restoreAll();
    });

    it('should return fallback rate on fetch error', async () => {
      // Mock global fetch to throw error
      mock.method(global, 'fetch', () => {
        throw new Error('Network error');
      });

      const result = await ApiServices.getExchangeRates('USD', 'EUR');

      assert.strictEqual(result.rate, 0.92);
      assert.strictEqual(result.base, 'USD');
      assert.strictEqual(result.target, 'EUR');
      assert.strictEqual(result.trend, 'stable');

      mock.restoreAll();
    });
  });
});
