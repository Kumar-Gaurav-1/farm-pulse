"use client";

import React from 'react';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  ThermometerSun, 
  CloudRain, 
  Sun,
  ArrowDown,
  ArrowUp,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const hourlyForecast = [
  { time: 'Now', temp: '28°', icon: Sun, prob: '0%' },
  { time: '1PM', temp: '29°', icon: Sun, prob: '0%' },
  { time: '2PM', temp: '30°', icon: CloudSun, prob: '5%' },
  { time: '3PM', temp: '31°', icon: CloudSun, prob: '10%' },
  { time: '4PM', temp: '29°', icon: CloudRain, prob: '40%' },
  { time: '5PM', temp: '27°', icon: CloudRain, prob: '65%' },
  { time: '6PM', temp: '26°', icon: CloudSun, prob: '20%' },
];

export const WeatherIntelligence = React.memo(function WeatherIntelligence() {
  return (
    <div className="space-y-12 page-transition">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Hero Weather Card */}
        <Card className="lg:col-span-8 border-none bg-gradient-to-br from-blue-500 to-blue-400 text-white rounded-[3rem] overflow-hidden relative group shadow-2xl shadow-blue-500/20">
          <div className="absolute top-0 right-0 p-16 opacity-[0.15] scale-150 animate-pulse">
            <Sun className="w-96 h-96" />
          </div>
          <CardContent className="p-16 relative z-10 flex flex-col justify-between h-full min-h-[500px]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-none rounded-full px-4 py-1 uppercase text-[10px] font-black tracking-widest backdrop-blur-md">
                  Live Telemetry • Valley View
                </Badge>
              </div>
              <h2 className="text-8xl md:text-[10rem] font-headline font-bold leading-none tracking-tighter">28°</h2>
              <div className="space-y-1">
                <p className="text-3xl font-bold italic opacity-90">Mostly Sunny</p>
                <div className="flex gap-4 font-bold text-lg opacity-70">
                  <span className="flex items-center gap-1"><ArrowUp className="w-4 h-4" /> 32°</span>
                  <span className="flex items-center gap-1"><ArrowDown className="w-4 h-4" /> 21°</span>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-8 opacity-70">
                  <Info className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Atmospheric Summary</span>
                </div>
                <p className="text-xl font-medium leading-relaxed max-w-2xl">
                  Intense UV radiation expected between 12:00 and 15:00. Soil evaporation rate is currently <span className="font-black underline">high</span>. Isolated showers likely near sunset.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10-Day / Detail Widgets */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="border-none glass-card rounded-[3rem] p-10">
              <CardTitle className="text-xl font-headline font-bold mb-8 flex items-center gap-3">
                <CloudRain className="w-5 h-5 text-blue-500" /> Hourly Pulse
              </CardTitle>
              <div className="flex justify-between items-center gap-4 overflow-x-auto pb-4">
                {hourlyForecast.map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 min-w-[70px] group cursor-pointer">
                    <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{h.time}</span>
                    <div className="p-4 rounded-2xl bg-muted/30 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <h.icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold">{h.temp}</span>
                      {h.prob !== '0%' && (
                        <span className="text-[9px] font-black text-blue-500 uppercase">{h.prob}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
           </Card>

           <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Humidity', val: '64%', icon: Droplets, color: 'text-blue-500', sub: 'Dew Point: 18°' },
                { label: 'Wind', val: '12 km/h', icon: Wind, color: 'text-teal-500', sub: 'Direction: NW' },
                { label: 'UV Index', val: '8 (High)', icon: ThermometerSun, color: 'text-orange-500', sub: 'Use Protection' },
                { label: 'Visibility', val: '14 km', icon: Sun, color: 'text-primary', sub: 'Clear Skies' },
              ].map((w, i) => (
                <Card key={i} className="border-none glass-card rounded-[2.5rem] p-8 apple-btn">
                   <div className="flex items-center gap-3 mb-6">
                     <w.icon className={cn("w-5 h-5", w.color)} />
                     <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{w.label}</span>
                   </div>
                   <p className="text-2xl font-headline font-bold tracking-tight">{w.val}</p>
                   <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-tighter italic">{w.sub}</p>
                </Card>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
});