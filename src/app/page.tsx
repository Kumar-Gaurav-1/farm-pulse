"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/dashboard/SidebarNav';
import { TopNav } from '@/components/dashboard/TopNav';
import { AdvisoryDashboard } from '@/components/features/AdvisoryDashboard';
import { MarketDashboard } from '@/components/features/MarketDashboard';
import { FieldHealth } from '@/components/features/FieldHealth';
import { FieldIntelligence } from '@/components/features/FieldIntelligence';
import { SustainabilityDashboard } from '@/components/features/SustainabilityDashboard';
import { WeatherIntelligence } from '@/components/features/WeatherIntelligence';
import { IrrigationHub } from '@/components/features/IrrigationHub';
import { FarmIdentity } from '@/components/features/FarmIdentity';
import { AnomalyDiagnosis } from '@/components/features/AnomalyDiagnosis';
import { AlertCenter } from '@/components/features/AlertCenter';
import { OverviewDashboard } from '@/components/features/OverviewDashboard';
import { PROPERTIES, type PropertyContext } from '@/lib/locations';
import { 
  Activity,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<PropertyContext>(PROPERTIES[0]);

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setFormattedDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  const renderContent = () => {
    if (isDiagnosing) {
      return <AnomalyDiagnosis fieldId={isDiagnosing} onBack={() => setIsDiagnosing(null)} />;
    }

    if (selectedField) {
      return <FieldIntelligence fieldId={selectedField} onBack={() => setSelectedField(null)} />;
    }

    switch (activeTab) {
      case 'overview':
        return (
          <OverviewDashboard
            currentLocation={currentLocation}
            setActiveTab={setActiveTab}
            setSelectedField={setSelectedField}
            setIsDiagnosing={setIsDiagnosing}
          />
        );
      case 'weather':
        return <WeatherIntelligence />;
      case 'field-health':
        return <FieldHealth onDiagnose={(id) => setIsDiagnosing(id)} />;
      case 'advisory':
        return <AdvisoryDashboard />;
      case 'market':
        return <MarketDashboard />;
      case 'sustainability':
        return <SustainabilityDashboard />;
      case 'irrigation':
        return <IrrigationHub />;
      case 'notifications':
        return <AlertCenter />;
      case 'settings':
        return <FarmIdentity />;
      default:
        return (
          <div className="flex items-center justify-center h-[500px] text-center">
            <div className="space-y-4">
              <Activity className="w-16 h-16 text-muted-foreground/20 mx-auto animate-pulse" />
              <p className="text-muted-foreground font-black tracking-widest text-sm uppercase italic">Intelligence module initializing...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-body selection:bg-primary/10">
        <SidebarNav activeTab={activeTab} onTabChange={(id) => { setActiveTab(id); setSelectedField(null); setIsDiagnosing(null); }} />
        <SidebarInset className="flex-1 flex flex-col bg-transparent overflow-x-hidden">
          <TopNav 
            currentLocation={currentLocation} 
            onLocationChange={setCurrentLocation} 
          />
          <main className="px-8 py-16 md:px-16 lg:px-32 max-w-[2000px] w-full mx-auto">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 px-6">
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                     <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 text-primary font-black text-[10px] tracking-widest px-6 py-2 uppercase">
                       Precision Context Engine
                     </Badge>
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Live Stream Active
                     </div>
                   </div>
                   <h1 className="text-7xl md:text-8xl font-headline font-bold tracking-tighter text-foreground leading-[0.85]">
                    {isDiagnosing ? 'Diagnosis' : selectedField ? selectedField : activeTab === 'overview' ? 'The Pulse' : 
                     activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                   </h1>
                   <div className="flex items-center gap-6 text-muted-foreground font-bold text-sm tracking-tight">
                      <span className="text-primary italic">{currentLocation.name}</span>
                      <span className="w-2 h-2 rounded-full bg-border/40"></span>
                      <span className="opacity-60 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formattedDate || "Initializing Context..."}
                      </span>
                   </div>
                </div>
                <div className="flex gap-6">
                   <Button variant="outline" className="apple-btn rounded-full font-black px-12 h-16 border-muted hover:bg-muted/50 text-[11px] uppercase tracking-widest transition-all">
                     Historic Logs
                   </Button>
                   <Button className="apple-btn bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-black px-12 h-16 shadow-[0_32px_64px_-12px_rgba(22,101,52,0.3)] text-[11px] uppercase tracking-widest transition-all">
                     Export Intel
                   </Button>
                </div>
             </div>
             
             {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
