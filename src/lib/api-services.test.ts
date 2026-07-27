import test, { describe, mock, afterEach } from 'node:test';
import assert from 'node:assert';
import { ApiServices } from './api-services';

describe('ApiServices', () => {
  afterEach(() => {
    mock.restoreAll();
  });

  test('getFieldNDVI returns mock data', async () => {
    const result = await ApiServices.getFieldNDVI('field-123');
    assert.deepStrictEqual(result, {
      mean: 0.82,
      min: 0.65,
      max: 0.89,
      status: 'Optimal'
    });
  });

  test('getCarbonMetrics returns mock data', async () => {
    const result = await ApiServices.getCarbonMetrics('farm-123');
    assert.deepStrictEqual(result, {
      sequestrationRate: 2.4,
      totalFootprint: 142.5,
      netImpact: -12.4,
      complianceScore: 94
    });
  });

  test('getDeadlines returns mock data', async () => {
    const result = await ApiServices.getDeadlines();
    assert.deepStrictEqual(result, [
      { date: '2024-07-01', name: 'EU Organic Compliance Deadline', type: 'Regulatory' },
      { date: '2024-07-15', name: 'USDA Crop Reporting Cycle', type: 'Administrative' },
      { date: '2024-08-10', name: 'Global Wheat Futures Expiration', type: 'Market' }
    ]);
  });

  test('getYieldBenchmarks returns mock data', async () => {
    const result = await ApiServices.getYieldBenchmarks('corn', 'midwest');
    assert.deepStrictEqual(result, {
      regionalAverage: 178.5,
      percentile: 88,
      unit: 'bu/ac'
    });
  });

  test('getComplianceStandards returns mock data', async () => {
    const result = await ApiServices.getComplianceStandards('grain');
    assert.deepStrictEqual(result, {
      label: 'Eco-Score A',
      certifications: ['Fair Trade', 'EU Organic', 'Rainforest Alliance'],
      traceabilityScore: 0.98
    });
  });

  describe('getExchangeRates', () => {
    test('returns successful fetch data', async () => {
      const mockResponse = {
        rates: { EUR: 0.85 }
      };

      const fetchMock = mock.method(global, 'fetch', async () => {
        return {
          json: async () => mockResponse
        } as Response;
      });

      const result = await ApiServices.getExchangeRates('USD', 'EUR');

      assert.deepStrictEqual(result, {
        rate: 0.85,
        base: 'USD',
        target: 'EUR',
        trend: 'up'
      });

      assert.strictEqual(fetchMock.mock.calls.length, 1);
      assert.strictEqual(fetchMock.mock.calls[0].arguments[0], 'https://api.frankfurter.app/latest?from=USD&to=EUR');
    });

    test('returns fallback data on fetch failure', async () => {
      const fetchMock = mock.method(global, 'fetch', async () => {
        throw new Error('Network error');
      });

      const result = await ApiServices.getExchangeRates('USD', 'EUR');

      assert.deepStrictEqual(result, {
        rate: 0.92,
        base: 'USD',
        target: 'EUR',
        trend: 'stable'
      });

      assert.strictEqual(fetchMock.mock.calls.length, 1);
    });
  });
});
