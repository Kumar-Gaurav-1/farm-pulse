import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Dashboard from './page';
import * as audioFlow from '@/ai/flows/audio-briefing-flow';

vi.mock('@/ai/flows/audio-briefing-flow', () => ({
  generateAudioBriefing: vi.fn(),
}));

vi.mock('@/components/ui/sidebar', () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-provider">{children}</div>,
  SidebarInset: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-inset">{children}</div>,
  Sidebar: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar">{children}</div>,
  SidebarHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-header">{children}</div>,
  SidebarContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-content">{children}</div>,
  SidebarGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group">{children}</div>,
  SidebarGroupContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group-content">{children}</div>,
  SidebarGroupLabel: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-group-label">{children}</div>,
  SidebarMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu">{children}</div>,
  SidebarMenuItem: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu-item">{children}</div>,
  SidebarMenuButton: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-menu-button">{children}</div>,
  SidebarFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="sidebar-footer">{children}</div>,
  SidebarTrigger: () => <button data-testid="sidebar-trigger">Toggle</button>,
  useSidebar: () => ({ setOpenMobile: vi.fn() })
}));

vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), { canScrollPrev: vi.fn(), canScrollNext: vi.fn() }]
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  AreaChart: () => <div>AreaChart</div>,
  Area: () => <div>Area</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

describe('Dashboard - Audio Briefing Error Path', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('unlocks UI when audio briefing generation throws an error', async () => {
    vi.mocked(audioFlow.generateAudioBriefing).mockRejectedValueOnce(new Error('Audio generation failed'));

    render(<Dashboard />);

    const button = screen.getByText('Listen to Briefing').closest('button');
    expect(button).not.toBeDisabled();

    fireEvent.click(button!);

    // UI should lock
    expect(button).toBeDisabled();

    // After the mocked error is thrown, the UI should unlock in the finally block
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    expect(console.error).toHaveBeenCalledWith('Audio Briefing Error:', expect.any(Error));
  });
});
