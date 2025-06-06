
import { z } from 'zod';
import type { GenerateReelScriptOutput } from '@/ai/flows/generate-reel-script';
import type { ContentFormatHookEnum, HookStyleEnum } from '@/ai/flows/generate-hooks';

export interface ContentType {
  id: string;
  title: string;
  description: string;
  iconName: 'Film' | 'Instagram' | 'LinkedinIcon' | 'History';
  href: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export interface ReelIdea {
  id: string; // Day name, e.g., "Monday"
  day: string;
  title: string;
  oneLineIdea: string;
  isLoading: boolean;
  scriptData?: GenerateReelScriptOutput | null;
  isGeneratingScript?: boolean;
  error?: string | null;
}

// StoryPrompt is no longer used by active features
export interface StoryPrompt {
  id: string;
  text: string;
}

export type LinkedInTheme = 'Milestone' | 'Advice' | 'Behind-the-Scenes' | 'Personal Growth';

export interface LinkedInPostData {
  post: string;
  trendingInsight?: string;
}

// Types for Hook Generator
export type ContentFormatHook = z.infer<typeof ContentFormatHookEnum>;
export const CONTENT_FORMAT_HOOK_OPTIONS: ContentFormatHook[] = [
  'Reel',
  'Instagram Story',
  'LinkedIn Post',
  'Tweet',
  'Blog Post',
];

export type HookStyle = z.infer<typeof HookStyleEnum>;
export const HOOK_STYLE_OPTIONS: { id: HookStyle; label: string; description?: string }[] = [
  { id: 'Curiosity', label: 'Curiosity', description: 'Pique interest (e.g., “No one talks about this, but…”)' },
  { id: 'Fear/Problem', label: 'Fear/Problem', description: 'Highlight a pain point (e.g., “If you\'re doing this, you\'re wasting time…”)' },
  { id: 'Storytelling', label: 'Storytelling', description: 'Start with a narrative (e.g., “Last year, I almost quit until…”)' },
  { id: 'Value-based', label: 'Value Proposition', description: 'Promise clear benefit (e.g., “Here’s how to grow in 30 days…”)' },
  { id: 'Contrarian', label: 'Contrarian', description: 'Challenge common beliefs (e.g., “Don’t follow your passion — here’s why.”)' },
  { id: 'Question-based', label: 'Question', description: 'Engage with a question (e.g., “Ever wondered why no one watches your reels?”)' },
  { id: 'List-style', label: 'List Style', description: 'Introduce a list (e.g., “3 tools I use every day as a creator”)' },
];

export const PREDEFINED_VOICE_TONES_COMMON = [
  "Friendly & Casual",
  "Professional & Clean",
  "Fun & Witty",
  "Motivational & Bold",
  "Sarcastic & Edgy",
  "Storytelling / Narrative",
  "Crisp & Direct",
  "Informative but Simple",
  "Custom...",
];

// Types for X Tweet Generator - Schemas moved here
export const TweetStrategyEnum = z.enum([
  'Engagement-focused',
  'Educational',
  'Promotional',
  'Brand Building',
  'Thought Leadership',
  'Mixed / Balanced',
]);
export type TweetStrategy = z.infer<typeof TweetStrategyEnum>;

export const GenerateWeeklyTweetsInputSchema = z.object({
  userPrompt: z
    .string()
    .min(10, { message: 'Main prompt must be at least 10 characters.' })
    .max(500, { message: 'Main prompt must be 500 characters or less.' })
    .describe("The main topic, theme, or idea for the week's tweets."),
  strategy: TweetStrategyEnum.describe(
    'The content strategy to guide tweet generation.'
  ),
  tweetsPerDay: z
    .number()
    .min(1, { message: 'Must generate at least 1 tweet per day.' })
    .max(5, { message: 'Cannot generate more than 5 tweets per day.' })
    .default(1)
    .describe('Number of tweets to generate for each day of the week.'),
  voiceTone: z
    .string()
    .optional()
    .describe(
      'The desired voice and tone for the generated tweets (e.g., Friendly & Casual, Professional & Clean, or a custom description).'
    ),
});
export type GenerateWeeklyTweetsInput = z.infer<typeof GenerateWeeklyTweetsInputSchema>;

export const DailyTweetsSchema = z.object({
  day: z.string().describe('Day of the week (e.g., Monday, Tuesday).'),
  tweets: z.array(z.string()).describe('An array of tweet strings for the day. Each tweet should be concise and suitable for X (Twitter), including relevant hashtags where appropriate.'),
});
export type DailyTweets = z.infer<typeof DailyTweetsSchema>;

export const GenerateWeeklyTweetsOutputSchema = z.object({
  weeklySchedule: z
    .array(DailyTweetsSchema)
    .length(7)
    .describe(
      'An array of 7 objects, each representing a day with its generated tweets.'
    ),
});
export type GenerateWeeklyTweetsOutput = z.infer<typeof GenerateWeeklyTweetsOutputSchema>;

// UI specific options for Tweet Strategy
export const TWEET_STRATEGY_OPTIONS: { value: TweetStrategy; label: string; description: string }[] = [
  { value: 'Engagement-focused', label: 'Engagement Focused', description: 'Polls, questions, replies to spark interaction.' },
  { value: 'Educational', label: 'Educational', description: 'Share tips, facts, and valuable insights.' },
  { value: 'Promotional', label: 'Promotional', description: 'Highlight products/services, include CTAs.' },
  { value: 'Brand Building', label: 'Brand Building', description: 'Share values, behind-the-scenes, brand stories.' },
  { value: 'Thought Leadership', label: 'Thought Leadership', description: 'Offer opinions and analyze industry trends.' },
  { value: 'Mixed / Balanced', label: 'Mixed / Balanced', description: 'A versatile combination of strategies for the week.' },
];

export interface DailyTweetsUIData { // For UI state, matches AI output structure
  day: string;
  tweets: string[];
}
