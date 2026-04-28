'use server';
/**
 * @fileOverview A Genkit flow that provides a summary of relevant commodity price trends, currency exchange rate impacts,
 * and market insights specific to a farmer's crops, in an easy-to-understand format.
 *
 * - marketTrendSynthesis - A function that handles the market trend synthesis process.
 * - MarketTrendSynthesisInput - The input type for the marketTrendSynthesis function.
 * - MarketTrendSynthesisOutput - The return type for the marketTrendSynthesis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// 1. Define Input Schema
const MarketTrendSynthesisInputSchema = z.object({
  cropType: z.string().describe('The type of crop the farmer is interested in (e.g., corn, wheat, soybeans).'),
  location: z.string().describe('The geographical location of the farm (e.g., "Midwest US", "Rajasthan, India").'),
  recentMarketNews: z.string().optional().describe('Optional: Any recent relevant market news or events to consider.'),
});
export type MarketTrendSynthesisInput = z.infer<typeof MarketTrendSynthesisInputSchema>;

// 2. Define Output Schema
const MarketTrendSynthesisOutputSchema = z.object({
  overallSummary: z.string().describe('A concise overall summary of the current market situation for the specified crop.'),
  priceTrends: z.array(z.object({
    commodity: z.string().describe('The specific commodity (e.g., "Corn Futures").'),
    trend: z.string().describe('Description of the price trend (e.g., "upward", "stable", "volatile").'),
    reason: z.string().optional().describe('Potential reasons for the trend.'),
  })).describe('Key commodity price trends relevant to the crop.'),
  exchangeRateImpact: z.string().describe('Analysis of how recent currency exchange rate movements might impact buying inputs or selling produce.'),
  actionableInsights: z.array(z.string()).describe('Specific, easy-to-understand recommendations for the farmer based on the market analysis.'),
  marketEvents: z.array(z.string()).optional().describe('Any significant upcoming market events or holidays.'),
});
export type MarketTrendSynthesisOutput = z.infer<typeof MarketTrendSynthesisOutputSchema>;

// 3. Define the Prompt
const marketTrendSynthesisPrompt = ai.definePrompt({
  name: 'marketTrendSynthesisPrompt',
  input: { schema: MarketTrendSynthesisInputSchema },
  output: { schema: MarketTrendSynthesisOutputSchema },
  prompt: `You are an expert agricultural market analyst providing actionable insights to farmers.\nYour goal is to summarize relevant commodity price trends, currency exchange rate impacts, and general market insights specific to the farmer's crops, delivered in an easy-to-understand format.\nFocus on providing practical advice that helps the farmer make informed decisions about when to sell their produce or purchase inputs.\n\nHere is the farmer's context:\nCrop Type: {{{cropType}}}\nLocation: {{{location}}}\n{{#if recentMarketNews}}\nRecent Market News/Events: {{{recentMarketNews}}}\n{{/if}}\n\nPlease provide a comprehensive yet concise summary, including:\n1. An overall summary of the market situation.\n2. Key commodity price trends (e.g., futures, local prices if applicable) and their potential reasons.\n3. How recent currency exchange rate movements (especially if commodities are priced in USD and farmer operates in a different currency) might impact the farmer's profitability when buying inputs or selling produce.\n4. Actionable insights or recommendations.\n5. Any upcoming significant market events or holidays that might affect prices or logistics.\n\nEnsure the language is clear, direct, and avoids overly technical jargon. Translate complex economic factors into simple, practical implications for the farmer.`,
});

// 4. Implement the Flow
const marketTrendSynthesisFlow = ai.defineFlow(
  {
    name: 'marketTrendSynthesisFlow',
    inputSchema: MarketTrendSynthesisInputSchema,
    outputSchema: MarketTrendSynthesisOutputSchema,
  },
  async (input) => {
    const { output } = await marketTrendSynthesisPrompt(input);
    if (!output) {
      throw new Error('Failed to get market trend synthesis from the prompt.');
    }
    return output;
  }
);

// 5. Create Wrapper Function
export async function marketTrendSynthesis(input: MarketTrendSynthesisInput): Promise<MarketTrendSynthesisOutput> {
  return marketTrendSynthesisFlow(input);
}
