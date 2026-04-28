
"use client";

import React from 'react';
import { 
  Droplets, 
  Waves, 
  Wind, 
  Thermometer, 
  ArrowUpRight, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const waterBalanceData = [
  { day: 'MON', et: 6.2, irrigation: 0 },
  { day: 'TUE', et: 5.8, irrigation: 8.5 },
  { day: 'WED', et: 6.5, irrigation: 0 },
  { day: 'THU', et: 7.1, irrigation: 0 },
  { day: 'FRI', et: 6.8, irrigation: 10.2 },
  { day: 'SAT', et: 5.5, irrigation: 0 },
  { day: 'SUN', et: 4.2, irrigation: 0 },
];

export function IrrigationHub() {
  return (
    <div className="page-transition space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* The Evapotranspiration Core */}
        <Card className="lg:col-span-8 border-none glass-card rounded-[3.5rem] overflow-hidden shadow-2xl">
          <CardHeader className="p-12 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="p-5 rounded-[1.75rem] bg-blue-500 text-white shadow-2xl shadow-blue-500/20">
                  <Waves className="w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="font-headline text-4xl font-bold tracking-tighter italic">Hydrological Balance</CardTitle>
                  <CardDescription className="text-sm font-bold uppercase tracking-widest opacity-50 mt-1">Real-time ET Rates & Deficit Modeling</CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-none font-black py-2 px-6 rounded-full text-[10px] tracking-widest uppercase">
                Optimized
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-12 pt-6">
            <div className="h-[400px] w-full mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterBalanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} dy={10} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }} 
                  />
                  <Bar dataKey="et" fill="hsl(var(--muted-foreground))" radius={[10, 10, 0, 0]} opacity={0.2} name="ET Loss (mm)" />
                  <Bar dataKey="irrigation" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} name="Irrigation (mm)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { label: 'Current ETc', val: '6.4mm', sub: 'Evapotranspiration Rate', icon: Wind, color: 'text-teal-500' },
                { label: 'Soil Deficit', val: '-12.2mm', sub: 'Cumulative Balance', icon: Droplets, color: 'text-blue-500' },
                { label: 'Next Cycle', val: '18:00', sub: 'Planned Intervention', icon: Clock, color: 'text-primary' },
              ].map((stat, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-muted/20 border border-white/40 group hover:bg-white transition-all">
                  <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                  <h4 className="text-3xl font-headline font-bold tracking-tighter">{stat.val}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tight italic mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tactical Scheduling */}
        <div className="lg:col-span-4 space-y-12">
          <Card className="border-none bg-primary text-primary-foreground rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 text-white opacity-[0.05] rotate-12 group-hover:rotate-45 transition-transform duration-[4000ms]">
               <Droplets className="w-80 h-80" />
            </div>
            <h3 className="font-headline font-bold text-3xl mb-10 italic tracking-tight relative z-10">Smart Schedule</h3>
            <div className="space-y-10 relative z-10">
               {[
                 { field: 'North Meadow', volume: '12,500L', time: 'Tonight, 22:00', status: 'Pending' },
                 { field: 'Valley Flat', volume: '45,000L', time: 'Tomorrow, 04:00', status: 'Scheduled' },
                 { field: 'Hillside A', volume: '8,200L', time: 'Tomorrow, 06:00', status: 'Scheduled' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white/10 rounded-[2rem] border border-white/5 hover:bg-white/20 transition-all cursor-pointer">
                    <div className="space-y-1">
                      <p className="font-bold text-lg leading-none">{item.field}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{item.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-headline font-bold text-xl">{item.volume}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-accent">{item.status}</p>
                    </div>
                 </div>
               ))}
            </div>
            <Button className="apple-btn w-full mt-12 bg-white text-primary hover:bg-white/90 rounded-full h-20 font-black uppercase tracking-widest text-[11px] shadow-2xl">
              Authorize All Cycles
            </Button>
          </Card>

          <Card className="border-none glass-card rounded-[3.5rem] p-12">
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600">
                 <Zap className="w-5 h-5" />
               </div>
               <h3 className="text-xl font-headline font-bold italic">Energy Efficiency</h3>
            </div>
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                  <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">Off-Peak Pumping</span>
                  <span className="text-lg font-bold">Validated</span>
               </div>
               <Progress value={92} className="h-2 bg-muted" />
               <p className="text-[10px] text-muted-foreground font-medium italic">92% of irrigation planned for off-peak electricity windows.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
