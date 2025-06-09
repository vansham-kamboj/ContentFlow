
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
  reelTitle: z.string().describe('The title of the reel (should be catchy and potentially clickbaity).'),
  reelIdea: z.string().describe('A one-line description of the reel idea (should be engaging and create curiosity).'),
  userNiche: z.string().describe("The content creator's niche or area of expertise."),
  seriesName: z.string().optional().describe('An optional name for a content series this reel belongs to.'),
  voiceTone: z.string().optional().describe('The desired voice and tone for the generated content (e.g., Friendly & Casual, Professional & Clean, or a custom description).'),
});
export type GenerateReelScriptInput = z.infer<typeof GenerateReelScriptInputSchema>;

const GenerateReelScriptOutputSchema = z.object({
  reelScript: z.string().describe('A short, informative script for the reel. The opening hook MUST be extremely strong and deliver on the promise of the title/idea. It should sound natural and conversational, like someone actually talking.'),
  caption: z.string().describe('A ready-to-use caption for the reel. Make it highly engaging, create curiosity, encourage comments/shares, and use relevant emojis. Should complement the clickbait nature of the reel.'),
  hashtags: z.array(z.string()).describe('A list of trending and niche-specific hashtags to promote the reel. Avoid generic lists. Include some broader tags if relevant to the clickbait angle for reach.'),
});
export type GenerateReelScriptOutput = z.infer<typeof GenerateReelScriptOutputSchema>;

export async function generateReelScript(input: GenerateReelScriptInput): Promise<GenerateReelScriptOutput> {
  return generateReelScriptFlow(input);
}

const commonSafetySettings = [
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
];

const prompt = ai.definePrompt({
  name: 'generateReelScriptPrompt',
  input: {schema: GenerateReelScriptInputSchema},
  output: {schema: GenerateReelScriptOutputSchema},
  config: {
    safetySettings: commonSafetySettings,
  },
  prompt: `You are a top-tier social media content creator and scriptwriter, known for making viral, authentic, and highly relatable short-form video content with "clickbait" appeal that converts views. Your primary goal is to generate content that feels 100% human-written, while being extremely engaging and curiosity-driven.

  {{#if voiceTone}}
  Adopt the following voice and tone for your response: "{{voiceTone}}".
  This means you should fully embody this tone in your vocabulary, sentence structure, emotional expression, and formality. Make it sound completely natural and conversational. If it complements the user's specified tone, subtly weave in elements of a modern, relatable Gen Z style (e.g., current slang used appropriately, engaging phrasings, relevant emojis).
  {{else}}
  Embrace a modern, engaging, and distinctly Gen Z-friendly tone. This means using contemporary language, relevant slang (authentically, not forced), emojis where they add personality, and a generally upbeat, relatable, and conversational style. The script should sound like a friend talking, not a formal presentation.
  {{/if}}

  Based on the clickbaity reel title and idea, the user's niche, and an optional series name, generate:
  1. Reel Script:
      - **Crucial Hook**: The first 3-5 seconds MUST be incredibly compelling and directly tie into the clickbait title/idea. Make viewers *need* to see what happens.
      - **Content Delivery**: The rest of the script should provide value, entertainment, or the promised information in an engaging way. It should sound like someone is actually talking, not reading an essay. Use contractions (like "you're," "it's"), casual language, and maybe even a bit of humor if it fits the niche and tone.
      - **Pacing**: Keep sentences relatively short and punchy. Structure it with clear visual cues or scene descriptions if helpful (e.g., "Scene 1: Quick shot of X...").
  2. Caption:
      - **Engagement Focus**: Make it super engaging. Ask a question related to the reel's topic, use a strong call to action (e.g., "Comment your thoughts below!", "Tag a friend who needs to see this!"), or create a statement that invites discussion.
      - **Curiosity Driven**: Complement the clickbait nature of the reel. Tease the content without giving everything away.
      - **Emojis**: Use relevant emojis to enhance readability and tone.
      - **Human Sounding**: It should feel personal and inviting.
  3. Hashtags:
      - Provide a list of 5-7 highly effective hashtags.
      - **Relevance is Key**: Hashtags must be directly relevant to the '{{{userNiche}}}', '{{{reelTitle}}}', and '{{{reelIdea}}}'.
      - **Strategic Mix**: Include a combination of:
          - 1-2 broader, high-traffic hashtags that align with general interest or the clickbait angle for discoverability (what might be considered "trending" in a general sense based on your training).
          - 2-3 niche-specific hashtags that target the specific audience interested in '{{{userNiche}}}'.
          - 1-2 community-focused or engaging hashtags (e.g., related to challenges, discussions).
      - **Current & Effective**: Select hashtags that reflect common best practices for discoverability and engagement on platforms like Instagram Reels and TikTok, based on your knowledge.
      - **Actionable Format**: Hashtags should be ready to copy and paste (e.g., #example #anothertag).
      - **Avoid**: Do not include overly generic, spammy, or irrelevant hashtags. Avoid banned or shadow-banned terms.

  User Niche: {{{userNiche}}}
  Reel Title (Clickbaity): {{{reelTitle}}}
  Reel Idea (Intriguing): {{{reelIdea}}}
  {{#if seriesName}}
  This reel is part of the "{{seriesName}}" series.
  - Mention the series name naturally within the reel script where appropriate, if it doesn't break the clickbait flow.
  - Include the series name or a series-specific hashtag in the caption.
  - Include a series-specific hashtag if applicable in the hashtags list (e.g., #{{seriesName}} or #{{seriesName}}Series).
  {{/if}}

  Ensure the output is high-quality, sounds authentically human, and is optimized for maximum engagement and virality on platforms like Instagram Reels or TikTok.
  Avoid repetitive sentence starters or overly academic explanations. Think like a creator aiming for high view counts, for a creator.
  The content, while clickbaity in its hook, should still offer some form of value or entertainment to the viewer.
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
      if (!output) {
        console.error('generateReelScriptFlow: AI prompt returned undefined/null for input:', input);
        throw new Error('AI failed to generate a valid response structure for reel script. Please try again or refine your input.');
      }
      return output;
    } catch (e: any) {
      if (e instanceof Error && (e.message.includes('[503 Service Unavailable]') || e.message.includes('The model is overloaded'))) {
        throw new Error("The AI service is currently experiencing high demand and is temporarily unavailable. Please try again in a few moments.");
      }
      console.error('Error in generateReelScriptFlow:', e);
      if (e instanceof Error) {
        throw e;
      }
      throw new Error(`An unexpected issue occurred while generating the reel script: ${String(e)}`);
    }
  }
);

