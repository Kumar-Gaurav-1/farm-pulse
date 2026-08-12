import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarketDashboard } from './src/components/features/MarketDashboard';
import { ApiServices } from './src/lib/api-services';
import * as flow from './src/ai/flows/market-trend-synthesis-flow';
import userEvent from '@testing-library/user-event';

// Mock dependencies
vi.mock('./src/ai/flows/market-trend-synthesis-flow', () => ({
    marketTrendSynthesis: vi.fn()
}));

vi.mock('./src/lib/api-services', () => ({
    ApiServices: {
        getExchangeRates: vi.fn(),
        getDeadlines: vi.fn()
    }
}));

describe('MarketDashboard Performance Baseline', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        // Setup default mocks
        (flow.marketTrendSynthesis as any).mockResolvedValue({
            overallSummary: "Test Summary",
            priceTrends: [],
            exchangeRateImpact: "Test Impact",
            actionableInsights: [],
            marketEvents: []
        });

        (ApiServices.getExchangeRates as any).mockResolvedValue({
            rate: 1, base: 'USD', target: 'EUR', trend: 'stable'
        });

        (ApiServices.getDeadlines as any).mockResolvedValue([]);
    });

    it('measures network calls across remounts', async () => {
        // First mount
        const { unmount } = render(<MarketDashboard />);

        // Wait for first fetch to complete
        await waitFor(() => {
            expect(flow.marketTrendSynthesis).toHaveBeenCalledTimes(1);
        });

        const callCountAfterFirstMount = (flow.marketTrendSynthesis as any).mock.calls.length;
        console.log(`[Baseline] Calls after 1st mount: ${callCountAfterFirstMount}`);

        // Unmount (simulating user switching away from tab)
        unmount();

        // Remount (simulating user returning to tab)
        render(<MarketDashboard />);

        // Let event loop run to catch potential fetch
        await new Promise(r => setTimeout(r, 100));

        const callCountAfterSecondMount = (flow.marketTrendSynthesis as any).mock.calls.length;
        console.log(`[Optimized] Calls after 2nd mount: ${callCountAfterSecondMount}`);

        // With optimization, it should call exactly once.
        expect(callCountAfterSecondMount).toBe(1);
        expect(callCountAfterSecondMount).toBe(callCountAfterFirstMount);
    });
});
