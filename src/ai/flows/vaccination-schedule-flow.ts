'use server';
/**
 * @fileOverview An AI agent that provides vaccination schedule recommendations.
 *
 * - getVaccinationSchedule - A function that retrieves recommended vaccinations for an age group.
 * - VaccinationScheduleInput - The input type for the getVaccinationSchedule function.
 * - VaccinationScheduleOutput - The return type for the getVaccinationSchedule function.
 * - Vaccination - Represents a single vaccine recommendation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VaccinationScheduleInputSchema = z.object({
  ageGroup: z
    .string()
    .describe('The age group to get vaccination recommendations for.'),
});
export type VaccinationScheduleInput = z.infer<
  typeof VaccinationScheduleInputSchema
>;

const VaccinationSchema = z.object({
  vaccine: z.string().describe('The name of the vaccine.'),
  purpose: z.string().describe('The purpose of the vaccine.'),
  schedule: z.string().describe('The recommended schedule for the vaccine.'),
});
export type Vaccination = z.infer<typeof VaccinationSchema>;

const VaccinationScheduleOutputSchema = z.object({
  recommendations: z
    .array(VaccinationSchema)
    .describe('A list of recommended vaccinations.'),
});
export type VaccinationScheduleOutput = z.infer<
  typeof VaccinationScheduleOutputSchema
>;

export async function getVaccinationSchedule(
  input: VaccinationScheduleInput
): Promise<VaccinationScheduleOutput> {
  return vaccinationScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vaccinationSchedulePrompt',
  input: { schema: VaccinationScheduleInputSchema },
  output: { schema: VaccinationScheduleOutputSchema },
  prompt: `You are a healthcare assistant providing vaccination schedule information based on CDC guidelines.

  Provide a list of recommended vaccinations, their purpose, and their typical schedule for the following age group:

  Age Group: {{{ageGroup}}}
  `,
});

const vaccinationScheduleFlow = ai.defineFlow(
  {
    name: 'vaccinationScheduleFlow',
    inputSchema: VaccinationScheduleInputSchema,
    outputSchema: VaccinationScheduleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
