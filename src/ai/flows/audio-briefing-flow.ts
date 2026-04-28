
'use server';
/**
 * @fileOverview A Genkit flow that converts a textual farm summary into a high-fidelity audio briefing.
 *
 * - generateAudioBriefing - Converts text to speech for operational situational awareness.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Writer } from 'wav';
import { googleAI } from '@genkit-ai/google-genai';

const AudioBriefingInputSchema = z.string().describe('The text summary of the farm status to convert to audio.');
export type AudioBriefingInput = z.infer<typeof AudioBriefingInputSchema>;

const AudioBriefingOutputSchema = z.object({
  audioUri: z.string().describe('The generated audio as a data URI.'),
});
export type AudioBriefingOutput = z.infer<typeof AudioBriefingOutputSchema>;

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

export async function generateAudioBriefing(input: AudioBriefingInput): Promise<AudioBriefingOutput> {
  return generateAudioBriefingFlow(input);
}

const generateAudioBriefingFlow = ai.defineFlow(
  {
    name: 'generateAudioBriefingFlow',
    inputSchema: AudioBriefingInputSchema,
    outputSchema: AudioBriefingOutputSchema,
  },
  async (text) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: `Speak the following agricultural status report in a professional, calm, and helpful tone for a master agronomist. 

Report: ${text}`,
    });

    if (!media) {
      throw new Error('No audio media returned from the model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audioUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
