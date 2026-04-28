'use server';
/**
 * @fileOverview An AI agent that analyzes field anomalies, identifies probable causes,
 * and suggests actionable steps for farmers.
 *
 * - fieldAnomalyAnalysisRecommendation - A function that handles the anomaly analysis process.
 * - FieldAnomalyAnalysisRecommendationInput - The input type for the fieldAnomalyAnalysisRecommendation function.
 * - FieldAnomalyAnalysisRecommendationOutput - The return type for the fieldAnomalyAnalysisRecommendation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FieldAnomalyAnalysisRecommendationInputSchema = z.object({
  anomalyDescription: z
    .string()
    .describe('A detailed description of the observed field anomaly.'),
  fieldDetails: z
    .string()
    .describe(
      'Details about the field, including location, soil type, and any known history.'
    ),
  cropType: z.string().describe('The type of crop currently planted in the field.'),
  currentGrowthStage: z
    .string()
    .describe('The current growth stage of the crop.'),
  recentWeatherConditions: z
    .string()
    .describe('Summary of recent weather patterns (e.g., temperature, rainfall).'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the anomaly, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type FieldAnomalyAnalysisRecommendationInput = z.infer<
  typeof FieldAnomalyAnalysisRecommendationInputSchema
>;

const FieldAnomalyAnalysisRecommendationOutputSchema = z.object({
  probableCauses: z
    .array(z.string())
    .describe('A list of the most probable causes for the anomaly.'),
  actionableSteps: z
    .array(z.string())
    .describe('A list of actionable steps the farmer can take.'),
  confidenceScore: z
    .number()
    .min(0)
    .max(1)
    .describe('A confidence score (0.0 to 1.0) for the analysis.'),
});
export type FieldAnomalyAnalysisRecommendationOutput = z.infer<
  typeof FieldAnomalyAnalysisRecommendationOutputSchema
>;

export async function fieldAnomalyAnalysisRecommendation(
  input: FieldAnomalyAnalysisRecommendationInput
): Promise<FieldAnomalyAnalysisRecommendationOutput> {
  return fieldAnomalyAnalysisRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fieldAnomalyAnalysisPrompt',
  input: { schema: FieldAnomalyAnalysisRecommendationInputSchema },
  output: { schema: FieldAnomalyAnalysisRecommendationOutputSchema },
  prompt: `You are an expert agronomist providing hyper-localized, actionable advice to farmers.

The farmer has identified an anomaly in their field and needs your expert opinion on the probable causes and immediate actionable steps.

Here is the information provided by the farmer:
Anomaly Description: {{{anomalyDescription}}}
Field Details: {{{fieldDetails}}}
Crop Type: {{{cropType}}}
Current Growth Stage: {{{currentGrowthStage}}}
Recent Weather Conditions: {{{recentWeatherConditions}}}

{{#if photoDataUri}}
Photo of Anomaly: {{media url=photoDataUri}}
{{/if}}

Based on this information, provide:
1. A list of probable causes for the anomaly. Rank them by likelihood if possible.
2. A list of specific, actionable steps the farmer can take immediately to address the issue or investigate further.
3. A confidence score (0.0 to 1.0) for your analysis, indicating how certain you are given the available information.

Ensure your response is concise, clear, and directly addresses the farmer's need for actionable advice.`,
});

const fieldAnomalyAnalysisRecommendationFlow = ai.defineFlow(
  {
    name: 'fieldAnomalyAnalysisRecommendationFlow',
    inputSchema: FieldAnomalyAnalysisRecommendationInputSchema,
    outputSchema: FieldAnomalyAnalysisRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('No output received from the AI model.');
    }
    return output;
  }
);
