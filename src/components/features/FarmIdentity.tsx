"use client";

import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Settings, 
  Shield, 
  Database, 
  History, 
  Landmark, 
  ChevronRight,
  Sprout,
  Mail,
  Smartphone,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export const FarmIdentity = React.memo(function FarmIdentity() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  return (
    <div className="page-transition space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Core Identity Profile */}
        <div className="lg:col-span-4 space-y-12">
          <Card className="border-none glass-card rounded-[3.5rem] overflow-hidden shadow-2xl">
            <CardContent className="p-12 text-center space-y-8">
              <div className="relative inline-block">
                <Avatar className="h-40 w-40 mx-auto border-8 border-white shadow-2xl">
                  <AvatarImage src="https://picsum.photos/seed/user1/200/200" />
                  <AvatarFallback className="text-4xl font-bold">JC</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-full shadow-xl">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-headline font-bold tracking-tighter italic">John Cooper</h3>
                <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">Master Agronomist</p>
              </div>
              <div className="pt-8 border-t border-border/40 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 italic">Estate Rank</p>
                  <p className="font-bold text-xl">Platinum</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 italic">Member Since</p>
                  <p className="font-bold text-xl">2018</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Channel Notification Settings */}
          <Card className="border-none glass-card rounded-[3rem] p-10 shadow-xl">
            <h4 className="font-headline font-bold text-xl mb-8 italic flex items-center gap-4">
              <Bell className="w-6 h-6 text-primary" /> Notification Channels
            </h4>
            <div className="space-y-10">
               {[
                 { id: 'email', label: 'Email Advisory', sub: 'Weekly market news & reports', icon: Mail, active: notifications.email },
                 { id: 'sms', label: 'SMS Critical Alerts', sub: 'Immediate weather & field warnings', icon: Smartphone, active: notifications.sms },
                 { id: 'push', label: 'Push Intelligence', sub: 'Real-time telemetry updates', icon: Bell, active: notifications.push },
               ].map((channel, i) => (
                 <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-5">
                      <div className="p-3 rounded-xl bg-muted/30 text-muted-foreground">
                        <channel.icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm tracking-tight">{channel.label}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">{channel.sub}</span>
                      </div>
                   </div>
                   <Switch 
                     checked={channel.active} 
                     onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [channel.id]: checked }))}
                   />
                 </div>
               ))}
            </div>
          </Card>
        </div>

        {/* Farm Management Command */}
        <div className="lg:col-span-8 space-y-12">
          <Card className="border-none glass-card rounded-[3.5rem] p-12 shadow-2xl">
            <CardHeader className="p-0 mb-12">
              <CardTitle className="font-headline text-4xl font-bold tracking-tighter italic">Property Infrastructure</CardTitle>
              <CardDescription className="text-sm font-bold uppercase tracking-widest opacity-50 mt-1">Manage fields, boundaries & soil profiles</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-10">
               {[
                 { icon: MapPin, label: 'Field Boundaries', desc: '4 Active fields, 185.7 Total Ha', action: 'Manage Polygons' },
                 { icon: Sprout, label: 'Crop Inventory', desc: 'Corn, Wheat, Soy (Cycle 2024)', action: 'Update Genetics' },
                 { icon: Database, label: 'Soil Health Registry', desc: 'Clay-Loam, High Organic Matter', action: 'View Lab Data' },
                 { icon: Landmark, label: 'Legal & Compliance', desc: 'USDA & EU Export Registered', action: 'Audit Log' },
                 { icon: History, label: 'Operational Archive', desc: '5 Years of verified telemetry', action: 'Export CSV/PDF' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-8 bg-muted/20 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all group cursor-pointer border border-transparent hover:border-border/50">
                    <div className="flex items-center gap-8">
                       <div className="p-5 rounded-[1.5rem] bg-white shadow-sm text-primary group-hover:scale-110 transition-transform">
                         <item.icon className="w-7 h-7" />
                       </div>
                       <div>
                         <h4 className="font-bold text-xl tracking-tight">{item.label}</h4>
                         <p className="text-[12px] text-muted-foreground font-medium mt-1">{item.desc}</p>
                       </div>
                    </div>
                    <Button variant="ghost" className="apple-btn text-[10px] font-black uppercase tracking-[0.2em] text-primary group-hover:bg-primary/5 rounded-full px-8">
                      {item.action} <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                 </div>
               ))}
            </CardContent>
          </Card>
          
          {/* Quick System Diagnostics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="border-none glass-card rounded-[2.5rem] p-10">
               <h4 className="font-headline font-bold text-lg mb-6 italic">Operational Integrity</h4>
               <div className="space-y-4">
                 {[
                   { label: 'Cloud Sync', val: 'Operational', color: 'text-primary' },
                   { label: 'Edge Telemetry', val: 'Low Latency', color: 'text-primary' },
                   { label: 'API Context', val: 'Verified', color: 'text-primary' },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-[12px]">
                     <span className="font-bold opacity-50 italic">{item.label}</span>
                     <span className={cn("font-black uppercase tracking-widest", item.color)}>{item.val}</span>
                   </div>
                 ))}
               </div>
            </Card>
            <Card className="border-none glass-card rounded-[2.5rem] p-10">
               <h4 className="font-headline font-bold text-lg mb-6 italic">Data Sovereignty</h4>
               <div className="space-y-6">
                 <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">Your operational telemetry is encrypted and managed under sovereign farm control protocols.</p>
                 <Button variant="outline" className="apple-btn w-full rounded-full h-12 text-[10px] font-black uppercase tracking-widest">Privacy Audit</Button>
               </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
});
