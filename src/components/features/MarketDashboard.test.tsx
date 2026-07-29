import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarketDashboard } from './MarketDashboard';
import { marketTrendSynthesis } from '@/ai/flows/market-trend-synthesis-flow';
import { ApiServices } from '@/lib/api-services';

// Mock dependencies
vi.mock('@/ai/flows/market-trend-synthesis-flow', () => ({
  marketTrendSynthesis: vi.fn(),
}));

vi.mock('@/lib/api-services', () => ({
  ApiServices: {
    getExchangeRates: vi.fn(),
    getDeadlines: vi.fn(),
  },
}));

describe('MarketDashboard Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mocks for non-failing calls
    (ApiServices.getExchangeRates as any).mockResolvedValue({
      base: 'USD',
      target: 'EUR',
      rate: 0.92,
      trend: 'up'
    });

    (ApiServices.getDeadlines as any).mockResolvedValue([
      { date: 'Oct 15', name: 'Winter Wheat Planting', type: 'planting' }
    ]);
  });

  it('displays quota/429 error message when API returns 429 status', async () => {
    const error429 = new Error('Status 429: Too Many Requests');
    (marketTrendSynthesis as any).mockRejectedValueOnce(error429);

    render(<MarketDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Market Analysis Engine is currently busy handling high regional demand. Please try again in a moment.')).toBeInTheDocument();
    });
  });

  it('displays quota error message when API error includes quota', async () => {
    const errorQuota = new Error('Resource has been exhausted (e.g. check quota).');
    (marketTrendSynthesis as any).mockRejectedValueOnce(errorQuota);

    render(<MarketDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Market Analysis Engine is currently busy handling high regional demand. Please try again in a moment.')).toBeInTheDocument();
    });
  });

  it('displays general error message for other errors', async () => {
    const networkError = new Error('Network error');
    (marketTrendSynthesis as any).mockRejectedValueOnce(networkError);

    render(<MarketDashboard />);

    await waitFor(() => {
      expect(screen.getByText('Unable to synthesize global economic vectors. Please check your connection.')).toBeInTheDocument();
    });
  });
});
