import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnomalyDiagnosis } from './AnomalyDiagnosis';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { fieldAnomalyAnalysisRecommendation } from '@/ai/flows/field-anomaly-analysis-recommendation';

vi.mock('@/ai/flows/field-anomaly-analysis-recommendation', () => ({
  fieldAnomalyAnalysisRecommendation: vi.fn(),
}));

describe('AnomalyDiagnosis Error Paths', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays quota error when AI engine throws 429', async () => {
    const user = userEvent.setup();
    (fieldAnomalyAnalysisRecommendation as any).mockRejectedValue(new Error('API error 429: Too many requests'));

    render(<AnomalyDiagnosis fieldId="Field 1" onBack={vi.fn()} />);

    const textarea = screen.getAllByPlaceholderText(/Noticed localized yellowing/i)[0];
    await user.type(textarea, 'Yellow leaves');

    const button = screen.getAllByRole('button', { name: /Initiate AI Diagnosis/i })[0];
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Intelligence Engine is currently busy handling high regional demand. Please try again in a moment.')).toBeInTheDocument();
    });
  });

  it('displays generic error when AI engine throws an unknown error', async () => {
    const user = userEvent.setup();
    (fieldAnomalyAnalysisRecommendation as any).mockRejectedValue(new Error('Network failure'));

    render(<AnomalyDiagnosis fieldId="Field 1" onBack={vi.fn()} />);

    const textarea = screen.getAllByPlaceholderText(/Noticed localized yellowing/i)[0];
    await user.type(textarea, 'Yellow leaves');

    const button = screen.getAllByRole('button', { name: /Initiate AI Diagnosis/i })[0];
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Unable to synthesize diagnostic telemetry. Please check your connection.')).toBeInTheDocument();
    });
  });
});
