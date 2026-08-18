"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Globe, 
  Info,
  ArrowRight,
  LineChart,
  Loader2,
  Calendar,
  DollarSign,
  ChevronRight,
  RefreshCcw,
  Scale,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { marketTrendSynthesis, type MarketTrendSynthesisOutput } from '@/ai/flows/market-trend-synthesis-flow';
import { ApiServices, type CurrencyImpact, type MarketCalendarEvent } from '@/lib/api-services';

export function MarketDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<MarketTrendSynthesisOutput | null>(null);
  const [currency, setCurrency] = useState<CurrencyImpact | null>(null);
  const [deadlines, setDeadlines] = useState<MarketCalendarEvent[]>([]);

  const fetchMarketIntelligence = async () => {
    setLoading(true);
    setError(null);
    try {
      const [synth, fx, cal] = await Promise.all([
        marketTrendSynthesis({
          cropType: "Wheat & Soybeans",
          location: "United States (Midwest)",
          recentMarketNews: "Exports to Europe increasing due to regional shortage. Logistics costs stabilizing."
        }),
        ApiServices.getExchangeRates('USD', 'EUR'),
        ApiServices.getDeadlines()
      ]);
      setMarketData(synth);
      setCurrency(fx);
      setDeadlines(cal);
    } catch (err: unknown) {
      console.error("Error fetching market intelligence:", err);
      if (err instanceof Error && (err.message.includes('429') || err.message.includes('quota'))) {
        setError("Market Analysis Engine is currently busy handling high regional demand. Please try again in a moment.");
      } else {
        setError("Unable to synthesize global economic vectors. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketIntelligence();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 page-transition">
      <div className="lg:col-span-8 space-y-12">
        <Card className="border-none glass-card rounded-[3.5rem] overflow-hidden shadow-2xl">
          <CardHeader className="p-12 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="p-5 rounded-[1.75rem] bg-muted text-foreground">
                  <LineChart className="w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="font-headline text-4xl font-bold tracking-tighter italic">Global Market Hub</CardTitle>
                  <CardDescription className="text-sm font-bold uppercase tracking-widest opacity-50 mt-1">Trade signals & Synthetic Analysis</CardDescription>
                </div>
              </div>
              {!error && (
                <Button variant="outline" onClick={fetchMarketIntelligence} disabled={loading} className="rounded-full border-muted bg-white/50 backdrop-blur font-black uppercase text-[10px] tracking-widest px-8 h-12">
                  {loading ? <RefreshCcw className="w-4 h-4 animate-spin mr-3" /> : null}
                  Sync Streams
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-12 pt-6 space-y-16">
            {loading ? (
               <div className="flex flex-col items-center justify-center py-32">
                 <Loader2 className="w-20 h-20 animate-spin text-primary/10 mb-8" />
                 <p className="font-black text-muted-foreground animate-pulse tracking-widest text-sm uppercase italic">Synthesizing economic vectors...</p>
               </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20 bg-destructive/5 rounded-[2.5rem] border border-destructive/10 text-center px-12 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                 <div className="p-6 rounded-full bg-destructive/10 text-destructive">
                   <AlertTriangle className="w-10 h-10" />
                 </div>
                 <div className="space-y-3">
                   <h3 className="text-2xl font-headline font-bold text-destructive">Strategic Standby</h3>
                   <p className="text-muted-foreground font-medium max-w-md mx-auto">{error}</p>
                 </div>
                 <Button onClick={fetchMarketIntelligence} variant="outline" className="apple-btn rounded-full px-12 h-14 font-black uppercase text-[11px] tracking-widest border-destructive/20 text-destructive hover:bg-destructive/5">
                   Retry Analysis Stream
                 </Button>
              </div>
            ) : marketData ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="bg-primary/5 rounded-[3rem] p-12 border border-primary/10 relative overflow-hidden group">
                  <div className="absolute -right-12 -top-12 text-primary opacity-[0.03] group-hover:scale-110 transition-transform duration-[4000ms]">
                    <Globe className="w-80 h-80" />
                  </div>
                  <h3 className="font-headline font-bold text-2xl mb-6 flex items-center gap-5 text-primary italic">
                    <Info className="w-7 h-7" /> Strategic Briefing
                  </h3>
                  <p className="text-2xl text-foreground/80 leading-[1.4] font-body font-medium tracking-tight relative z-10">
                    "{marketData.overallSummary}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                  {marketData.priceTrends.map((price, idx) => (
                    <div key={idx} className="p-10 rounded-[2.5rem] border border-border/40 bg-white/40 hover:bg-white hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                      <div className="flex justify-between items-start mb-10">
                        <h4 className="font-bold font-headline text-2xl tracking-tighter italic">{price.commodity}</h4>
                        <Badge className="bg-green-100 text-green-700 border-none px-5 py-2 font-black rounded-full text-[10px] uppercase tracking-widest">Bullish</Badge>
                      </div>
                      <p className="text-base text-muted-foreground mb-10 leading-relaxed font-medium opacity-80">"{price.reason}"</p>
                      <div className="flex items-center text-[10px] uppercase font-black tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-3 group-hover:translate-y-0">
                        Signal Detail <ArrowRight className="w-4 h-4 ml-3" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 border border-border/40 rounded-[3rem] p-12 bg-accent/5 backdrop-blur-3xl relative group overflow-hidden">
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-[0.05] text-accent rotate-12">
                     <DollarSign className="w-64 h-64" />
                  </div>
                  <div className="flex items-center justify-between relative z-10 mb-8">
                    <h4 className="font-headline font-bold text-2xl flex items-center gap-5 italic">
                      <DollarSign className="w-7 h-7 text-accent" /> Currency Exchange Vector
                    </h4>
                    {currency && (
                      <Badge variant="secondary" className="bg-white/50 backdrop-blur px-6 py-2 rounded-full font-black text-[11px] tracking-widest">
                        {currency.base} → {currency.target}: {currency.rate.toFixed(4)}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed font-medium relative z-10">
                    {marketData.exchangeRateImpact}
                  </p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-4 space-y-12">
        <Card className="bg-primary text-primary-foreground border-none rounded-[3.5rem] overflow-hidden shadow-2xl relative">
          <CardHeader className="p-14 pb-8 relative z-10">
            <CardTitle className="font-headline text-5xl font-bold leading-[1] tracking-tighter">Market<br/>Directives</CardTitle>
          </CardHeader>
          <CardContent className="p-14 pt-0 space-y-12 relative z-10">
            {marketData?.actionableInsights.map((insight, idx) => (
              <div key={idx} className="flex gap-8 items-start group cursor-pointer">
                <div className="w-12 h-12 rounded-[1.25rem] bg-white/15 flex-shrink-0 flex items-center justify-center font-black text-sm group-hover:bg-white group-hover:text-primary transition-all">
                  {idx + 1}
                </div>
                <p className="text-lg leading-relaxed font-bold text-white/90 group-hover:text-white transition-colors">{insight}</p>
              </div>
            ))}

            <div className="pt-14 border-t border-white/10 space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-4 italic">
                <Calendar className="w-5 h-5" /> Operational Deadlines
              </h4>
              <div className="space-y-6">
                {deadlines.map((event, idx) => (
                  <div key={idx} className="flex items-center gap-6 bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase tracking-widest text-white/40">{event.date}</span>
                      <span className="font-bold text-sm text-white/90">{event.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none glass-card rounded-[3.5rem] p-12 shadow-xl">
           <div className="flex items-center gap-4 mb-10">
             <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600">
               <Scale className="w-5 h-5" />
             </div>
             <h3 className="text-xl font-headline font-bold italic">USDA Benchmarks</h3>
           </div>
           <div className="space-y-8">
             <div className="flex justify-between items-end p-6 bg-muted/20 rounded-3xl">
               <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Regional Mean</p>
                 <p className="text-3xl font-headline font-bold">178.5</p>
               </div>
               <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 font-bold rounded-full text-[10px] uppercase">88th Percentile</Badge>
             </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
