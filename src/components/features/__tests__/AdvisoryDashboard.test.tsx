import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AdvisoryDashboard } from '../AdvisoryDashboard';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the AI flow function
vi.mock('@/ai/flows/contextual-crop-weather-advisory', () => ({
  contextualCropWeatherAdvisory: vi.fn(),
}));

import { contextualCropWeatherAdvisory } from '@/ai/flows/contextual-crop-weather-advisory';

// Mock Recharts to avoid ResizeObserver issues
vi.mock('recharts', async () => {
  const OriginalModule = await vi.importActual<typeof import('recharts')>('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  };
});

describe('AdvisoryDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays a rate limit error message when 429 quota error occurs', async () => {
    // Mock the API to throw a 429 error
    (contextualCropWeatherAdvisory as any).mockRejectedValue(new Error('API quota exceeded 429'));

    render(<AdvisoryDashboard />);

    // Check that it's initially loading
    expect(screen.getByText(/Synthesizing environmental telemetry/i)).toBeInTheDocument();

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Intelligence Engine is currently busy handling high regional demand. Please try again in a moment.')).toBeInTheDocument();
    });

    expect(contextualCropWeatherAdvisory).toHaveBeenCalledTimes(1);
  });

  it('displays a generic error message for other errors', async () => {
    // Mock the API to throw a generic network error
    (contextualCropWeatherAdvisory as any).mockRejectedValue(new Error('Network connection failed'));

    render(<AdvisoryDashboard />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Unable to synthesize environmental telemetry. Please check your connection.')).toBeInTheDocument();
    });

    expect(contextualCropWeatherAdvisory).toHaveBeenCalledTimes(1);
  });
});
