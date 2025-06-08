
'use server';


import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReelScriptInputSchema = z.object({
  reelTitle: z.string().describe('The title of the reel.'),
  reelIdea: z.string().describe('A one-line description of the reel idea.'),
  userNiche: z.string().describe("The content creator's niche or area of expertise."),
  seriesName: z.string().optional().describe('An optional name for a content series this reel belongs to.'),
  voiceTone: z.string().optional().describe('The desired voice and tone for the generated content (e.g., Friendly & Casual, Professional & Clean, or a custom description).'),
});
export type GenerateReelScriptInput = z.infer<typeof GenerateReelScriptInputSchema>;

const GenerateReelScriptOutputSchema = z.object({
  reelScript: z.string().describe('A short, informative script for the reel. Should sound natural and conversational, like someone actually talking.'),
  caption: z.string().describe('A ready-to-use caption for the reel. Make it engaging and human-sounding, with relevant emojis.'),
  hashtags: z.array(z.string()).describe('A list of trending and niche-specific hashtags to promote the reel. Avoid generic lists.'),
});
export type GenerateReelScriptOutput = z.infer<typeof GenerateReelScriptOutputSchema>;

export async function generateReelScript(input: GenerateReelScriptInput): Promise<GenerateReelScriptOutput> {
  return generateReelScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReelScriptPrompt',
  input: {schema: GenerateReelScriptInputSchema},
  output: {schema: GenerateReelScriptOutputSchema},
  prompt: `You are a top-tier social media content creator and scriptwriter, known for making viral, authentic, and highly relatable short-form video content. Your primary goal is to generate content that feels 100% human-written, avoiding any robotic or generic AI phrasing.

  {{#if voiceTone}}
  Adopt the following voice and tone for your response: "{{voiceTone}}".
  This means you should fully embody this tone in your vocabulary, sentence structure, emotional expression, and formality. Make it sound completely natural and conversational. If it complements the user's specified tone, subtly weave in elements of a modern, relatable Gen Z style (e.g., current slang used appropriately, engaging phrasings, relevant emojis).
  {{else}}
  Embrace a modern, engaging, and distinctly Gen Z-friendly tone. This means using contemporary language, relevant slang (authentically, not forced), emojis where they add personality, and a generally upbeat, relatable, and conversational style. The script should sound like a friend talking, not a formal presentation.
  {{/if}}

  Based on the reel idea, the user's niche, and an optional series name, generate:
  1. Reel Script: A short, informative script. It MUST sound like someone is actually talking, not reading an essay. Use contractions (like "you're," "it's"), casual language, and maybe even a bit of humor if it fits the niche and tone. Keep sentences relatively short and punchy. Structure it with clear visual cues or scene descriptions if helpful (e.g., "Scene 1: Quick shot of X...").
  2. Caption: A ready-to-use caption. Make it engaging, include a call to action or question if appropriate. Emojis are good. It should feel personal and inviting.
  3. Hashtags: A list of 3-7 trending AND niche-specific hashtags. Avoid overly generic ones; aim for a mix that maximizes reach and targets the right audience.

  User Niche: {{{userNiche}}}
  Reel Title: {{{reelTitle}}}
  Reel Idea: {{{reelIdea}}}
  {{#if seriesName}}
  This reel is part of the "{{seriesName}}" series.
  - Mention the series name naturally within the reel script where appropriate.
  - Include the series name or a series-specific hashtag in the caption.
  - Include a series-specific hashtag if applicable in the hashtags list (e.g., #{{seriesName}} or #{{seriesName}}Series).
  {{/if}}

  Ensure the output is high-quality, sounds authentically human, and is optimized for engagement on platforms like Instagram Reels or TikTok.
  Avoid repetitive sentence starters or overly academic explanations. Think like a creator, for a creator.
  `,
});

const generateReelScriptFlow = ai.defineFlow(
  {
    name: 'generateReelScriptFlow',
    inputSchema: GenerateReelScriptInputSchema,
    outputSchema: GenerateReelScriptOutputSchema,
  },
  async (input): Promise<GenerateReelScriptOutput> => {
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
