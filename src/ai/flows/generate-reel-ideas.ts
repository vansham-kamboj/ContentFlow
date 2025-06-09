
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
  niche: z.string().describe("The content creator's niche or area of focus."),
  dayOfWeek: z.string().describe('The day of the week for which to generate the reel idea.'),
  seriesName: z.string().optional().describe('An optional name for a content series this reel belongs to.'),
  voiceTone: z.string().optional().describe('The desired voice and tone for the generated content (e.g., Friendly & Casual, Professional & Clean, or a custom description).'),
});
export type GenerateReelIdeasInput = z.infer<typeof GenerateReelIdeasInputSchema>;

const GenerateReelIdeasOutputSchema = z.object({
  reelTitle: z.string().describe('The title of the reel. Should be catchy, intriguing, and clickbait-style to maximize views.'),
  oneLineIdea: z.string().describe('A one-line description of the reel idea. Make it super engaging, shareable, and create a strong sense of curiosity or urgency.'),
});
export type GenerateReelIdeasOutput = z.infer<typeof GenerateReelIdeasOutputSchema>;

export async function generateReelIdeas(input: GenerateReelIdeasInput): Promise<GenerateReelIdeasOutput> {
  return generateReelIdeasFlow(input);
}

const commonSafetySettings = [
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
];

const prompt = ai.definePrompt({
  name: 'generateReelIdeasPrompt',
  input: {schema: GenerateReelIdeasInputSchema},
  output: {schema: GenerateReelIdeasOutputSchema},
  config: {
    safetySettings: commonSafetySettings,
  },
  prompt: `You are a highly creative and trend-aware content strategist, specializing in viral, "clickbait-style" reel ideas that people can't resist watching. Your goal is to generate content that feels authentically human, while maximizing intrigue and shareability.

  {{#if voiceTone}}
  Adopt the following voice and tone for your response: "{{voiceTone}}".
  This means you should tailor vocabulary, sentence structure, emotional vibe, and formality to match this tone. Infuse it with a natural, conversational feel. If it complements the user's specified tone, subtly weave in elements of a modern, relatable Gen Z style (e.g., current slang used appropriately, catchy phrasings, relevant emojis if the tone allows).
  {{else}}
  Embrace a modern, engaging, and distinctly Gen Z-friendly tone. Think viral, vibey, and scroll-stopping. Use contemporary language, relevant slang (appropriately, not excessively), emojis where they enhance the idea, and a generally upbeat, relatable, and slightly informal style. Sound like a fellow creator brainstorming awesome ideas.
  {{/if}}

  Based on the content creator's niche and the day of the week {{#if seriesName}}as part of the "{{seriesName}}" series{{/if}}, generate a unique reel title and a compelling one-line idea.

  The ideas MUST be:
  - **Highly Clickbaity & Intriguing**: Titles should be irresistible (e.g., "You WON'T BELIEVE what happens next!", "The #1 Secret to X NO ONE is talking about", "Why I Quit Y and You Should Too"). One-liners should create intense curiosity or promise significant value/shock.
  - Original and fresh, not rehashed concepts.
  - Highly engaging and designed for maximum shareability.
  - Natural and conversational in phrasing, even with the clickbait angle.
  - Specifically tailored to what works on short-form video platforms.

  {{#if seriesName}}
  The reel title and one-line idea should align with the theme of the "{{seriesName}}" series, while still being clickbaity.
  The reel title should ideally reflect it's part of the series (e.g., by including the series name or a series episode number if appropriate, but prioritize a catchy, human-sounding title that grabs attention).
  {{/if}}

  Niche: {{{niche}}}
  Day of the week: {{{dayOfWeek}}}

  Make the output sound like it's coming from a creative human, not a generic AI.
  Reel Title: Should be extremely catchy, intriguing, and designed to stop the scroll. Use techniques like questions, bold statements, number lists, or tease a secret.
  One-Line Idea: Should be a concise, exciting pitch for the reel that makes people *need* to know more. Hint at a problem solved, a shocking discovery, or an unbelievable story.
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
      if (!output) {
        console.error('generateReelIdeasFlow: AI prompt returned undefined/null for input:', input);
        throw new Error('AI failed to generate a valid response structure for reel ideas. Please try again or refine your input.');
      }
      return output;
    } catch (e: any) {
      if (e instanceof Error && (e.message.includes('[503 Service Unavailable]') || e.message.includes('The model is overloaded'))) {
        throw new Error("The AI service is currently experiencing high demand and is temporarily unavailable. Please try again in a few moments.");
      }
      console.error('Error in generateReelIdeasFlow:', e);
      if (e instanceof Error) {
        throw e;
      }
      throw new Error(`An unexpected issue occurred while generating reel ideas: ${String(e)}`);
    }
  }
);

