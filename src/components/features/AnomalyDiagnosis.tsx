"use client";

import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  ChevronRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Loader2,
  Info,
  ShieldCheck,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { fieldAnomalyAnalysisRecommendation, type FieldAnomalyAnalysisRecommendationOutput } from '@/ai/flows/field-anomaly-analysis-recommendation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AnomalyDiagnosisProps {
  fieldId: string;
  onBack: () => void;
}

export function AnomalyDiagnosis({ fieldId, onBack }: AnomalyDiagnosisProps) {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [diagnosis, setDiagnosis] = useState<FieldAnomalyAnalysisRecommendationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDiagnose = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fieldAnomalyAnalysisRecommendation({
        anomalyDescription: description,
        fieldDetails: `${fieldId} - Central Sector`,
        cropType: "Corn (Yellow Dent)",
        currentGrowthStage: "V8 Vegetative",
        recentWeatherConditions: "High humidity, rising temperatures (32C), recent isolated showers."
      });
      setDiagnosis(result);
    } catch (err: unknown) {
      console.error("Diagnosis error:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('429') || errorMessage.includes('quota')) {
        setError("Intelligence Engine is currently busy handling high regional demand. Please try again in a moment.");
      } else {
        setError("Unable to synthesize diagnostic telemetry. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition space-y-12">
      <div className="flex items-center justify-between px-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="apple-btn -ml-6 flex items-center gap-4 text-muted-foreground hover:text-foreground font-bold rounded-full px-8 h-14"
        >
          <ArrowLeft className="w-5 h-5" />
          Field Health
        </Button>
        <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 text-primary font-black text-[10px] tracking-widest px-6 py-2 uppercase">
          Precision Diagnosis Mode
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          <Card className="border-none glass-card rounded-[3.5rem] p-12 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-primary group-hover:scale-110 transition-transform duration-[5000ms]">
              <Sparkles className="w-64 h-64" />
            </div>
            <CardHeader className="p-0 mb-10">
              <div className="flex items-center gap-5 mb-4">
                <div className="p-4 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20">
                  <Camera className="w-7 h-7" />
                </div>
                <CardTitle className="font-headline text-4xl font-bold tracking-tighter italic">Anomaly Context</CardTitle>
              </div>
              <CardDescription className="text-lg font-medium text-muted-foreground max-w-xl">
                Describe the observed anomaly in <span className="text-foreground font-bold">{fieldId}</span>. Our AI will correlate this with multispectral telemetry and historical patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-10">
              <div className="space-y-6">
                <Textarea 
                  placeholder="e.g., 'Noticed localized yellowing on lower leaves in Sector F4. Seems restricted to lower-lying areas after recent heavy rain...'"
                  className="min-h-[220px] rounded-[2rem] bg-muted/20 border-border/40 p-8 text-lg font-medium focus:ring-primary/20 transition-all"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-6">
                  <Button variant="outline" className="apple-btn h-20 rounded-[2rem] border-dashed border-2 border-muted hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-1">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Photo</span>
                  </Button>
                  <Button variant="outline" className="apple-btn h-20 rounded-[2rem] border-dashed border-2 border-muted hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-1">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Active Scan</span>
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleDiagnose}
                disabled={loading || !description.trim()}
                className="apple-btn w-full bg-primary text-white rounded-full h-24 font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-4">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Synthesizing Diagnosis...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Sparkles className="w-5 h-5" />
                    <span>Initiate AI Diagnosis</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {error && (
             <div className="flex flex-col items-center justify-center py-16 bg-destructive/5 rounded-[2.5rem] border border-destructive/10 text-center px-12 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-5 rounded-full bg-destructive/10 text-destructive">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-headline font-bold text-destructive italic">Strategic Standby</h3>
                  <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto">{error}</p>
                </div>
                <Button onClick={handleDiagnose} variant="outline" className="apple-btn rounded-full px-10 h-12 font-black uppercase text-[10px] tracking-widest border-destructive/20 text-destructive hover:bg-destructive/5">
                  Retry Diagnosis Stream
                </Button>
             </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-12">
          {diagnosis ? (
            <div className="animate-in fade-in slide-in-from-right-8 duration-1000 space-y-12">
              <Card className="border-none bg-primary text-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-12 -top-12 opacity-[0.05] rotate-12 group-hover:rotate-45 transition-transform duration-[4000ms]">
                   <ShieldCheck className="w-64 h-64" />
                </div>
                <div className="flex justify-between items-start relative z-10 mb-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 italic">Intelligence Confidence</p>
                    <h3 className="text-6xl font-headline font-bold tracking-tighter">{(diagnosis.confidenceScore * 100).toFixed(0)}%</h3>
                  </div>
                  <Badge className="bg-white/20 text-white border-none px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">VALIDATED</Badge>
                </div>
                <div className="space-y-8 relative z-10">
                   <h4 className="font-headline font-bold text-2xl italic tracking-tight">Probable Causes</h4>
                   <div className="space-y-4">
                     {diagnosis.probableCauses.map((cause, i) => (
                       <div key={i} className="flex items-start gap-4 p-5 bg-white/10 rounded-2xl border border-white/5 group hover:bg-white/20 transition-all">
                         <div className="w-2 h-2 rounded-full bg-accent mt-2 group-hover:scale-150 transition-transform" />
                         <p className="font-bold text-lg leading-tight">{cause}</p>
                       </div>
                     ))}
                   </div>
                </div>
              </Card>

              <Card className="border-none glass-card rounded-[3.5rem] p-12 shadow-2xl">
                <div className="flex items-center gap-5 mb-10">
                  <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold italic tracking-tight">Immediate Interventions</h3>
                </div>
                <div className="space-y-10">
                  {diagnosis.actionableSteps.map((step, i) => (
                    <div key={i} className="flex gap-6 group cursor-pointer">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center font-black text-xs group-hover:bg-primary group-hover:text-white transition-all">
                        {i + 1}
                      </div>
                      <p className="text-base text-muted-foreground font-medium leading-relaxed group-hover:text-foreground transition-colors">{step}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[500px] flex items-center justify-center text-center p-20 bg-muted/10 rounded-[4rem] border border-dashed border-border/40">
              <div className="space-y-6">
                <div className="p-8 rounded-full bg-white shadow-xl inline-block">
                   <Info className="w-12 h-12 text-muted-foreground/20" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-headline text-2xl font-bold tracking-tight text-muted-foreground italic">Strategic Analysis Pending</h4>
                  <p className="text-sm text-muted-foreground font-medium max-w-[250px] mx-auto italic">Provide field context on the left to initiate the precision intelligence engine.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}