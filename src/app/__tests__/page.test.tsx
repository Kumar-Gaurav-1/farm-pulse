import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Dashboard from '../page'
import * as audioBriefingFlow from '@/ai/flows/audio-briefing-flow'

// Mock dependencies
vi.mock('@/ai/flows/audio-briefing-flow', () => ({
  generateAudioBriefing: vi.fn(),
}))

// Mock audio API
const mockPlay = vi.fn();
const mockLoad = vi.fn();
beforeEach(() => {
  window.HTMLMediaElement.prototype.play = mockPlay;
  window.HTMLMediaElement.prototype.load = mockLoad;
  vi.clearAllMocks();
});

describe('Dashboard Component', () => {
  it('should reset isBriefing state to false if generateAudioBriefing throws an error', async () => {
    // Arrange
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Generation failed');
    vi.mocked(audioBriefingFlow.generateAudioBriefing).mockRejectedValueOnce(mockError);

    render(<Dashboard />);

    // Find the audio briefing button
    const audioButton = screen.getByRole('button', { name: /Listen to Briefing/i });

    expect(audioButton).not.toBeNull();
    expect(audioButton).not.toBeDisabled();

    // Act
    fireEvent.click(audioButton);

    // Assert
    // 1. Should be disabled while generating (isBriefing = true)
    expect(audioButton).toBeDisabled();

    // 2. Wait for the error to be thrown and caught
    await waitFor(() => {
      expect(audioBriefingFlow.generateAudioBriefing).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith("Audio Briefing Error:", mockError);
    });

    // 3. Should be enabled again (isBriefing = false) in the finally block
    expect(audioButton).not.toBeDisabled();

    consoleErrorSpy.mockRestore();
  });
});
