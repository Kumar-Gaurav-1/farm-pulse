
'use server';
/**
 * @fileOverview A Genkit flow that converts a textual farm summary into a high-fidelity audio briefing.
 *
 * - generateAudioBriefing - Converts text to speech for operational situational awareness.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const AudioBriefingInputSchema = z.string().describe('The text summary of the farm status to convert to audio.');
export type AudioBriefingInput = z.infer<typeof AudioBriefingInputSchema>;

const AudioBriefingOutputSchema = z.object({
  audioUri: z.string().describe('The generated audio as a data URI.'),
});
export type AudioBriefingOutput = z.infer<typeof AudioBriefingOutputSchema>;

/**
 * Optimizes WAV conversion by directly generating the WAV header and
 * concatenating it with PCM data. This avoids event loop stalling from
 * stream piping of potentially large audio chunks.
 */
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  const dataSize = pcmData.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(dataSize + 36, 4);
  header.write('WAVE', 8);

  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * channels * sampleWidth, 28);
  header.writeUInt16LE(channels * sampleWidth, 32);
  header.writeUInt16LE(sampleWidth * 8, 34);

  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  const wavBuffer = Buffer.concat([header, pcmData]);
  return wavBuffer.toString('base64');
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
