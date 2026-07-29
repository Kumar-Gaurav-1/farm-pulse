import { render, screen, waitFor } from '@testing-library/react';
import { FieldIntelligence } from '../FieldIntelligence';
import { ApiServices } from '@/lib/api-services';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import React from 'react';

vi.mock('@/lib/api-services', () => ({
  ApiServices: {
    getFieldNDVI: vi.fn(),
    getYieldBenchmarks: vi.fn(),
  },
}));

describe('FieldIntelligence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles API errors gracefully and resolves loading state', async () => {
    // Mock the API to throw an error
    (ApiServices.getFieldNDVI as any).mockRejectedValueOnce(new Error('Network failure'));
    (ApiServices.getYieldBenchmarks as any).mockResolvedValueOnce({ percentile: 90 });

    render(<FieldIntelligence fieldId="test-field-1" onBack={() => {}} />);

    // Initially loading state (doesn't explicitly show a loading spinner in the UI but data fetch begins)
    // We expect the console.error to be called because of the error in fetch
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Context Data Fetch Error:',
        expect.any(Error)
      );
    });

    // We can also verify that the component is still rendered without crashing
    expect(screen.getByText('Temporal Vigor Analysis')).toBeInTheDocument();
  });
});
