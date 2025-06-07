
'use server';
/**
 * @fileOverview Generates attention-grabbing hooks for various content types.
 *
 * - generateHooks - A function that generates hooks based on topic, format, voice, and style.
 * - GenerateHooksInput - The input type for the generateHooks function.
 * - GenerateHooksOutput - The output type for the generateHooks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ContentFormatHookEnum = z.enum([
  'Reel',
  'Instagram Story',
  'LinkedIn Post',
  'Tweet',
  'Blog Post',
]);
export type ContentFormatHook = z.infer<typeof ContentFormatHookEnum>;

export const HookStyleEnum = z.enum([
  'Curiosity',
  'Fear/Problem',
  'Storytelling',
  'Value-based',
  'Contrarian',
  'Question-based',
  'List-style',
]);
export type HookStyle = z.infer<typeof HookStyleEnum>;

export const GenerateHooksInputSchema = z.object({
  topicOrSummary: z
    .string()
    .min(5, { message: 'Topic or summary must be at least 5 characters.' })
    .max(300, { message: 'Topic or summary must be 300 characters or less.' })
    .describe('The main topic or a brief summary for which to generate hooks.'),
  contentFormat: ContentFormatHookEnum.describe(
    'The type of content the hooks are for (e.g., Reel, Blog Post).'
  ),
  voiceTone: z
    .string()
    .optional()
    .describe(
      'The desired voice and tone for the generated hooks (e.g., Friendly & Casual, Professional & Clean, or a custom description).'
    ),
  hookStyles: z
    .array(HookStyleEnum)
    .min(1, { message: 'Please select at least one hook style.' })
    .describe('An array of selected hook styles to guide generation.'),
  numberOfHooks: z.number().min(3).max(10).default(5).describe('Number of hooks to generate.'),
});
export type GenerateHooksInput = z.infer<typeof GenerateHooksInputSchema>;

export const GenerateHooksOutputSchema = z.object({
  hooks: z
    .array(z.string())
    .describe(
      'An array of generated attention-grabbing hooks, tailored to the inputs.'
    ),
});
export type GenerateHooksOutput = z.infer<typeof GenerateHooksOutputSchema>;

export async function generateHooks(
  input: GenerateHooksInput
): Promise<GenerateHooksOutput> {
  return generateHooksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHooksPrompt',
  input: { schema: GenerateHooksInputSchema },
  output: { schema: GenerateHooksOutputSchema },
  prompt: `You are an expert marketing copywriter specializing in creating viral, attention-grabbing hooks for various content formats.
Your primary goal is to generate {{numberOfHooks}} distinct and compelling opening lines (hooks).

The user wants hooks for content about the following topic/summary:
"{{{topicOrSummary}}}"

The target content format for these hooks is: {{contentFormat}}.
Tailor the length, style, and impact of each hook to be highly effective for a {{contentFormat}}. For example, Tweet hooks must be concise, while Blog Post hooks can be slightly more descriptive.

{{#if voiceTone}}
The desired voice and tone for the hooks is: "{{voiceTone}}".
This means you should carefully choose vocabulary, sentence structure, emotional undertones, and formality (or informality) to perfectly match this specified tone.
{{else}}
Adopt a generally engaging, modern, and clear tone that is optimized for grabbing attention quickly.
{{/if}}

Generate the hooks based on the following selected styles. You should try to generate at least one hook inspired by each selected style, or combine styles creatively if appropriate:
{{#each hookStyles}}
- {{this}}
{{/each}}

Provide exactly {{numberOfHooks}} hooks as a list of strings. Each hook should be ready to use.
Example for 'Curiosity' style: "The one thing nobody tells you about..."
Example for 'Fear/Problem' style: "Stop making this mistake with your..."
Example for 'Storytelling' style: "I went from 0 to 10k followers after I discovered..."
Example for 'Value-based' style: "Unlock the secret to X in just 5 minutes..."
Example for 'Contrarian' style: "Why everything you know about X is wrong..."
Example for 'Question-based' style: "Are you still struggling with Y?"
Example for 'List-style' style: "Top 3 reasons why Z is crucial for..."
`,
});

const generateHooksFlow = ai.defineFlow(
  {
    name: 'generateHooksFlow',
    inputSchema: GenerateHooksInputSchema,
    outputSchema: GenerateHooksOutputSchema,
  },
  async (input): Promise<GenerateHooksOutput> => {
    try {
      const { output } = await prompt(input);
      // Ensure we return the correct number of hooks, even if the AI provides more or less.
      // This is a simple truncation/padding. More sophisticated logic could be added if needed.
      const hooks = output?.hooks || [];
      if (hooks.length > input.numberOfHooks) {
        return { hooks: hooks.slice(0, input.numberOfHooks) };
      }
      // The prompt asks for a specific number, so we expect the AI to generally follow it.
      // If padding is needed, it indicates an issue with the AI's adherence or a very restrictive prompt.
      return { hooks };
    } catch (e: any) {
      if (
        e instanceof Error &&
        (e.message.includes('[503 Service Unavailable]') ||
          e.message.includes('The model is overloaded'))
      ) {
        throw new Error(
          'The AI service is currently experiencing high demand and is temporarily unavailable. Please try again in a few moments.'
        );
      }
      console.error('Error in generateHooksFlow:', e);
      throw new Error(`Failed to generate hooks: ${e.message || 'Unknown error'}`);
    }
  }
);
