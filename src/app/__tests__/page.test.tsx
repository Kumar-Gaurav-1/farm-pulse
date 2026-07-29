import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Dashboard from '../page';
import { generateAudioBriefing } from '@/ai/flows/audio-briefing-flow';

// Mock dependencies
vi.mock('@/components/ui/sidebar', () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SidebarInset: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock('@/components/dashboard/SidebarNav', () => ({ SidebarNav: () => <div>SidebarNav</div> }));
vi.mock('@/components/dashboard/TopNav', () => ({ TopNav: () => <div>TopNav</div> }));
vi.mock('@/components/features/AdvisoryDashboard', () => ({ AdvisoryDashboard: () => <div>AdvisoryDashboard</div> }));

vi.mock('@/ai/flows/audio-briefing-flow', () => ({
  generateAudioBriefing: vi.fn(),
}));

describe('Dashboard Component', () => {
  const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('handles Audio Briefing error correctly and unlocks UI', async () => {
    // Setup mock to throw an error
    const mockError = new Error('Audio generation failed');
    (generateAudioBriefing as any).mockRejectedValueOnce(mockError);

    render(<Dashboard />);

    // Find the button
    const button = screen.getByRole('button', { name: /Listen to Briefing/i });

    // Initial state check
    expect(button).not.toBeDisabled();

    // Click button to trigger audio briefing
    fireEvent.click(button);

    // Check loading state
    expect(button).toBeDisabled();

    // Wait for the async operation to complete and the finally block to execute
    await waitFor(() => {
      // The button should be re-enabled after the error is caught
      expect(button).not.toBeDisabled();
    });

    // Verify that console.error was called with the expected error
    expect(consoleErrorMock).toHaveBeenCalledWith('Audio Briefing Error:', mockError);
  });
});
