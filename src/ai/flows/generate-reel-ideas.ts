
'use server';

/**
 * @fileOverview A reel idea generation AI agent.
 *
 * - generateReelIdeas - A function that handles the reel idea generation process.
 * - GenerateReelIdeasInput - The input type for the generateReelIdeas function.
 * - GenerateReelIdeasOutput - The return type for the generateReelIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReelIdeasInputSchema = z.object({
  niche: z.string().describe('The content creator\'s niche or area of focus.'),
  dayOfWeek: z.string().describe('The day of the week for which to generate the reel idea.'),
});
export type GenerateReelIdeasInput = z.infer<typeof GenerateReelIdeasInputSchema>;

const GenerateReelIdeasOutputSchema = z.object({
  reelTitle: z.string().describe('The title of the reel.'),
  oneLineIdea: z.string().describe('A one-line description of the reel idea.'),
});
export type GenerateReelIdeasOutput = z.infer<typeof GenerateReelIdeasOutputSchema>;

export async function generateReelIdeas(input: GenerateReelIdeasInput): Promise<GenerateReelIdeasOutput> {
  return generateReelIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReelIdeasPrompt',
  input: {schema: GenerateReelIdeasInputSchema},
  output: {schema: GenerateReelIdeasOutputSchema},
  prompt: `You are a creative content strategist specializing in generating engaging reel ideas.

  Based on the content creator's niche and the day of the week, generate a unique reel title and a compelling one-line idea.

  Niche: {{{niche}}}
  Day of the week: {{{dayOfWeek}}}
  `,
});

const generateReelIdeasFlow = ai.defineFlow(
  {
    name: 'generateReelIdeasFlow',
    inputSchema: GenerateReelIdeasInputSchema,
    outputSchema: GenerateReelIdeasOutputSchema,
  },
  async (input): Promise<GenerateReelIdeasOutput> => {
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
