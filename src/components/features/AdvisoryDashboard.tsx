"use client";

import React, { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  Bug, 
  Sprout, 
  Loader2, 
  Sparkles,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { contextualCropWeatherAdvisory, type ContextualCropWeatherAdvisoryOutput } from '@/ai/flows/contextual-crop-weather-advisory';
import { Progress } from '@/components/ui/progress';

let cachedAdvisoryPromise: Promise<ContextualCropWeatherAdvisoryOutput> | null = null;

export function AdvisoryDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advisoryData, setAdvisoryData] = useState<ContextualCropWeatherAdvisoryOutput | null>(null);

  const fetchAdvisory = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    if (forceRefresh) {
      cachedAdvisoryPromise = null;
    }

    if (!cachedAdvisoryPromise) {
      cachedAdvisoryPromise = contextualCropWeatherAdvisory({
        location: "Central Valley, Kansas",
        cropType: "Corn (Yellow Dent)",
        growthStage: "Vegetative (V8)",
        currentTemperature: 28,
        currentHumidity: 65,
        currentPrecipitation: 0,
        currentWindSpeed: 12,
        dailyForecast: "Partly cloudy, high of 32C, 10% chance of isolated showers in evening.",
        upcomingForecast: "Rising temperatures over next 48h, reaching 35C. Dry conditions prevailing.",
        soilMoisture: 42,
        previous24hrRainfall: 2,
        diseaseHistory: ["Gray Leaf Spot", "Common Rust"],
      });
    }

    try {
      const result = await cachedAdvisoryPromise;
      setAdvisoryData(result);
    } catch (err: any) {
      cachedAdvisoryPromise = null;
      console.error("Error fetching advisory:", err);
      if (err.message?.includes('429') || err.message?.includes('quota')) {
        setError("Intelligence Engine is currently busy handling high regional demand. Please try again in a moment.");
      } else {
        setError("Unable to synthesize environmental telemetry. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisory();
  }, []);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 border-none glass-card rounded-[2.5rem] overflow-hidden group">
          <CardHeader className="p-10 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-[1.5rem] bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="font-headline text-3xl font-bold italic tracking-tight">Daily Synthesis</CardTitle>
                  <CardDescription className="text-sm font-medium mt-1 uppercase tracking-widest opacity-60">Field 4 • Precision Intelligence</CardDescription>
                </div>
              </div>
              {!error && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold py-1.5 px-4 rounded-full text-[10px] tracking-widest uppercase">
                  AI ACTIVE
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-6">
                <div className="relative">
                  <Loader2 className="w-14 h-14 animate-spin text-primary/20" />
                  <Sparkles className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" />
                </div>
                <p className="text-muted-foreground font-bold tracking-tight animate-pulse text-lg italic uppercase">Synthesizing environmental telemetry...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 bg-destructive/5 rounded-[2.5rem] border border-destructive/10 text-center px-12 space-y-8">
                 <div className="p-6 rounded-full bg-destructive/10 text-destructive">
                   <AlertTriangle className="w-10 h-10" />
                 </div>
                 <div className="space-y-3">
                   <h3 className="text-2xl font-headline font-bold text-destructive">Strategic Standby</h3>
                   <p className="text-muted-foreground font-medium max-w-md mx-auto">{error}</p>
                 </div>
                 <Button onClick={() => fetchAdvisory(true)} variant="outline" className="apple-btn rounded-full px-12 h-14 font-black uppercase text-[11px] tracking-widest border-destructive/20 text-destructive hover:bg-destructive/5">
                   Retry Intelligence Feed
                 </Button>
              </div>
            ) : advisoryData ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="bg-muted/30 rounded-[2rem] p-10 mb-10 border border-white/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-primary">
                    <Sprout className="w-48 h-48" />
                  </div>
                  <p className="text-2xl leading-[1.4] font-body italic text-foreground/90 font-medium tracking-tight relative z-10">
                    "{advisoryData.advisory}"
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Disease Risk', content: advisoryData.diseaseRisk, icon: Bug, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                    { title: 'Irrigation', content: advisoryData.irrigationRecommendation, icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { title: 'Spray Window', content: advisoryData.sprayWindowRecommendation, icon: Wind, color: 'text-teal-500', bg: 'bg-teal-500/10' },
                  ].map((item, i) => (
                    <div key={i} className="p-8 rounded-[2rem] border border-border/50 bg-white/40 hover:bg-white transition-all duration-300 group cursor-pointer">
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-headline font-bold text-base tracking-tight">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.content}</p>
                      <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        Take Action <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 border-none glass-card rounded-[2.5rem]">
          <CardHeader className="p-10 pb-4">
            <CardTitle className="text-2xl font-headline font-bold italic">Telemetry Stream</CardTitle>
            <CardDescription className="text-sm font-medium uppercase tracking-widest opacity-60">Real-time sensor network</CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-4 space-y-12">
            {[
              { label: 'Soil Moisture', value: '42%', icon: Droplets, color: 'text-blue-500', barColor: 'bg-blue-500', sub: 'Critical Threshold: 35%' },
              { label: 'Leaf Temperature', value: '29.4°C', icon: Thermometer, color: 'text-red-500', barColor: 'bg-red-500', sub: 'Optimal Range: 22-30°C' },
              { label: 'NDVI Index', value: '0.78', icon: Sprout, color: 'text-primary', barColor: 'bg-primary', sub: 'Health Category: Vigorous' },
            ].map((vital, i) => (
              <div key={i} className="space-y-5">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <vital.icon className={`w-5 h-5 ${vital.color}`} />
                    <span className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">{vital.label}</span>
                  </div>
                  <span className="text-2xl font-headline font-bold">{vital.value}</span>
                </div>
                <div className="space-y-3">
                  <Progress value={vital.label === 'Soil Moisture' ? 42 : vital.label === 'NDVI Index' ? 78 : 65} className="h-2.5 bg-muted" />
                  <p className="text-[10px] text-muted-foreground font-semibold tracking-wide italic">{vital.sub}</p>
                </div>
              </div>
            ))}
            
            <div className="pt-10 border-t border-border/50">
               <div className="flex items-center gap-4 text-primary bg-primary/5 p-6 rounded-[1.5rem] border border-primary/10">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                 <span className="text-[11px] font-black uppercase tracking-[0.2em]">Systems Nominal</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
