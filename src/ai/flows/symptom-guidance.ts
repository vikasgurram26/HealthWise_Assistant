'use server';
/**
 * @fileOverview This file defines an interactive Genkit flow for intelligent symptom triage.
 *
 * The flow manages a conversation to collect symptoms, asks follow-up questions,
 * and eventually provides an analysis with probability levels for possible conditions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getOutbreakAlerts } from '@/lib/outbreak-alerts';

const TriageMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  text: z.string(),
});
export type TriageMessage = z.infer<typeof TriageMessageSchema>;

const SymptomGuidanceInputSchema = z.object({
  history: z.array(TriageMessageSchema).describe('The conversation history of the triage.'),
  location: z.string().describe('The user provided location to check for local outbreak alerts.'),
});
export type SymptomGuidanceInput = z.infer<typeof SymptomGuidanceInputSchema>;

const SymptomGuidanceOutputSchema = z.object({
  status: z.enum(['collecting_info', 'analysis_complete']).describe('Whether more info is needed or analysis is done.'),
  message: z.string().describe('The AI response to the user (e.g., follow-up questions or final summary).'),
  analysis: z.array(z.object({
    condition: z.string(),
    probability: z.number().describe('Probability percentage from 0 to 100'),
    reasoning: z.string(),
  })).optional().describe('The structured analysis of possible conditions.'),
  disclaimer: z.string().describe('Standard medical disclaimer.'),
});
export type SymptomGuidanceOutput = z.infer<typeof SymptomGuidanceOutputSchema>;

const getOutbreakAlertsTool = ai.defineTool(
    {
      name: 'getOutbreakAlerts',
      description: 'Get disease outbreak alerts for a specific location.',
      inputSchema: z.object({ location: z.string() }),
      outputSchema: z.array(z.object({
          disease: z.string(),
          alertLevel: z.string(),
      })),
    },
    async ({ location }) => {
      return getOutbreakAlerts(location);
    }
  );

const symptomGuidancePrompt = ai.definePrompt({
  name: 'symptomGuidancePrompt',
  input: {schema: SymptomGuidanceInputSchema},
  output: {schema: SymptomGuidanceOutputSchema},
  tools: [getOutbreakAlertsTool],
  prompt: `You are an expert AI triage assistant. Your goal is to help users understand their symptoms through a dynamic conversation.

  GUIDELINES:
  1. If the user provides vague symptoms, ask concise follow-up questions (one or two at a time) to understand the severity, duration, and specific characteristics.
  2. Set "status" to "collecting_info" while you are still asking questions.
  3. Once you have enough information, set "status" to "analysis_complete" and provide a structured list of possible conditions with probability levels (e.g., "70% Flu", "20% Common Cold").
  4. Always use the getOutbreakAlerts tool for the provided location ({{{location}}}) to see if local outbreaks might explain the symptoms.
  5. Your tone should be clinical, professional, but empathetic.

  CONVERSATION HISTORY:
  {{#each history}}
  {{role}}: {{{text}}}
  {{/each}}

  Always include a standard medical disclaimer.`,
});

const symptomGuidanceFlow = ai.defineFlow(
  {
    name: 'symptomGuidanceFlow',
    inputSchema: SymptomGuidanceInputSchema,
    outputSchema: SymptomGuidanceOutputSchema,
  },
  async input => {
    const {output} = await symptomGuidancePrompt(input);
    return output!;
  }
);

export async function symptomGuidance(input: SymptomGuidanceInput): Promise<SymptomGuidanceOutput> {
  try {
    return await symptomGuidanceFlow(input);
  } catch (error) {
    console.error('Symptom Guidance AI Error:', error);
    return {
      status: 'collecting_info',
      message: "I'm sorry, I'm having trouble analyzing your symptoms right now due to a temporary service interruption. Please try again in a moment.",
      disclaimer: "If you are experiencing a medical emergency, please contact your local emergency services immediately."
    };
  }
}
