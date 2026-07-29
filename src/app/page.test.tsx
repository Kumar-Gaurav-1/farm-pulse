import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from './page';
import { generateAudioBriefing } from '@/ai/flows/audio-briefing-flow';

vi.mock('@/ai/flows/audio-briefing-flow', () => ({
  generateAudioBriefing: vi.fn(),
}));

// Mock Recharts ResponsiveContainer to avoid issues in JSDOM
vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('recharts')>();
  return {
    ...actual,
    ResponsiveContainer: ({ children }: any) => (
      <div style={{ width: '100%', height: 300 }}>{children}</div>
    ),
  };
});

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    global.IntersectionObserver = class {
      root = null;
      rootMargin = '';
      thresholds = [];
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
    } as unknown as typeof IntersectionObserver;
  });

  it('handles Audio Briefing error gracefully and unlocks the UI', async () => {
    const mockError = new Error('Audio generation failed');
    vi.mocked(generateAudioBriefing).mockRejectedValueOnce(mockError);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Dashboard />);

    const briefingButton = await screen.findByRole('button', { name: /Listen to Briefing/i });
    expect(briefingButton).not.toBeDisabled();

    fireEvent.click(briefingButton);

    // Initial click disables the button
    expect(briefingButton).toBeDisabled();

    // Wait for the try/catch/finally block to execute
    await waitFor(() => {
      expect(briefingButton).not.toBeDisabled();
    });

    expect(generateAudioBriefing).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Audio Briefing Error:', mockError);

    consoleSpy.mockRestore();
  });
});
