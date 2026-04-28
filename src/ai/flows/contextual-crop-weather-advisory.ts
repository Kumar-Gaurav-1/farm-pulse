'use server';
/**
 * @fileOverview Provides daily, hyper-localized crop and weather advisories to farmers.
 *
 * - contextualCropWeatherAdvisory - A function that generates actionable crop and weather advice.
 * - ContextualCropWeatherAdvisoryInput - The input type for the contextualCropWeatherAdvisory function.
 * - ContextualCropWeatherAdvisoryOutput - The return type for the contextualCropWeatherAdvisory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContextualCropWeatherAdvisoryInputSchema = z.object({
  location: z.string().describe('The geographical location of the farm.'),
  cropType: z.string().describe('The type of crop being grown (e.g., "tomatoes", "corn", "wheat").'),
  growthStage: z.string().describe('The current growth stage of the crop (e.g., "vegetative", "flowering", "fruit_set").'),
  currentTemperature: z.number().describe('Current temperature in Celsius.'),
  currentHumidity: z.number().describe('Current relative humidity in percentage.'),
  currentPrecipitation: z.number().describe('Current precipitation in mm/hr.'),
  currentWindSpeed: z.number().describe('Current wind speed in km/h.'),
  dailyForecast: z.string().describe('A summary of today\'s weather forecast including temperature, precipitation chances, and wind.'),
  upcomingForecast: z.string().describe('A summary of the upcoming 3-day weather forecast.'),
  soilMoisture: z.number().describe('Current soil moisture percentage (0-100).'),
  previous24hrRainfall: z.number().describe('Rainfall in the last 24 hours in mm.'),
  diseaseHistory: z.array(z.string()).describe('A list of common diseases for this crop that have affected it recently or are common in the area.'),
});
export type ContextualCropWeatherAdvisoryInput = z.infer<typeof ContextualCropWeatherAdvisoryInputSchema>;

const ContextualCropWeatherAdvisoryOutputSchema = z.object({
  advisory: z.string().describe('A comprehensive, actionable advisory for the farmer.'),
  diseaseRisk: z.string().describe('Assessment of disease risk and preventative measures.'),
  irrigationRecommendation: z.string().describe('Recommendation for irrigation, including timing and quantity.'),
  sprayWindowRecommendation: z.string().describe('Recommendation for optimal spray windows, considering wind and rain.'),
});
export type ContextualCropWeatherAdvisoryOutput = z.infer<typeof ContextualCropWeatherAdvisoryOutputSchema>;

export async function contextualCropWeatherAdvisory(input: ContextualCropWeatherAdvisoryInput): Promise<ContextualCropWeatherAdvisoryOutput> {
  return contextualCropWeatherAdvisoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualCropWeatherAdvisoryPrompt',
  input: { schema: ContextualCropWeatherAdvisoryInputSchema },
  output: { schema: ContextualCropWeatherAdvisoryOutputSchema },
  prompt: `You are an expert agricultural advisor providing daily, hyper-localized advice to farmers.
Your goal is to provide actionable recommendations in simple, clear language based on the provided data.

Here is the information about the farm and current conditions:
Location: {{{location}}}
Crop Type: {{{cropType}}}
Growth Stage: {{{growthStage}}}

Current Weather:
Temperature: {{{currentTemperature}}}°C
Humidity: {{{currentHumidity}}}%
Precipitation: {{{currentPrecipitation}}} mm/hr
Wind Speed: {{{currentWindSpeed}}} km/h
Soil Moisture: {{{soilMoisture}}}%
Rainfall in last 24 hours: {{{previous24hrRainfall}}} mm

Today's Forecast: {{{dailyForecast}}}
Upcoming 3-day Forecast: {{{upcomingForecast}}}

Relevant Disease History for {{{cropType}}}: {{#if diseaseHistory}}{{#each diseaseHistory}}- {{{this}}}{{/each}}{{else}}None provided.{{/if}}

Provide an advisory covering disease risk, optimal irrigation, and effective spray windows. Ensure the advice is highly specific and actionable.`,
});

const contextualCropWeatherAdvisoryFlow = ai.defineFlow(
  {
    name: 'contextualCropWeatherAdvisoryFlow',
    inputSchema: ContextualCropWeatherAdvisoryInputSchema,
    outputSchema: ContextualCropWeatherAdvisoryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate crop weather advisory.');
    }
    return output;
  }
);
