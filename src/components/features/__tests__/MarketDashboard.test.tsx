import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarketDashboard } from '../MarketDashboard';
import * as marketFlows from '@/ai/flows/market-trend-synthesis-flow';
import { ApiServices } from '@/lib/api-services';

// Mock dependencies
vi.mock('@/ai/flows/market-trend-synthesis-flow');
vi.mock('@/lib/api-services');

describe('MarketDashboard Error Handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the correct error message when the API returns a 429 quota error', async () => {
    // Mock to throw an error with message '429'
    vi.mocked(marketFlows.marketTrendSynthesis).mockRejectedValueOnce(new Error('API returned 429 quota exceeded'));
    vi.mocked(ApiServices.getExchangeRates).mockResolvedValueOnce({ base: 'USD', target: 'EUR', rate: 0.85, trend: "up" });
    vi.mocked(ApiServices.getDeadlines).mockResolvedValueOnce([]);

    render(<MarketDashboard />);

    // Wait for the component to catch the error and display the specific text
    await waitFor(() => {
      expect(screen.getByText('Market Analysis Engine is currently busy handling high regional demand. Please try again in a moment.')).toBeInTheDocument();
    });
  });

  it('displays the general error message when the API returns another error', async () => {
    // Mock to throw an error with another message
    vi.mocked(marketFlows.marketTrendSynthesis).mockRejectedValueOnce(new Error('Network error'));
    vi.mocked(ApiServices.getExchangeRates).mockResolvedValueOnce({ base: 'USD', target: 'EUR', rate: 0.85, trend: "up" });
    vi.mocked(ApiServices.getDeadlines).mockResolvedValueOnce([]);

    render(<MarketDashboard />);

    // Wait for the component to catch the error and display the specific text
    await waitFor(() => {
      expect(screen.getByText('Unable to synthesize global economic vectors. Please check your connection.')).toBeInTheDocument();
    });
  });
});
