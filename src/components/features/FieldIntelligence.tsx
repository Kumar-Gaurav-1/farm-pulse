"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sprout, 
  Activity, 
  Sparkles,
  Zap,
  ChevronRight,
  Target,
  BarChart3,
  Scale,
  RefreshCw,
  Clock,
  History,
  ShieldCheck,
  Maximize2,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ApiServices } from '@/lib/api-services';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const chartData = [
  { name: '06:00', ndvi: 0.78, temp: 22 },
  { name: '09:00', ndvi: 0.80, temp: 25 },
  { name: '12:00', ndvi: 0.82, temp: 29 },
  { name: '15:00', ndvi: 0.81, temp: 31 },
  { name: '18:00', ndvi: 0.79, temp: 28 },
  { name: '21:00', ndvi: 0.78, temp: 24 },
];

interface FieldIntelligenceProps {
  fieldId: string;
  onBack: () => void;
}

export function FieldIntelligence({ fieldId, onBack }: FieldIntelligenceProps) {
  const [activeView, setActiveView] = useState<'status' | 'analysis' | 'history'>('status');
  const [ndvi, setNdvi] = useState<any>(null);
  const [benchmark, setBenchmark] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBoosting, setIsBoosting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [n, b] = await Promise.all([
          ApiServices.getFieldNDVI(fieldId),
          ApiServices.getYieldBenchmarks('Corn', 'Kansas')
        ]);
        setNdvi(n);
        setBenchmark(b);
      } catch (err) {
        console.error("Context Data Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fieldId]);

  const handleNitrogenBoost = () => {
    setIsBoosting(true);
    setTimeout(() => setIsBoosting(false), 3000);
  };

  return (
    <div className="page-transition space-y-16">
      {/* Immersive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 gap-8">
        <div className="flex items-center gap-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="apple-btn -ml-6 flex items-center gap-4 text-muted-foreground hover:text-foreground font-bold rounded-full px-8 h-14 bg-muted/20"
          >
            <ArrowLeft className="w-5 h-5" />
            The Pulse
          </Button>
          <div className="h-10 w-px bg-border/40 hidden md:block"></div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-primary animate-ping" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Context Active</span>
          </div>
        </div>
        
        <div className="flex gap-4 bg-muted/30 p-2 rounded-[2rem] border border-border/40 backdrop-blur-3xl">
          {(['status', 'analysis', 'history'] as const).map((v) => (
            <Button 
              key={v}
              variant={activeView === v ? 'default' : 'ghost'}
              onClick={() => setActiveView(v)}
              className={cn(
                "apple-btn rounded-full px-10 h-12 text-[10px] font-black uppercase tracking-widest transition-all",
                activeView === v ? "bg-white dark:bg-white/10 text-primary shadow-xl ring-1 ring-black/5" : "text-muted-foreground hover:bg-white/50"
              )}
            >
              {v}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Spatial Intelligence View */}
        <div className="lg:col-span-8 space-y-12">
          <Card className="border-none glass-card rounded-[4rem] overflow-hidden relative group h-[700px] shadow-2xl">
            {/* Spectral Map Base */}
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/agrihighres/1600/1000')] bg-cover bg-center transition-transform duration-[8000ms] group-hover:scale-105">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-40"></div>
              
              {/* Intelligence Hotspots */}
              <div className="absolute top-[42%] left-[58%] group/hotspot cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-orange-500/20 animate-ping" />
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-orange-500/40 backdrop-blur-2xl border-2 border-white/50 flex items-center justify-center shadow-2xl">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-3xl text-white px-10 py-6 rounded-[2rem] whitespace-nowrap border border-white/10 opacity-0 group-hover/hotspot:opacity-100 transition-all scale-95 group-hover/hotspot:scale-100 shadow-2xl z-50">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 mb-2">Anomaly Detected • Sector F4</p>
                  <p className="text-xl font-headline font-bold italic tracking-tight">Stunted Vegetative Growth</p>
                  <p className="text-xs text-white/40 mt-2 font-medium">Diagnostic Confidence: 0.92</p>
                </div>
              </div>
            </div>
            
            {/* Map UI Overlays */}
            <div className="absolute top-12 left-12 space-y-4">
               <div className="p-10 glass-card rounded-[3.5rem] border-none backdrop-blur-3xl shadow-2xl">
                 <div className="space-y-3">
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic opacity-60">Active Intelligence Target</p>
                   <h3 className="text-6xl font-headline font-bold italic tracking-tighter">{fieldId}</h3>
                   <div className="flex items-center gap-4 mt-6">
                     <Badge className="bg-primary/10 text-primary border-none font-black px-6 py-2 rounded-full uppercase text-[9px] tracking-widest">SENTINEL-2 ACTIVE</Badge>
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Live Stream
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div className="absolute top-12 right-12 flex flex-col gap-4">
              <Button size="icon" className="h-14 w-14 rounded-2xl glass-card border-none bg-white/80 hover:bg-white shadow-xl apple-btn">
                <Layers className="w-5 h-5 text-primary" />
              </Button>
              <Button size="icon" className="h-14 w-14 rounded-2xl glass-card border-none bg-white/80 hover:bg-white shadow-xl apple-btn">
                <Maximize2 className="w-5 h-5 text-primary" />
              </Button>
            </div>

            {/* Bottom Telemetry Pulse */}
            <div className="absolute bottom-12 left-12 right-12 flex gap-8">
              {[
                { label: 'Mean NDVI', val: ndvi?.mean || '0.82', desc: 'Vigor High', icon: Sprout, color: 'text-primary' },
                { label: 'Soil Moisture', val: '42.5%', desc: 'Optimal', icon: Droplets, color: 'text-blue-500' },
                { label: 'Leaf Temp', val: '29.4°C', desc: 'Metabolic Peak', icon: Thermometer, color: 'text-orange-500' },
              ].map((stat, i) => (
                <div key={i} className="flex-1 glass-card p-10 rounded-[2.5rem] border-none backdrop-blur-3xl bg-white/40 shadow-2xl group hover:bg-white transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{stat.label}</p>
                  </div>
                  <p className="text-4xl font-headline font-bold tracking-tighter">{stat.val}</p>
                  <p className="text-[10px] font-bold text-muted-foreground/60 mt-3 uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">{stat.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Detailed Analytics Chart */}
          <Card className="border-none glass-card rounded-[3.5rem] p-12 shadow-xl">
            <div className="flex items-center justify-between mb-16">
               <div className="flex items-center gap-6">
                 <div className="p-5 rounded-[1.5rem] bg-primary/10 text-primary shadow-inner">
                    <BarChart3 className="w-7 h-7" />
                 </div>
                 <div>
                   <h3 className="text-3xl font-headline font-bold tracking-tight italic">Temporal Vigor Analysis</h3>
                   <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-50">24-Hour Satellite Cycle • Sentinel-2</p>
                 </div>
               </div>
               <Badge className="bg-muted text-muted-foreground border-none font-black py-2 px-6 rounded-full text-[10px] tracking-widest uppercase">Validated Stream</Badge>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: 'hsl(var(--muted-foreground))'}} dy={15} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '2rem', border: 'none', boxShadow: '0 32px 64px rgba(0,0,0,0.1)', padding: '24px' }} 
                  />
                  <Area type="monotone" dataKey="ndvi" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorNdvi)" strokeWidth={5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Tactical Command & History Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          {/* Strategic Insights */}
          <Card className="border-none glass-card rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-primary group-hover:scale-125 transition-transform duration-[4000ms]">
              <Sparkles className="w-64 h-64" />
            </div>
            <div className="flex items-center gap-6 mb-12 relative z-10">
              <div className="p-5 rounded-[1.5rem] bg-primary text-white shadow-2xl shadow-primary/30">
                <Sparkles className="w-8 h-8" />
              </div>
              <CardTitle className="font-headline text-3xl font-bold tracking-tight italic">Strategic Insights</CardTitle>
            </div>
            
            <div className="space-y-14 relative z-10">
               {[
                 { label: 'Growth Stage', val: 'V8 Vegetative', icon: Sprout, sub: 'Transition to V9 in 3.8 days', color: 'text-primary' },
                 { label: 'Yield Potential', val: `${benchmark?.percentile || 88}th`, icon: Scale, sub: 'Performance vs USDA Benchmarks', color: 'text-orange-600' },
                 { label: 'Risk Vector', val: 'Low', icon: ShieldCheck, sub: 'No active pathogens detected', color: 'text-emerald-600' },
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 group cursor-pointer">
                   <div className="p-5 h-fit rounded-[1.5rem] bg-muted/30 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                     <item.icon className="w-7 h-7" />
                   </div>
                   <div className="space-y-2">
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic opacity-50">{item.label}</p>
                     <p className="text-3xl font-bold tracking-tighter">{item.val}</p>
                     <p className="text-xs text-muted-foreground font-bold opacity-70 tracking-tight">{item.sub}</p>
                   </div>
                 </div>
               ))}
            </div>

            <div className="mt-16 pt-12 border-t border-border/40 relative z-10">
               <Button 
                onClick={handleNitrogenBoost}
                disabled={isBoosting}
                className="apple-btn w-full bg-primary text-white rounded-full h-24 font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl"
               >
                 {isBoosting ? "Deploying..." : "Authorize Nitrogen Boost"}
               </Button>
            </div>
          </Card>

          {/* Operational Timeline */}
          <Card className="border-none glass-card rounded-[3.5rem] p-12 shadow-xl">
            <div className="flex items-center gap-6 mb-12">
               <div className="p-4 rounded-xl bg-muted/50 text-muted-foreground">
                 <History className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-headline font-bold italic tracking-tight">Treatment History</h3>
            </div>
            <div className="space-y-10 relative">
               <div className="absolute left-[27px] top-4 bottom-4 w-px bg-border/40"></div>
               {[
                 { action: 'Nitrogen (Liquid)', date: 'June 12', time: '04:15 AM', icon: Zap, color: 'text-orange-500' },
                 { action: 'Irrigation (12,400L)', date: 'June 10', time: '11:00 PM', icon: Droplets, color: 'text-blue-500' },
                 { action: 'Spectral Scan', date: 'June 08', time: '02:30 PM', icon: Activity, color: 'text-primary' },
               ].map((log, idx) => (
                 <div key={idx} className="flex items-center gap-8 group cursor-pointer relative z-10">
                    <div className={cn("w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110", log.color)}>
                      <log.icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-lg leading-none tracking-tight">{log.action}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 italic">{log.date} • {log.time}</p>
                    </div>
                 </div>
               ))}
            </div>
            <Button variant="ghost" className="apple-btn w-full mt-12 justify-between font-black uppercase tracking-widest text-[10px] h-14 rounded-full border border-border/50 bg-white/40 hover:bg-white px-8">
              Full Archive <ChevronRight className="w-5 h-5" />
            </Button>
          </Card>

          {/* Tactical Weather Widget */}
          <Card className="border-none bg-blue-500 text-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 text-white opacity-[0.1] rotate-12 group-hover:scale-150 transition-transform duration-[5000ms]">
               <Wind className="w-64 h-64" />
            </div>
            <h4 className="font-headline font-bold text-2xl mb-6 italic tracking-tight relative z-10">Atmospheric Prediction</h4>
            <div className="flex items-center gap-6 relative z-10 mb-8">
               <Wind className="w-10 h-10 text-white/50" />
               <div>
                 <p className="text-3xl font-bold tracking-tighter">12 km/h NW</p>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Spray Window: Optimized</p>
               </div>
            </div>
            <p className="text-lg text-white/80 leading-relaxed font-medium relative z-10 italic">
              "Wind patterns stabilized for evening application. Humidity threshold within optimal bounds for systemic absorption."
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}