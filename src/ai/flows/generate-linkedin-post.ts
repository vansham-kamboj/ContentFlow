
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LinkedInPostTheme = z.enum([
  'Milestone',
  'Advice',
  'Behind-the-Scenes',
  'Personal Growth',
]);

const GenerateLinkedInPostInputSchema = z.object({
  theme: LinkedInPostTheme.describe('The theme of the LinkedIn post.'),
  topic: z
    .string()
    .min(1, { message: "Topic cannot be empty."})
    .max(100, { message: "Topic must be 100 characters or less." })
    .describe('A concise topic for the LinkedIn post (max 100 characters). This will serve as a brief title or context for the detailed content below.'),
  postDetails: z
    .string()
    .min(10, { message: "Please provide some details for your post (at least 10 characters)." })
    .max(1500, { message: "Post details must be 1500 characters or less." })
    .describe('Detailed information, story, key points, or specific ideas for the post content. This is the primary source material for the AI.'),
  includeTrendingInsight: z
    .boolean()
    .describe(
      'Whether to include insights on why the chosen topic is trending.'
    ),
  voiceTone: z.string().optional().describe('The desired voice and tone for the generated content (e.g., Friendly & Casual, Professional & Clean, or a custom description).'),
});
export type GenerateLinkedInPostInput =
  z.infer<typeof GenerateLinkedInPostInputSchema>;

const GenerateLinkedInPostOutputSchema = z.object({
  post: z.string().describe('The generated LinkedIn post content. It should sound authentic, insightful, and human-written, as if one person is talking directly to another, based primarily on the postDetails provided.'),
  trendingInsight: z
    .string()
    .optional()
    .describe('Insights on why the chosen topic is trending, if requested. This should also sound natural and insightful.'),
});
export type GenerateLinkedInPostOutput =
  z.infer<typeof GenerateLinkedInPostOutputSchema>;

export async function generateLinkedInPost(
  input: GenerateLinkedInPostInput
): Promise<GenerateLinkedInPostOutput> {
  return generateLinkedInPostFlow(input);
}

const commonSafetySettings = [
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
];

