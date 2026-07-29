"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map as MapIcon, 
  Layers, 
  Maximize2, 
  Filter, 
  AlertCircle, 
  RefreshCw, 
  Radio, 
  Sparkles,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FieldHealthProps {
  onDiagnose?: (fieldId: string) => void;
}

export const FieldHealth = React.memo(function FieldHealth({ onDiagnose }: FieldHealthProps) {
  const [activeLayer, setActiveLayer] = useState('NDVI (Vigour)');

  const handleInitiateDiagnosis = (fieldId: string) => {
    if (onDiagnose) {
      onDiagnose(fieldId);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 page-transition">
      <Card className="lg:col-span-3 h-[750px] relative overflow-hidden group border-none glass-card rounded-[3rem]">
        {/* Synthetic Map Component */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/agrihighres/1600/1000')] bg-cover bg-center transition-transform duration-[3000ms] group-hover:scale-110">
           {/* Multispectral Mask Overlay */}
           <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-60"></div>
           <div className="absolute top-[20%] left-[30%] w-96 h-96 bg-primary/30 blur-[150px] rounded-full animate-pulse"></div>
           <div className="absolute bottom-[30%] right-[20%] w-64 h-64 bg-red-500/10 blur-[100px] rounded-full"></div>
           
           {/* Interactive Stress Point */}
           <div 
             className="absolute top-[45%] left-[55%] flex flex-col items-center cursor-pointer group/node"
             onClick={() => handleInitiateDiagnosis('North Meadow • Sector F4')}
           >
              <div className="w-10 h-10 rounded-full bg-orange-500/30 flex items-center justify-center animate-ping">
                 <div className="w-4 h-4 rounded-full bg-orange-500 shadow-xl shadow-orange-500/50 border-2 border-white"></div>
              </div>
              <div className="mt-6 bg-black/80 backdrop-blur-xl text-white px-6 py-3 rounded-2xl border border-white/10 opacity-0 group-hover/node:opacity-100 transition-all translate-y-4 group-hover/node:translate-y-0 shadow-2xl flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-[10px] font-black tracking-widest uppercase">Anomaly Detected • F4-09</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </div>
           </div>
        </div>
        
        <div className="absolute top-10 left-10 flex flex-col gap-4">
          <Badge className="bg-black/80 text-white backdrop-blur-2xl px-6 py-2.5 border-none shadow-2xl rounded-full text-[11px] font-black tracking-[0.2em] uppercase">
            SENTINEL-2 • LIVE
          </Badge>
          <Badge className="bg-white/90 dark:bg-black/90 text-foreground backdrop-blur-2xl px-6 py-2.5 border-none shadow-2xl rounded-full text-[11px] font-bold uppercase tracking-wider">
            INDEX: {activeLayer.split(' ')[0]} HEALTH
          </Badge>
        </div>

        <div className="absolute top-10 right-10 flex gap-4">
          <Button size="icon" variant="secondary" className="bg-white/90 dark:bg-black/90 backdrop-blur-2xl shadow-2xl h-14 w-14 rounded-[1.5rem] hover:scale-110 active:scale-95 transition-all border-none">
            <Layers className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 dark:bg-black/90 backdrop-blur-2xl shadow-2xl h-14 w-14 rounded-[1.5rem] hover:scale-110 active:scale-95 transition-all border-none">
            <Maximize2 className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute bottom-10 left-10 right-10 bg-white/90 dark:bg-black/95 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] flex items-center justify-between">
           <div className="flex items-center gap-16">
              <div className="space-y-2">
                <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">Mean Vigour</p>
                <p className="text-4xl font-headline font-bold text-primary tracking-tighter">0.82</p>
              </div>
              <div className="h-12 w-px bg-border/50"></div>
              <div className="space-y-2">
                <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">Telemetry</p>
                <div className="flex items-center gap-4">
                   <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-orange-500 animate-ping"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-orange-500"></div>
                   </div>
                   <p className="text-base font-bold tracking-tight">Zone Stress Alert (F4-09)</p>
                </div>
              </div>
           </div>
           <div className="flex flex-col items-center gap-3">
              <div className="w-64 h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-primary shadow-inner"></div>
              <div className="flex justify-between w-full px-2 text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                <span>Stressed</span>
                <span>Vigorous</span>
              </div>
           </div>
        </div>
      </Card>

      <Card className="flex flex-col border-none glass-card rounded-[3rem]">
        <CardHeader className="p-10 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Filter className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-headline font-bold italic">Spectral Layers</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10 hover:rotate-180 transition-transform duration-700 rounded-full">
               <RefreshCw className="w-4 h-4 text-muted-foreground/40" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 px-10 space-y-10">
          <div className="space-y-4">
             {[
               { name: 'NDVI (Vigour)', color: 'bg-primary' },
               { name: 'EVI (Chlorophyll)', color: 'bg-emerald-700' },
               { name: 'SWIR (Moisture)', color: 'bg-blue-400' },
               { name: 'Thermal LST', color: 'bg-orange-400' },
             ].map((layer, idx) => (
               <button 
                 key={idx} 
                 onClick={() => setActiveLayer(layer.name)}
                 className={cn(
                   "w-full flex items-center justify-between p-5 rounded-[1.5rem] border-2 transition-all duration-500 group apple-btn",
                   activeLayer === layer.name 
                    ? "border-primary bg-primary/5 shadow-xl shadow-primary/5" 
                    : "border-transparent bg-muted/30 hover:bg-muted/60"
                 )}
               >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-2.5 h-2.5 rounded-full transition-transform duration-500 group-hover:scale-150", layer.color)}></div>
                    <span className={cn("text-[13px] font-bold", activeLayer === layer.name ? "text-primary" : "text-muted-foreground")}>{layer.name}</span>
                  </div>
                  {activeLayer === layer.name && <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>}
               </button>
             ))}
          </div>

          <div className="pt-10 border-t border-border/50">
            <h4 className="text-[11px] font-black uppercase text-muted-foreground/30 tracking-[0.3em] mb-6 italic">Field Inventory</h4>
            <div className="space-y-4">
              {[
                { name: 'North Meadow', crop: 'Corn', area: '42.5 Ha', status: 'Optimal' },
                { name: 'Valley Flat', crop: 'Wheat', area: '118.2 Ha', status: 'Harvesting' },
                { name: 'Hillside Alpha', crop: 'Soy', area: '15.0 Ha', status: 'Optimal' },
              ].map((field, i) => (
                <div 
                  key={i} 
                  onClick={() => handleInitiateDiagnosis(field.name)}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl hover:bg-muted/40 transition-all cursor-pointer group apple-btn"
                >
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-foreground">{field.name}</span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{field.crop} • {field.area}</span>
                  </div>
                  <Badge variant="outline" className="border-primary/20 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity rounded-full px-3">
                    {field.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <div className="p-10 mt-auto">
          <Button 
            onClick={() => handleInitiateDiagnosis('North Meadow')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-16 font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-primary/20 transition-all active:scale-95"
          >
             Initiate Field Diagnosis
          </Button>
        </div>
      </Card>
    </div>
  );
});