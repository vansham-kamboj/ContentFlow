'use server';

/**
 * @fileOverview Generates a reel script, caption, and hashtags based on a reel idea.
 *
 * - generateReelScript - A function that generates the reel script, caption, and hashtags.
 * - GenerateReelScriptInput - The input type for the generateReelScript function.
 * - GenerateReelScriptOutput - The return type for the generateReelScript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReelScriptInputSchema = z.object({
  reelTitle: z.string().describe('The title of the reel.'),
  reelIdea: z.string().describe('A one-line description of the reel idea.'),
  userNiche: z.string().describe('The content creator\'s niche or area of expertise.'),
});
export type GenerateReelScriptInput = z.infer<typeof GenerateReelScriptInputSchema>;

const GenerateReelScriptOutputSchema = z.object({
  reelScript: z.string().describe('A short, informative script for the reel.'),
  caption: z.string().describe('A ready-to-use caption for the reel.'),
  hashtags: z.array(z.string()).describe('A list of trending hashtags to promote the reel.'),
});
export type GenerateReelScriptOutput = z.infer<typeof GenerateReelScriptOutputSchema>;

export async function generateReelScript(input: GenerateReelScriptInput): Promise<GenerateReelScriptOutput> {
  return generateReelScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReelScriptPrompt',
  input: {schema: GenerateReelScriptInputSchema},
  output: {schema: GenerateReelScriptOutputSchema},
  prompt: `You are a social media expert specializing in creating engaging reels.

  Based on the reel idea and the user's niche, generate a short reel script, a ready-to-use caption, and a list of trending hashtags.

  User Niche: {{{userNiche}}}
  Reel Title: {{{reelTitle}}}
  Reel Idea: {{{reelIdea}}}

  Ensure the reel script is informative and engaging, the caption is catchy and relevant, and the hashtags are trending and appropriate for the content.

  Here are the instructions for output format:
  - reelScript: a concise script for a short form video in the style of a TikTok or Instagram Reel. The script should provide interesting and relevant content for the specified user niche and reel idea.
  - caption: a short but attention-grabbing caption that summarizes the reel and entices viewers to watch it.
  - hashtags: An array of strings containing high-trending and relevant hashtags. Each hashtag should be optimized for the specified user niche and reel idea.
  `,
});

const generateReelScriptFlow = ai.defineFlow(
  {
    name: 'generateReelScriptFlow',
    inputSchema: GenerateReelScriptInputSchema,
    outputSchema: GenerateReelScriptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
