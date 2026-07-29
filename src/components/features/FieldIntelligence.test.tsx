import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { FieldIntelligence } from './FieldIntelligence';
import { ApiServices } from '@/lib/api-services';
import { vi } from 'vitest';

// Mock the Recharts library as it uses ResizeObserver and might cause issues in jsdom
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  AreaChart: () => <div data-testid="area-chart">AreaChart</div>,
  Area: () => <div>Area</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

// Mock ApiServices
vi.mock('@/lib/api-services', () => ({
  ApiServices: {
    getFieldNDVI: vi.fn(),
    getYieldBenchmarks: vi.fn(),
  },
}));

describe('FieldIntelligence Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('handles error path when context data fetch fails', async () => {
    // Suppress console.error for this specific test as we expect it
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const mockOnBack = vi.fn();

    // Setup ApiServices mock to throw an error
    const testError = new Error('Test API Failure');
    (ApiServices.getFieldNDVI as any).mockRejectedValueOnce(testError);
    (ApiServices.getYieldBenchmarks as any).mockResolvedValueOnce({ percentile: 90 });

    render(<FieldIntelligence fieldId="test-field-123" onBack={mockOnBack} />);

    // Verify it doesn't crash and console.error was called with the error
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Context Data Fetch Error:', testError);
    });

    // Verify it renders the "Authorize Nitrogen Boost" button (component loaded despite error)
    expect(screen.getByText(/Authorize Nitrogen Boost/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
