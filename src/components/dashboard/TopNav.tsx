import React from 'react';
import { Search, User, LogOut, ChevronDown, MapPin, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { PROPERTIES, type PropertyContext } from '@/lib/locations';

interface TopNavProps {
  currentLocation: PropertyContext;
  onLocationChange: (location: PropertyContext) => void;
}

// ⚡ Bolt: Memoize TopNav to prevent re-renders when parent Dashboard state changes (e.g., activeTab)
// Expected Impact: Eliminates unnecessary header re-renders
export const TopNav = React.memo(function TopNav({ currentLocation, onLocationChange }: TopNavProps) {
  return (
    <header className="h-20 border-b bg-background/50 backdrop-blur-3xl flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-8 flex-1">
        <SidebarTrigger className="md:hidden" />
        
        {/* Farm Switcher - Apple Style */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-12 px-5 rounded-2xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border transition-all flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Context</span>
                <span className="text-sm font-bold tracking-tight">{currentLocation.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 rounded-[1.5rem] p-2">
            <DropdownMenuLabel className="font-headline px-4 py-3">Switch Property</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {PROPERTIES.map((prop) => (
              <DropdownMenuItem 
                key={prop.id} 
                onClick={() => onLocationChange(prop)}
                className="p-4 rounded-xl cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-bold">{prop.name}</span>
                  <span className="text-xs text-muted-foreground">{prop.type}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
          <Input 
            placeholder="Search telemetry, market signals, or reports..." 
            className="pl-12 bg-muted/20 border-none focus-visible:ring-1 focus-visible:ring-primary h-12 rounded-2xl"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-muted/20 relative group">
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <div className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full border-2 border-background animate-pulse" />
        </Button>

        <div className="h-8 w-px bg-border/40 hidden md:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent flex items-center gap-4 group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold font-body leading-none tracking-tight">John Cooper</p>
                <p className="text-[10px] font-black text-primary uppercase mt-1 tracking-widest">Master Agronomist</p>
              </div>
              <Avatar className="h-12 w-12 border-2 border-primary/10 shadow-xl group-hover:scale-105 transition-transform">
                <AvatarImage src="https://picsum.photos/seed/user1/100/100" />
                <AvatarFallback className="font-bold">JC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 rounded-[1.5rem] p-2">
            <DropdownMenuLabel className="font-headline px-4 py-3">Operational Identity</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-4 rounded-xl cursor-pointer gap-4">
              <User className="w-4 h-4" />
              <span className="font-bold">Security Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-4 rounded-xl cursor-pointer gap-4 text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4" />
              <span className="font-bold">End Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
});
