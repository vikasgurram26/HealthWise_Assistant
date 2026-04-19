'use server';
/**
 * @fileOverview A Genkit flow that generates a welcome video for the user.
 * 
 * This flow uses the Veo 3 model to create a high-quality video of a 
 * futuristic robotic medical assistant giving a warm welcome.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const WelcomeVideoOutputSchema = z.object({
  videoDataUri: z.string().describe('The generated video as a base64 data URI.'),
});
export type WelcomeVideoOutput = z.infer<typeof WelcomeVideoOutputSchema>;

export async function generateWelcomeVideo(): Promise<WelcomeVideoOutput> {
  return welcomeVideoFlow({});
}

const welcomeVideoFlow = ai.defineFlow(
  {
    name: 'welcomeVideoFlow',
    inputSchema: z.object({}),
    outputSchema: WelcomeVideoOutputSchema,
  },
  async () => {
    // We use Veo 3 for the highest quality preview with motion
    let { operation } = await ai.generate({
      model: googleAI.model('veo-3.0-generate-preview'),
      prompt: 'A friendly, futuristic robotic medical assistant avatar, sleek high-tech design in white and clinical blue, smiling and waving a greeting, cinematic laboratory background, 3D animated render style, 4k, warm lighting.',
    });

    if (!operation) {
      throw new Error('Expected the model to return a video generation operation');
    }

    // Wait for the video generation to complete
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      if (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    if (operation.error) {
      throw new Error('Failed to generate welcome video: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart || !videoPart.media?.url) {
      throw new Error('Failed to find the generated video in output');
    }

    // Fetch the video content and convert to base64
    const response = await fetch(`${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`);
    const buffer = await response.arrayBuffer();
    const base64Video = Buffer.from(buffer).toString('base64');

    return {
      videoDataUri: `data:video/mp4;base64,${base64Video}`,
    };
  }
);