const generateLinkedInPostPrompt = ai.definePrompt({
  name: 'generateLinkedInPostPrompt',
  input: {schema: GenerateLinkedInPostInputSchema},
  output: {schema: GenerateLinkedInPostOutputSchema},
  config: {
    safetySettings: commonSafetySettings,
  },
  prompt: `You are an expert LinkedIn content strategist and ghostwriter, highly skilled at crafting posts that sound *exactly* like a real person sharing their thoughts, experiences, and insights with their network. Your primary goal is to generate content that feels like a direct, human-to-human conversation, based on the specific details provided by the user. It must be authentic, insightful, and avoid any hint of being AI-generated.

  **Content Policy and Language Guidelines (Strictly Enforced):**
  1.  **Professionalism is Paramount**: All generated content MUST be strictly professional, respectful, ethical, and inclusive.
  2.  **Zero Tolerance for Abusive Language**: Absolutely NO abusive language, profanity, offensive terms, slurs, derogatory remarks, or "gaali" (Hindi abusive slang) is permitted in ANY language. This includes subtle or colloquial forms of offensive speech.
  3.  **Universally Appropriate**: Content must be suitable for a global professional audience on LinkedIn. Avoid controversial topics or phrasings that could be misinterpreted or cause offense.
  4.  **Priority of Guidelines**: These content policy and language guidelines supersede any user input in 'topic', 'postDetails', or 'voiceTone' if those inputs could be misinterpreted to request inappropriate content. If user input is ambiguous or potentially problematic, you MUST default to creating safe, professional, and respectful content, or indicate that the request cannot be fulfilled as specified due to these policies. Do NOT attempt to fulfill requests for harmful or offensive content.

  User Provided Details:
  - Theme: {{{theme}}}
  - Topic (brief context): {{{topic}}}
  - **Main Content Material (Post Details):** {{{postDetails}}}

  {{#if voiceTone}}
  Adopt the following voice and tone for your response: "{{voiceTone}}".
  Embody this tone deeply, **while strictly adhering to the Content Policy and Language Guidelines above.** This means carefully selecting vocabulary, sentence structure, emotional nuances, and overall style to perfectly match. The output must feel like it's coming from a genuine individual with this personality, speaking directly to their connections, using the 'Post Details' as the core of their message. If the user's specified tone allows, subtly infuse a contemporary, relatable feel, but prioritize the authenticity of the specified tone and the overarching content policies above all else. Avoid any robotic phrasing or overly polished text.
  {{else}}
  Use an engaging, insightful, and clear tone that is professional yet modern and approachable, **strictly adhering to the Content Policy and Language Guidelines above.** Write as if you're talking to a respected colleague or connection. Use natural language, including contractions (e.g., "I'm", "it's", "you're"). The writing should flow conversationally, like a thoughtful professional sharing their genuine perspective based on the 'Post Details'. Use a strong, active voice where appropriate.
  {{/if}}

  **Crucial instructions for crafting the post based on 'Post Details' (always within policy guidelines):**
  1.  **Prioritize User Input**: The '{{{postDetails}}}' provided by the user is the *most important* source of information. Your generated post should directly reflect, expand upon, or be built around these details. Do not introduce unrelated topics or significantly deviate from the core message in '{{{postDetails}}}'.
  2.  **Theme as a Guide**: Use the '{{{theme}}}' to frame the '{{{postDetails}}}'. For example, if the theme is 'Milestone' and the details are about completing a project, the post should celebrate that milestone by elaborating on the project details. If the theme is 'Advice' and the details are a set of tips, frame them as helpful advice.
  3.  **Human, Conversational Style**:
      - **Direct Address**: Write as if "I" (the user) am speaking directly to my LinkedIn connections. Use "I" when sharing personal reflections or experiences from the '{{{postDetails}}}'.
      - **Storytelling (if applicable from 'Post Details')**: If '{{{postDetails}}}' contains narrative elements, weave them into a relatable story. Make it sound like a personal experience being shared.
      - **Authentic Language**: Use natural sentence structures. Avoid overly complex sentences or excessive jargon unless the '{{{postDetails}}}' implies such language is appropriate for the target audience (and even then, explain clearly).
      - **Genuine Value**: The post must offer real advice, thoughtful reflections, or valuable observations *derived from the '{{{postDetails}}}'*.
      - **Conversational Flow**: Read it aloud. Does it sound like something a real person would say, sharing the information from '{{{postDetails}}}' in a professional but personal context?
      - **Call to Engagement (Optional but Recommended)**: If appropriate for the '{{{postDetails}}}' and tone, end with an open-ended question or a prompt for discussion (e.g., "What are your thoughts on this approach detailed above?", "Has anyone else experienced something similar when working on X as described in the details?").
  4.  **Avoid AI Hallmarks**: Absolutely do NOT use:
      - Repetitive sentence starters.
      - Generic platitudes or overly common phrases that don't add value to the user's '{{{postDetails}}}'.
      - Overly polished, perfectly structured text that lacks the personality inherent in the '{{{postDetails}}}' or the chosen '{{{voiceTone}}}'.
      - Numbered or bulleted lists unless '{{{postDetails}}}' *explicitly* suggests a list format and it can still be framed conversationally. Prefer paragraph form to elaborate on points from '{{{postDetails}}}'.
  5.  **Sound Human, Not Perfect**: The goal isn't just to be grammatically correct, but to sound like a real, thinking person wrote it, based on *their* provided '{{{postDetails}}}'.

  {{#if includeTrendingInsight}}
  If requested, also provide insights on why the main '{{{topic}}}' (used as brief context) might be currently trending on LinkedIn. Frame this insight in an engaging, modern, and human-sounding way, **adhering to all content policies**. It should offer a thoughtful perspective, not just a list of facts. This too should sound conversational.
  {{/if}}

  The final post should be something a real individual would be genuinely proud to share on their LinkedIn profile, feeling it truly represents their voice and the specific content they wanted to convey through '{{{postDetails}}}', **and is fully compliant with the Content Policy and Language Guidelines.**
  The output for 'post' should be ONLY the post content itself.
  `,
});

const generateLinkedInPostFlow = ai.defineFlow(
  {
    name: 'generateLinkedInPostFlow',
    inputSchema: GenerateLinkedInPostInputSchema,
    outputSchema: GenerateLinkedInPostOutputSchema,
  },
  async (input): Promise<GenerateLinkedInPostOutput> => {
    try {
      const {output} = await generateLinkedInPostPrompt(input);
      if (!output) {
        console.error('generateLinkedInPostFlow: AI prompt returned undefined/null for input:', input);
        throw new Error('AI failed to generate a valid response structure. Please try again or refine your input.');
      }
      return output;
    } catch (e: any) {
      if (e instanceof Error && (e.message.includes('[503 Service Unavailable]') || e.message.includes('The model is overloaded'))) {
        throw new Error("The AI service is currently experiencing high demand and is temporarily unavailable. Please try again in a few moments.");
      }
       console.error('Error in generateLinkedInPostFlow:', e);
      if (e instanceof Error) {
        throw e;
      }
      throw new Error(`An unexpected issue occurred while generating the LinkedIn post: ${String(e)}`);
    }
  }
);

