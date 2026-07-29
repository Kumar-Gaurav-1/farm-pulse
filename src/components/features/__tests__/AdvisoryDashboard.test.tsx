import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdvisoryDashboard } from '../AdvisoryDashboard';
import { contextualCropWeatherAdvisory } from '@/ai/flows/contextual-crop-weather-advisory';

vi.mock('@/ai/flows/contextual-crop-weather-advisory', () => ({
  contextualCropWeatherAdvisory: vi.fn(),
}));

describe('AdvisoryDashboard', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows quota error message on 429 error', async () => {
    (contextualCropWeatherAdvisory as any).mockRejectedValueOnce(new Error('API returned 429 Too Many Requests'));

    render(<AdvisoryDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Intelligence Engine is currently busy handling high regional demand/i)).toBeInTheDocument();
    });
  });

  it('shows generic network error message on other errors', async () => {
    (contextualCropWeatherAdvisory as any).mockRejectedValueOnce(new Error('Network offline'));

    render(<AdvisoryDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to synthesize environmental telemetry/i)).toBeInTheDocument();
    });
  });
});
