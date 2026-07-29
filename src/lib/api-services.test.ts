import { test, describe, afterEach, mock } from 'node:test';
import assert from 'node:assert';
import { ApiServices } from './api-services';

describe('ApiServices', () => {
  afterEach(() => {
    mock.restoreAll();
  });

  describe('getExchangeRates', () => {
    test('returns default fallback object when fetch rejects', async () => {
      mock.method(global, 'fetch', mock.fn<typeof fetch>(async () => {
        throw new Error('Network error');
      }));

      const result = await ApiServices.getExchangeRates('USD', 'EUR');

      assert.deepStrictEqual(result, {
        rate: 0.92,
        base: 'USD',
        target: 'EUR',
        trend: 'stable'
      });
    });

    test('returns default fallback object when fetch rejects (default params)', async () => {
      mock.method(global, 'fetch', mock.fn<typeof fetch>(async () => {
        throw new Error('Network error');
      }));

      const result = await ApiServices.getExchangeRates();

      assert.deepStrictEqual(result, {
        rate: 0.92,
        base: 'USD',
        target: 'EUR',
        trend: 'stable'
      });
    });
  });
});
