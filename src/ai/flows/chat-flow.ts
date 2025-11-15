'use server';
/**
 * @fileOverview A conversational AI flow for the HealthWise assistant.
 *
 * This flow manages a chat conversation, maintaining history and using a
 * system prompt to guide the AI's behavior as a helpful health assistant.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schemas are defined inside the function that uses them.
// The type is exported for use in the client component.
const ChatContentSchema = z.object({
  text: z.string(),
});

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(ChatContentSchema),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatRequestSchema = z.object({
  history: z.array(ChatMessageSchema),
  prompt: z.string(),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const ChatResponseSchema = z.object({
  text: z.string(),
});
export type ChatResponse = z.infer<typeof ChatResponseSchema>;

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatRequestSchema,
    outputSchema: ChatResponseSchema,
  },
  async ({ history, prompt }) => {
    const { text } = await ai.generate({
      prompt,
      history,
      system: `You are a friendly and helpful AI assistant for HealthWise.
Your goal is to provide accurate and easy-to-understand health information.
Always be supportive and empathetic.
When appropriate, you can suggest the user navigate to other pages of the app, like 'Symptom Guidance' or 'Preventive Care', but do not provide links.
You MUST NOT provide medical advice, diagnosis, or treatment. Always include a disclaimer to consult a healthcare professional for any health concerns.`,
    });

    return { text };
  }
);


export async function chat(request: ChatRequest): Promise<ChatResponse> {
  return await chatFlow(request);
}
