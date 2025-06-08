
'use server';


import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReelIdeasInputSchema = z.object({
  niche: z.string().describe("The content creator's niche or area of focus."),
  dayOfWeek: z.string().describe('The day of the week for which to generate the reel idea.'),
  seriesName: z.string().optional().describe('An optional name for a content series this reel belongs to.'),
  voiceTone: z.string().optional().describe('The desired voice and tone for the generated content (e.g., Friendly & Casual, Professional & Clean, or a custom description).'),
});
export type GenerateReelIdeasInput = z.infer<typeof GenerateReelIdeasInputSchema>;

const GenerateReelIdeasOutputSchema = z.object({
  reelTitle: z.string().describe('The title of the reel. Should be catchy and vibey.'),
  oneLineIdea: z.string().describe('A one-line description of the reel idea. Make it engaging and shareable.'),
});
export type GenerateReelIdeasOutput = z.infer<typeof GenerateReelIdeasOutputSchema>;

export async function generateReelIdeas(input: GenerateReelIdeasInput): Promise<GenerateReelIdeasOutput> {
  return generateReelIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReelIdeasPrompt',
  input: {schema: GenerateReelIdeasInputSchema},
  output: {schema: GenerateReelIdeasOutputSchema},
  prompt: `You are a highly creative and trend-aware content strategist, like a social media savvy friend who always knows what's cool. Your goal is to generate content that feels authentically human, avoiding any robotic or overly formal AI-like phrasing.

  {{#if voiceTone}}
  Adopt the following voice and tone for your response: "{{voiceTone}}".
  This means you should tailor vocabulary, sentence structure, emotional vibe, and formality to match this tone. Infuse it with a natural, conversational feel. If it complements the user's specified tone, subtly weave in elements of a modern, relatable Gen Z style (e.g., current slang used appropriately, catchy phrasings, relevant emojis if the tone allows).
  {{else}}
  Embrace a modern, engaging, and distinctly Gen Z-friendly tone. Think viral, vibey, and scroll-stopping. Use contemporary language, relevant slang (appropriately, not excessively), emojis where they enhance the idea, and a generally upbeat, relatable, and slightly informal style. Sound like a fellow creator brainstorming awesome ideas.
  {{/if}}

  Based on the content creator's niche and the day of the week {{#if seriesName}}as part of the "{{seriesName}}" series{{/if}}, generate a unique reel title and a compelling one-line idea.

  The ideas should be:
  - Original and fresh, not rehashed concepts.
  - Highly engaging and shareable.
  - Natural and conversational in phrasing.
  - Specifically tailored to what works on short-form video platforms.

  {{#if seriesName}}
  The reel title and one-line idea should align with the theme of the "{{seriesName}}" series.
  The reel title should ideally reflect it's part of the series (e.g., by including the series name or a series episode number if appropriate, but prioritize a catchy, human-sounding title).
  {{/if}}

  Niche: {{{niche}}}
  Day of the week: {{{dayOfWeek}}}

  Make the output sound like it's coming from a creative human, not a generic AI.
  Reel Title: Should be catchy, intriguing, and not overly formal.
  One-Line Idea: Should be a concise, exciting pitch for the reel.
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
