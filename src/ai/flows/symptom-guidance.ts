'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing symptom guidance to users.
 *
 * The flow takes user-reported symptoms as input and returns possible conditions,
 * considering any outbreak alerts in the user's area.
 *
 * @interface SymptomGuidanceInput - Represents the input for the symptom guidance flow.
 * @interface SymptomGuidanceOutput - Represents the output of the symptom guidance flow.
 * @function symptomGuidance - The main function to initiate the symptom guidance flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getOutbreakAlerts } from '@/lib/outbreak-alerts';

const SymptomGuidanceInputSchema = z.object({
  symptoms: z.string().describe('A description of the symptoms the user is experiencing.'),
  location: z.string().describe('The user provided location to check for local outbreak alerts.'),
});
export type SymptomGuidanceInput = z.infer<typeof SymptomGuidanceInputSchema>;

const SymptomGuidanceOutputSchema = z.object({
  possibleConditions: z
    .string()
    .describe(
      'A list of possible medical conditions based on the symptoms and considering outbreak alerts.'
    ),
  disclaimer: z
    .string()
    .describe(
      'A disclaimer that the information provided is not a substitute for professional medical advice.'
    ),
});
export type SymptomGuidanceOutput = z.infer<typeof SymptomGuidanceOutputSchema>;

export async function symptomGuidance(input: SymptomGuidanceInput): Promise<SymptomGuidanceOutput> {
  return symptomGuidanceFlow(input);
}

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
  prompt: `You are an AI-driven health assistant that provides guidance on possible medical conditions based on user-reported symptoms.

  Take into account the user's location to check for any relevant disease outbreak alerts in the area by using the getOutbreakAlerts tool.
  Based on the symptoms and any outbreak alerts, provide a list of possible conditions.

  Symptoms: {{{symptoms}}}
  Location: {{{location}}}

  Include a disclaimer that the information provided is not a substitute for professional medical advice.
  Format the output as a JSON object that satisfies the SymptomGuidanceOutputSchema.`,
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
