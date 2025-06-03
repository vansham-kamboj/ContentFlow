
// use server'

/**
 * @fileOverview Generates interactive Instagram Story prompts based on a user-provided niche.
 *
 * - generateInstagramStoryPrompts - A function that generates the prompts.
 * - GenerateInstagramStoryPromptsInput - The input type for the generateInstagramStoryPrompts function.
 * - GenerateInstagramStoryPromptsOutput - The output type for the generateInstagramStoryPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInstagramStoryPromptsInputSchema = z.object({
  niche: z.string().describe('The specific niche or topic for the Instagram Story prompts.'),
});
export type GenerateInstagramStoryPromptsInput = z.infer<typeof GenerateInstagramStoryPromptsInputSchema>;

const GenerateInstagramStoryPromptsOutputSchema = z.object({
  prompts: z
    .array(z.string())
    .describe('An array of interactive Instagram Story prompts, such as polls, Q&A, or opinion sliders.'),
});
export type GenerateInstagramStoryPromptsOutput = z.infer<typeof GenerateInstagramStoryPromptsOutputSchema>;

export async function generateInstagramStoryPrompts(
  input: GenerateInstagramStoryPromptsInput
): Promise<GenerateInstagramStoryPromptsOutput> {
  return generateInstagramStoryPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramStoryPromptsPrompt',
  input: {schema: GenerateInstagramStoryPromptsInputSchema},
  output: {schema: GenerateInstagramStoryPromptsOutputSchema},
  prompt: `You are a social media expert specializing in creating engaging Instagram Stories.

  Based on the user's niche, generate a list of creative and interactive Instagram Story prompts, including polls, Q&A, 'This or That' scenarios, and opinion sliders, that will boost audience interaction.

  Niche: {{{niche}}}

  Provide the prompts as a list of strings.
  `,
});

const generateInstagramStoryPromptsFlow = ai.defineFlow(
  {
    name: 'generateInstagramStoryPromptsFlow',
    inputSchema: GenerateInstagramStoryPromptsInputSchema,
    outputSchema: GenerateInstagramStoryPromptsOutputSchema,
  },
  async (input): Promise<GenerateInstagramStoryPromptsOutput> => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (e: any) {
      if (e instanceof Error && (e.message.includes('[503 Service Unavailable]') || e.message.includes('The model is overloaded'))) {
        throw new Error("The AI service is currently experiencing high demand and is temporarily unavailable. Please try again in a few moments.");
      }
      throw e;
    }
  }
);
