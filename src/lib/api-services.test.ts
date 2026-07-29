import { test, mock, afterEach } from 'node:test';
import * as assert from 'node:assert';
import { ApiServices } from './api-services';

test('ApiServices', async (t) => {
  afterEach(() => {
    mock.restoreAll();
  });

  await t.test('getExchangeRates returns fallback on fetch error', async () => {
    mock.method(global, 'fetch', mock.fn(() => Promise.reject(new Error('Network error'))));

    const result = await ApiServices.getExchangeRates('USD', 'EUR');

    assert.deepStrictEqual(result, {
      rate: 0.92,
      base: 'USD',
      target: 'EUR',
      trend: 'stable'
    });
  });

  await t.test('getExchangeRates returns data on successful fetch', async () => {
    const mockResponse = {
      json: async () => ({ rates: { EUR: 0.85 } })
    };
    mock.method(global, 'fetch', mock.fn(() => Promise.resolve(mockResponse)));

    const result = await ApiServices.getExchangeRates('USD', 'EUR');

    assert.deepStrictEqual(result, {
      rate: 0.85,
      base: 'USD',
      target: 'EUR',
      trend: 'up'
    });
  });
});
