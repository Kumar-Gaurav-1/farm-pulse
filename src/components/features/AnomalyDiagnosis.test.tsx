import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnomalyDiagnosis } from './AnomalyDiagnosis';
import { fieldAnomalyAnalysisRecommendation } from '@/ai/flows/field-anomaly-analysis-recommendation';

vi.mock('@/ai/flows/field-anomaly-analysis-recommendation', () => ({
  fieldAnomalyAnalysisRecommendation: vi.fn(),
}));

describe('AnomalyDiagnosis Error Paths', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('displays a rate limit error message when a 429 error occurs', async () => {
    vi.mocked(fieldAnomalyAnalysisRecommendation).mockRejectedValueOnce(new Error('429 Too Many Requests'));

    render(<AnomalyDiagnosis fieldId="Field-A" onBack={vi.fn()} />);

    const textarea = screen.getByPlaceholderText(/Noticed localized yellowing/i);
    fireEvent.change(textarea, { target: { value: 'Something is wrong' } });

    const diagnoseButton = screen.getByText('Initiate AI Diagnosis');
    fireEvent.click(diagnoseButton);

    await waitFor(() => {
      expect(screen.getByText('Intelligence Engine is currently busy handling high regional demand. Please try again in a moment.')).toBeInTheDocument();
    });
  });

  it('displays a generic error message for other errors', async () => {
    vi.mocked(fieldAnomalyAnalysisRecommendation).mockRejectedValueOnce(new Error('Network Error'));

    render(<AnomalyDiagnosis fieldId="Field-A" onBack={vi.fn()} />);

    const textarea = screen.getByPlaceholderText(/Noticed localized yellowing/i);
    fireEvent.change(textarea, { target: { value: 'Something is wrong' } });

    const diagnoseButton = screen.getByText('Initiate AI Diagnosis');
    fireEvent.click(diagnoseButton);

    await waitFor(() => {
      expect(screen.getByText('Unable to synthesize diagnostic telemetry. Please check your connection.')).toBeInTheDocument();
    });
  });
});
