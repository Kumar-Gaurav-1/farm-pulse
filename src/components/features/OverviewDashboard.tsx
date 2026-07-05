import React, { useState, useRef } from 'react';
import {
  Sprout,
  TrendingUp,
  CloudRain,
  Activity,
  ThermometerSun,
  LayoutGrid,
  Sparkles,
  ArrowRight,
  Leaf,
  Waves,
  Volume2,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateAudioBriefing } from '@/ai/flows/audio-briefing-flow';
import { AdvisoryDashboard } from '@/components/features/AdvisoryDashboard';
import type { PropertyContext } from '@/lib/locations';

interface OverviewDashboardProps {
  currentLocation: PropertyContext;
  setActiveTab: (tab: string) => void;
  setSelectedField: (field: string | null) => void;
  setIsDiagnosing: (field: string | null) => void;
}

export function OverviewDashboard({
  currentLocation,
  setActiveTab,
  setSelectedField,
  setIsDiagnosing
}: OverviewDashboardProps) {
  const [isBriefing, setIsBriefing] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAudioBriefing = async () => {
    if (isBriefing) return;
    setIsBriefing(true);
    try {
      const summary = `Operations at ${currentLocation.name} are currently peak efficient. Recommend initiating nutrient boost on ${currentLocation.primaryCrop} to capitalize on afternoon precipitation. Blight risk in the sector is currently eighty-four percent.`;
      const result = await generateAudioBriefing(summary);
      setAudioSrc(result.audioUri);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play();
        }
      }, 0);
    } catch (e) {
      console.error("Audio Briefing Error:", e);
    } finally {
      setIsBriefing(false);
    }
  };

  return (
    <div className="page-transition space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Card className="lg:col-span-8 border-none bg-primary text-primary-foreground shadow-2xl shadow-primary/20 rounded-[3.5rem] overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-16 opacity-[0.05] scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-45">
            <Activity className="w-80 h-80" />
          </div>
          <CardContent className="p-16 md:p-20 flex flex-col justify-between h-full relative z-10 min-h-[550px]">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                <span className="text-[11px] font-black tracking-[0.4em] uppercase opacity-70">Strategic Pulse • {currentLocation.location}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-headline font-bold leading-[1.05] max-w-3xl tracking-tighter">
                Operations at <span className="text-white/40 italic">{currentLocation.name}</span> are currently peak efficient.
              </h2>
              <p className="text-2xl text-white/80 font-medium max-w-xl leading-relaxed">
                Zero critical alerts. Recommend initiating nutrient boost on Sector 4 to capitalize on afternoon precipitation.
              </p>
            </div>
            <div className="mt-16 flex flex-wrap gap-6">
              <Button
                variant="secondary"
                onClick={() => setSelectedField('Main Sector')}
                className="apple-btn rounded-full px-12 h-16 font-black uppercase text-[11px] tracking-widest bg-white text-primary hover:bg-white/90 shadow-2xl"
              >
                Enter Field Context
              </Button>
              <Button
                onClick={handleAudioBriefing}
                disabled={isBriefing}
                variant="ghost"
                className="apple-btn rounded-full px-12 h-16 font-black uppercase text-[11px] tracking-widest text-white hover:bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-3"
              >
                {isBriefing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Volume2 className="w-4 h-4" />}
                Listen to Briefing
              </Button>
              {audioSrc && <audio ref={audioRef} src={audioSrc} hidden />}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 grid grid-rows-2 gap-10">
          <Card className="border-none glass-card rounded-[3.5rem] apple-btn group overflow-hidden cursor-pointer" onClick={() => setActiveTab('market')}>
            <CardContent className="p-12 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-5 rounded-[1.75rem] bg-orange-500/10 text-orange-600 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-none font-black text-[11px] tracking-widest">+2.4%</Badge>
              </div>
              <div>
                <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3">Wheat Futures (WTI)</p>
                <h3 className="text-5xl font-headline font-bold tracking-tighter">$6.42<span className="text-lg font-body text-muted-foreground ml-2 font-medium">/bu</span></h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none glass-card rounded-[3.5rem] apple-btn group overflow-hidden cursor-pointer" onClick={() => setActiveTab('sustainability')}>
            <CardContent className="p-12 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="p-5 rounded-[1.75rem] bg-emerald-500/10 text-emerald-600 group-hover:scale-110 transition-transform">
                  <Leaf className="w-7 h-7" />
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-none font-black text-[11px] tracking-widest uppercase">Net Positive</Badge>
              </div>
              <div>
                <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3">Sustainability Index</p>
                <h3 className="text-5xl font-headline font-bold tracking-tighter">0.94</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {[
          { label: 'Field Health', desc: 'Spectral Vigor', icon: LayoutGrid, color: 'bg-primary/10 text-primary', action: () => setActiveTab('field-health') },
          { label: 'Climate Intel', desc: 'Forecast Model', icon: CloudRain, color: 'bg-blue-500/10 text-blue-600', action: () => setActiveTab('weather') },
          { label: 'Market Hub', desc: 'Signal Synthesis', icon: TrendingUp, color: 'bg-orange-500/10 text-orange-600', action: () => setActiveTab('market') },
          { label: 'Irrigation', desc: 'ET Management', icon: Waves, color: 'bg-blue-400/10 text-blue-500', action: () => setActiveTab('irrigation') },
        ].map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className="flex items-center gap-8 p-8 rounded-[3rem] glass-card apple-btn text-left group"
          >
            <div className={cn("p-6 rounded-3xl transition-transform group-hover:scale-110", item.color)}>
              <item.icon className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-lg tracking-tight">{item.label}</h4>
              <p className="text-[11px] text-muted-foreground font-black uppercase tracking-widest mt-1.5 opacity-60 italic">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
         <div className="xl:col-span-8 space-y-16">
            <section>
              <div className="flex items-center justify-between mb-12 px-6">
                 <div className="space-y-2">
                  <h2 className="text-4xl font-headline font-bold tracking-tighter italic">Operational Advisory</h2>
                  <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest opacity-50">Context: {currentLocation.name}</p>
                 </div>
                 <Button
                  variant="ghost"
                  onClick={() => setActiveTab('advisory')}
                  className="apple-btn text-primary font-black text-[11px] uppercase tracking-[0.2em] hover:bg-primary/5 rounded-full px-10 h-14 border border-primary/10"
                 >
                   Detailed Analysis <ArrowRight className="w-4 h-4 ml-3" />
                 </Button>
              </div>
              <AdvisoryDashboard />
            </section>
         </div>

         <div className="xl:col-span-4 space-y-12">
            <Card className="border-none glass-card rounded-[3.5rem] overflow-hidden">
              <CardContent className="p-0">
                <div className="p-12 bg-muted/30 border-b border-border/40">
                  <div className="flex items-center gap-4 mb-3">
                     <Sparkles className="w-6 h-6 text-primary" />
                     <h3 className="font-headline text-2xl font-bold tracking-tight italic">Live Telemetry</h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">Environmental Hub • {currentLocation.id}</p>
                </div>
                <div className="p-12 space-y-8">
                  {[
                    { day: 'MON', temp: '32°', condition: 'Optimized', icon: ThermometerSun, color: 'text-orange-500' },
                    { day: 'TUE', temp: '28°', condition: 'Rain Risk', icon: CloudRain, color: 'text-blue-500' },
                    { day: 'WED', temp: '30°', condition: 'Vigorous', icon: Sprout, color: 'text-primary' },
                  ].map((w, idx) => (
                    <div key={idx} className="flex items-center justify-between p-8 bg-muted/20 rounded-[2.5rem] transition-all hover:bg-muted/40 group cursor-pointer border border-transparent hover:border-border">
                       <div className="flex items-center gap-8">
                         <div className="text-[11px] font-black w-12 text-muted-foreground">{w.day}</div>
                         <w.icon className={cn("w-7 h-7 transition-transform group-hover:scale-110", w.color)} />
                         <div className="text-[10px] uppercase font-black tracking-widest text-foreground">{w.condition}</div>
                       </div>
                       <div className="text-3xl font-headline font-bold">{w.temp}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-orange-500 text-white rounded-[3.5rem] shadow-[0_32px_64px_-12px_rgba(249,115,22,0.3)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-[3000ms]">
                <Activity className="w-64 h-64" />
              </div>
              <CardContent className="p-12 md:p-14 flex flex-col items-center text-center space-y-10 relative z-10">
                 <div className="p-6 rounded-[2rem] bg-white/20 backdrop-blur-2xl">
                   <Activity className="w-12 h-12 text-white" />
                 </div>
                 <div className="space-y-6">
                  <h4 className="font-headline font-bold text-4xl tracking-tight">Intervention Required</h4>
                  <p className="text-xl text-white/90 leading-relaxed font-medium">
                    Blight Risk probability exceeding threshold. Authorize scan protocol.
                  </p>
                 </div>
                 <Button
                   onClick={() => setIsDiagnosing('Main Field')}
                   size="lg"
                   className="apple-btn w-full bg-white text-orange-600 hover:bg-white/90 rounded-full h-20 font-black uppercase tracking-widest text-[11px] shadow-2xl"
                  >
                   Initiate Diagnosis Scan
                 </Button>
              </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
