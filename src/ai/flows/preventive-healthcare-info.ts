'use server';
/**
 * @fileOverview An AI agent that provides preventive healthcare information for various diseases.
 *
 * - getPreventiveHealthcareInfo - A function that retrieves preventive healthcare information.
 * - PreventiveHealthcareInfoInput - The input type for the getPreventiveHealthcareInfo function.
 * - PreventiveHealthcareInfoOutput - The return type for the getPreventiveHealthcareInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PreventiveHealthcareInfoInputSchema = z.object({
  disease: z.string().describe('The disease to get preventive healthcare information for.'),
});
export type PreventiveHealthcareInfoInput = z.infer<typeof PreventiveHealthcareInfoInputSchema>;

const PreventiveHealthcareInfoOutputSchema = z.object({
  preventiveMeasures: z.string().describe('Evidence-based preventive measures for the specified disease.'),
  applicationGuidance: z.string().describe('Guidance on how and when to apply each prevention method.'),
});
export type PreventiveHealthcareInfoOutput = z.infer<typeof PreventiveHealthcareInfoOutputSchema>;

export async function getPreventiveHealthcareInfo(
  input: PreventiveHealthcareInfoInput
): Promise<PreventiveHealthcareInfoOutput> {
  return preventiveHealthcareInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'preventiveHealthcareInfoPrompt',
  input: {schema: PreventiveHealthcareInfoInputSchema},
  output: {schema: PreventiveHealthcareInfoOutputSchema},
  prompt: `You are a healthcare assistant providing evidence-based preventive healthcare information.

  Provide preventive measures and guidance on how and when to apply each prevention method for the following disease:

  Disease: {{{disease}}}
  `,
});

const preventiveHealthcareInfoFlow = ai.defineFlow(
  {
    name: 'preventiveHealthcareInfoFlow',
    inputSchema: PreventiveHealthcareInfoInputSchema,
    outputSchema: PreventiveHealthcareInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
