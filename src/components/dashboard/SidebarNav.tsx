
import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  TrendingUp, 
  CloudSun, 
  Droplets, 
  Leaf, 
  Settings,
  Bell,
  Activity,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  { icon: LayoutDashboard, label: 'The Pulse', id: 'overview' },
  { icon: MapIcon, label: 'Field Health', id: 'field-health' },
  { icon: CloudSun, label: 'Climate Intel', id: 'weather' },
  { icon: TrendingUp, label: 'Market Hub', id: 'market' },
  { icon: Leaf, label: 'Sustainability', id: 'sustainability' },
  { icon: Droplets, label: 'Irrigation', id: 'irrigation' },
];

const secondaryItems = [
  { icon: Bell, label: 'Alert Center', id: 'notifications' },
  { icon: User, label: 'Farm Identity', id: 'settings' },
];

interface SidebarNavProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

// ⚡ Bolt Optimization: Wrap component in React.memo to prevent unnecessary re-renders when parent layout state changes.
export const SidebarNav = React.memo(function SidebarNav({ activeTab, onTabChange }: SidebarNavProps) {
  return (
    <Sidebar className="border-r border-border/40 bg-sidebar/30 backdrop-blur-3xl">
      <SidebarHeader className="p-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[1.25rem] bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/30">
            <Activity className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-bold text-2xl leading-none text-foreground tracking-tight">AgriPulse</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 mt-1.5">Intelligence</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-6 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 italic">Strategic Hub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                    tooltip={item.label}
                    className={cn(
                      "h-14 px-5 rounded-[1.25rem] transition-all duration-300 group",
                      activeTab === item.id 
                        ? "bg-white dark:bg-white/10 text-primary shadow-xl shadow-black/5 ring-1 ring-black/5" 
                        : "hover:bg-white/50 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-primary" : "text-primary/60")} />
                    <span className="font-bold text-[13px] tracking-tight">{item.label}</span>
                    {activeTab === item.id && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-8 border-t border-border/10">
        <SidebarMenu className="gap-2">
          {secondaryItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                onClick={() => onTabChange(item.id)}
                tooltip={item.label}
                className={cn(
                  "h-12 px-5 rounded-xl transition-all",
                  activeTab === item.id ? "bg-muted/50 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-bold text-[11px] tracking-widest uppercase">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
});
