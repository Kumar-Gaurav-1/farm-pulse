"use client";

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CloudRain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Filter,
  Trash2,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'weather' | 'market' | 'field' | 'system';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'field',
    title: 'High Blight Risk Detected',
    message: 'North Meadow Sector F4 shows 84% probability of early blight. Immediate inspection recommended.',
    time: '12m ago',
    priority: 'high',
    read: false,
  },
  {
    id: '2',
    type: 'weather',
    title: 'Extreme Heat Warning',
    message: 'Temperatures expected to exceed 35°C today. Adjust irrigation cycles for North and Valley sectors.',
    time: '2h ago',
    priority: 'high',
    read: false,
  },
  {
    id: '3',
    type: 'market',
    title: 'Wheat Futures Up +2.4%',
    message: 'Market synthesis suggests a selling window for remaining 2023 inventory.',
    time: '5h ago',
    priority: 'medium',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Irrigation Cycle Complete',
    message: 'Valley Flat irrigation cycle finished successfully. 12,400L delivered.',
    time: 'Yesterday',
    priority: 'low',
    read: true,
  },
];

export function AlertCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="page-transition space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-headline font-bold tracking-tighter italic">Operational Notifications</h2>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest opacity-60">System-wide critical events & insights</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-muted/30 p-1.5 rounded-2xl border border-border/40">
            <Button 
              variant={filter === 'all' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setFilter('all')}
              className="rounded-xl px-6 h-10 text-[10px] font-black uppercase tracking-widest"
            >
              All
            </Button>
            <Button 
              variant={filter === 'unread' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setFilter('unread')}
              className="rounded-xl px-6 h-10 text-[10px] font-black uppercase tracking-widest"
            >
              Unread
            </Button>
          </div>
          <Button variant="ghost" onClick={markAllAsRead} className="apple-btn text-[10px] font-black uppercase tracking-widest text-primary">
            Mark all read
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          {filteredNotifications.length === 0 ? (
            <Card className="border-none glass-card rounded-[3.5rem] p-24 text-center">
              <div className="space-y-6">
                <div className="p-8 rounded-full bg-muted/20 inline-block">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground/20" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold text-muted-foreground">Clear Skies</h3>
                  <p className="text-sm text-muted-foreground font-medium italic">No active alerts requiring immediate intervention.</p>
                </div>
              </div>
            </Card>
          ) : (
            filteredNotifications.map((notif) => (
              <Card 
                key={notif.id} 
                className={cn(
                  "border-none rounded-[2.5rem] transition-all duration-500 group relative overflow-hidden",
                  notif.read ? "glass-card opacity-80" : "bg-white shadow-2xl ring-1 ring-primary/10"
                )}
              >
                {!notif.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                )}
                <CardContent className="p-10 flex items-start gap-8">
                  <div className={cn(
                    "p-5 rounded-[1.5rem] flex-shrink-0 transition-transform group-hover:scale-110",
                    notif.type === 'weather' ? "bg-blue-500/10 text-blue-600" :
                    notif.type === 'market' ? "bg-orange-500/10 text-orange-600" :
                    notif.type === 'field' ? "bg-red-500/10 text-red-600" : "bg-primary/10 text-primary"
                  )}>
                    {notif.type === 'weather' ? <CloudRain className="w-6 h-6" /> :
                     notif.type === 'market' ? <TrendingUp className="w-6 h-6" /> :
                     notif.type === 'field' ? <AlertTriangle className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-bold tracking-tight">{notif.title}</h4>
                        {notif.priority === 'high' && (
                          <Badge variant="destructive" className="bg-red-500 text-white border-none text-[9px] uppercase tracking-widest font-black py-0.5 px-3">CRITICAL</Badge>
                        )}
                      </div>
                      <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {notif.time}
                      </span>
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed font-medium">
                      {notif.message}
                    </p>
                    <div className="pt-6 flex items-center gap-6">
                      <Button variant="ghost" className="apple-btn p-0 h-auto font-black text-[11px] uppercase tracking-widest text-primary flex items-center gap-2">
                        View Details <ChevronRight className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => deleteNotification(notif.id)}
                        className="apple-btn p-0 h-auto font-black text-[11px] uppercase tracking-widest text-muted-foreground/40 hover:text-destructive"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="lg:col-span-4 space-y-12">
          <Card className="border-none glass-card rounded-[3.5rem] p-12 shadow-xl">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-2xl font-headline font-bold italic tracking-tight">Alert Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              {[
                { label: 'Weather', count: notifications.filter(n => n.type === 'weather').length, color: 'bg-blue-500' },
                { label: 'Field Health', count: notifications.filter(n => n.type === 'field').length, color: 'bg-red-500' },
                { label: 'Market Signals', count: notifications.filter(n => n.type === 'market').length, color: 'bg-orange-500' },
                { label: 'System Logs', count: notifications.filter(n => n.type === 'system').length, color: 'bg-primary' },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-muted/20 rounded-[1.75rem] hover:bg-white transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                    <span className="font-bold text-sm">{cat.label}</span>
                  </div>
                  <Badge variant="outline" className="rounded-full border-muted text-[10px] font-black group-hover:bg-primary group-hover:text-white transition-colors">{cat.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none bg-primary text-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-[4000ms]">
              <Bell className="w-48 h-48" />
            </div>
            <h3 className="font-headline font-bold text-2xl mb-6 italic tracking-tight relative z-10">Smart Digest</h3>
            <p className="text-lg text-white/80 leading-relaxed font-medium relative z-10">
              You had <span className="text-white font-black underline">2 critical alerts</span> today. Strategic focus should remain on <span className="text-white font-black">North Meadow Sector F4</span> for blight mitigation.
            </p>
            <Button className="apple-btn w-full mt-10 bg-white text-primary hover:bg-white/90 rounded-full h-16 font-black uppercase tracking-widest text-[10px] relative z-10">
              Download Full Intel Report
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
