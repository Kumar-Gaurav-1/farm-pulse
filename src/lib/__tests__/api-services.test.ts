import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiServices } from '../api-services';

describe('ApiServices.getExchangeRates', () => {
  beforeEach(() => {
    // Save the original fetch
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    // Restore fetch to its original state
    vi.unstubAllGlobals();
  });

  it('should return exchange rates successfully when fetch resolves', async () => {
    // Mock the successful fetch response
    const mockResponse = {
      json: async () => ({ rates: { EUR: 0.85 } })
    };
    vi.mocked(fetch).mockResolvedValue(mockResponse as Response);

    const result = await ApiServices.getExchangeRates('USD', 'EUR');

    expect(fetch).toHaveBeenCalledWith('https://api.frankfurter.app/latest?from=USD&to=EUR');
    expect(result).toEqual({
      rate: 0.85,
      base: 'USD',
      target: 'EUR',
      trend: 'up'
    });
  });

  it('should fallback to default values when fetch throws an error', async () => {
    // Mock the fetch to throw an error
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    const result = await ApiServices.getExchangeRates('USD', 'EUR');

    expect(fetch).toHaveBeenCalledWith('https://api.frankfurter.app/latest?from=USD&to=EUR');
    // Ensure the fallback value from the catch block is returned
    expect(result).toEqual({
      rate: 0.92,
      base: 'USD',
      target: 'EUR',
      trend: 'stable'
    });
  });

  it('should fallback to default values when fetch throws an error with default arguments', async () => {
    // Mock the fetch to throw an error
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'));

    const result = await ApiServices.getExchangeRates();

    expect(fetch).toHaveBeenCalledWith('https://api.frankfurter.app/latest?from=USD&to=EUR');
    expect(result).toEqual({
      rate: 0.92,
      base: 'USD',
      target: 'EUR',
      trend: 'stable'
    });
  });
});
