<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js" alt="Next.js 15">
  <img src="https://img.shields.io/badge/Genkit-AI-4285F4?style=flat&logo=google&logoColor=white" alt="Genkit">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat" alt="MIT">
</p>

# Farm Pulse

Precision agriculture intelligence. One dashboard for your entire operation — field health, weather, markets, sustainability, irrigation, and AI-driven anomaly detection.

---

## Capabilities

**Field Intelligence** — Spectral vigor analysis across every sector. Drill into any field for real-time diagnostics.

**Weather Models** — Multi-day forecasts with precipitation risk and temperature tracking, contextualized to your exact location.

**Market Synthesis** — Commodity futures, price signals, and trend analysis. Know what your crop is worth before harvest.

**Anomaly Diagnosis** — AI-powered blight detection. When risk exceeds threshold, the system recommends intervention protocols.

**Sustainability Scoring** — Carbon tracking, ESG metrics, net-positive indexing. Quantify your environmental impact.

**Audio Briefings** — Daily operational summaries, generated and spoken by Gemini AI. Listen while you walk the field.

**Multi-Property** — Manage multiple farms from a single interface. Switch context instantly.

---

## Stack

| | |
|:--|:--|
| Framework | Next.js 15 · App Router · Turbopack |
| AI | Google Genkit · Gemini |
| Components | Radix UI · shadcn/ui |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Language | TypeScript |

---

## Setup

```bash
git clone https://github.com/Kumar-Gaurav-1/farm-pulse.git
cd farm-pulse
npm install
cp .env.example .env    # Add your Gemini API key
npm run dev             # → http://localhost:9002
```

### Environment

| Variable | Purpose |
|:---------|:--------|
| `GEMINI_API_KEY` | Powers AI advisory, audio briefings, and anomaly diagnosis |

Get a key → [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## Architecture

```
src/
├── ai/                    Genkit flows — audio, weather advisory, anomaly analysis, market synthesis
├── app/                   Next.js App Router
├── components/
│   ├── dashboard/         Navigation shell
│   └── features/          Ten feature modules — each self-contained
├── hooks/                 React hooks
└── lib/                   Utilities, location data, API services
```

---

## Limitations

- Weather and market data are currently simulated
- Audio briefing requires Gemini API with TTS capability
- Optimized for desktop; mobile is functional but secondary

---

<p align="center">
  <sub>MIT License</sub>
</p>
