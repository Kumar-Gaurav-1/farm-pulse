import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiServices } from './api-services';

describe('ApiServices', () => {
  describe('getExchangeRates', () => {
    beforeEach(() => {
      vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    it('should return fetched exchange rates on success', async () => {
      const mockResponse = {
        rates: {
          EUR: 0.95
        }
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        json: async () => mockResponse
      } as Response);

      const result = await ApiServices.getExchangeRates('USD', 'EUR');

      expect(fetch).toHaveBeenCalledWith('https://api.frankfurter.app/latest?from=USD&to=EUR');
      expect(result).toEqual({
        rate: 0.95,
        base: 'USD',
        target: 'EUR',
        trend: 'up'
      });
    });

    it('should return fallback exchange rates on error', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

      const result = await ApiServices.getExchangeRates('USD', 'EUR');

      expect(fetch).toHaveBeenCalledWith('https://api.frankfurter.app/latest?from=USD&to=EUR');
      expect(result).toEqual({
        rate: 0.92,
        base: 'USD',
        target: 'EUR',
        trend: 'stable'
      });
    });
  });
});
