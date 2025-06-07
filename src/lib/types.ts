
import { z } from 'zod';
import type { GenerateReelScriptOutput } from '@/ai/flows/generate-reel-script';
import type { ContentFormatHookEnum, HookStyleEnum } from '@/ai/flows/generate-hooks';

// Re-import the base schema type, but we won't use the schema object for extension here.
// We only need the type for ensuring the transformation is correct.
// import { type ContentMarketFitResearchInput as BaseContentMarketFitResearchInput } from '@/ai/flows/content-market-fit-research';


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

// Schema for the Content Research Page Form - Defined independently
export const ResearchPageFormSchema = z.object({
  topicOrNiche: z
    .string()
    .min(10, { message: 'Topic or niche must be at least 10 characters.' })
    .max(300, { message: 'Topic or niche must be 300 characters or less.' })
    .describe('The primary topic, niche, or industry for the content (e.g., "Sustainable slow fashion for young professionals", "AI tools for indie game developers").'),
  targetAudience: z
    .string()
    .min(10, { message: 'Target audience description must be at least 10 characters.' })
    .max(300, { message: 'Target audience description must be 300 characters or less.' })
    .describe('Describe the primary target audience (e.g., "Gen Z interested in ethical consumption", "Solo game developers on a budget").'),
  contentIdea: z
    .string()
    .max(500, { message: 'Content idea must be 500 characters or less.' })
    .optional()
    .describe('A specific content idea or series concept (e.g., "Weekly YouTube series reviewing thrift store finds", "Podcast interviewing AI startup founders").'),
  platformFocus: z
    .string()
    .max(100, { message: 'Platform focus must be 100 characters or less.' })
    .optional()
    .describe('Optional: Specific platforms to focus on (e.g., "YouTube, TikTok", "Substack newsletter").'),
  desiredOutcome: z
    .string()
    .max(200, {message: 'Desired outcome must be 200 characters or less.'})
    .optional()
    .describe('Optional: What the creator hopes to achieve (e.g., "Build a community", "Generate affiliate income", "Establish thought leadership").'),
  selectedPredefinedTone: z.string().optional().describe("Predefined tone for the AI report's presentation style."),
  customVoiceTone: z.string().max(100, {message: "Custom tone description must be 100 characters or less."}).optional().describe("Custom tone description if 'Custom...' is selected for the report's presentation style."),
});

export type ResearchPageFormValues = z.infer<typeof ResearchPageFormSchema>;


// Schemas for Content Market Fit Research AI Flow
export const ContentMarketFitResearchInputSchema = z.object({
  topicOrNiche: z
    .string()
    .min(10, { message: 'Topic or niche must be at least 10 characters.' })
    .max(300, { message: 'Topic or niche must be 300 characters or less.' })
    .describe('The primary topic, niche, or industry for the content (e.g., "Sustainable slow fashion for young professionals", "AI tools for indie game developers").'),
  targetAudience: z
    .string()
    .min(10, { message: 'Target audience description must be at least 10 characters.' })
    .max(300, { message: 'Target audience description must be 300 characters or less.' })
    .describe('Describe the primary target audience (e.g., "Gen Z interested in ethical consumption", "Solo game developers on a budget").'),
  contentIdea: z
    .string()
    .max(500, { message: 'Content idea must be 500 characters or less.' })
    .optional()
    .describe('A specific content idea or series concept (e.g., "Weekly YouTube series reviewing thrift store finds", "Podcast interviewing AI startup founders").'),
  platformFocus: z
    .string()
    .max(100, { message: 'Platform focus must be 100 characters or less.' })
    .optional()
    .describe('Optional: Specific platforms to focus on (e.g., "YouTube, TikTok", "Substack newsletter").'),
  desiredOutcome: z
    .string()
    .max(200, {message: 'Desired outcome must be 200 characters or less.'})
    .optional()
    .describe('Optional: What the creator hopes to achieve (e.g., "Build a community", "Generate affiliate income", "Establish thought leadership").'),
  voiceTone: z
    .string()
    .optional()
    .describe(
      'The desired voice and tone for the AI analysis itself (e.g., "Very professional", "Fun and witty", "Encouraging and supportive"). This influences how the research report is presented.'
    ),
});
export type ContentMarketFitResearchInput = z.infer<typeof ContentMarketFitResearchInputSchema>;

const GrowthPotentialSchema = z.object({
  rating: z.enum(["High", "Medium", "Low", "Emerging", "Saturated"]).describe("Qualitative rating of growth potential (e.g., High, Medium, Emerging)."),
  analysis: z.string().describe("Detailed explanation of the growth potential rating, including market trends, competition, and opportunities."),
});

const AudienceAnalysisSchema = z.object({
  painPoints: z.array(z.string()).describe("Key problems, challenges, or unmet needs of the target audience."),
  interests: z.array(z.string()).describe("Primary interests, hobbies, and desires of the target audience relevant to the niche."),
  engagementStrategies: z.array(z.string()).describe("Actionable strategies to engage this audience effectively."),
});

const ContentStrategySuggestionsSchema = z.object({
  formats: z.array(z.string()).describe("Recommended content formats (e.g., 'Short-form video tutorials', 'In-depth blog posts', 'Interactive quizzes')."),
  angles: z.array(z.string()).describe("Unique content angles or perspectives to stand out."),
  seoKeywords: z.array(z.string()).describe("A list of 5-10 relevant SEO keywords or keyphrases for discoverability."),
  pillars: z.array(z.string()).optional().describe("Suggested core content pillars or themes (3-5).")
});

const MonetizationOpportunitiesSchema = z.object({
  primarySources: z.array(z.string()).describe("Most viable primary income streams (e.g., 'Affiliate marketing for relevant tools', 'Sponsorships from ethical brands')."),
  secondarySources: z.array(z.string()).describe("Potential secondary income streams (e.g., 'Selling digital templates', 'Community memberships')."),
  incomeEstimateRationale: z.string().describe("A qualitative discussion on income potential. Avoid specific monetary figures. Focus on factors influencing earning potential like audience size, engagement, and chosen methods."),
});

const PlatformSpecificInsightSchema = z.object({
    platform: z.string().describe("The social media or content platform (e.g., YouTube, TikTok, Instagram, Blog, Newsletter)."),
    growthTips: z.array(z.string()).describe("Actionable growth tips specific to this platform for the given niche."),
    contentRecommendations: z.array(z.string()).describe("Content types or series ideas that perform well on this platform for the niche."),
});

const RiskAssessmentSchema = z.object({
    potentialChallenges: z.array(z.string()).describe("Potential difficulties or obstacles the creator might face."),
    mitigationStrategies: z.array(z.string()).describe("Suggestions on how to overcome or reduce these challenges."),
});

const OverallFitScoreSchema = z.object({
    score: z.enum(["Strong Fit", "Good Fit", "Moderate Fit", "Needs Refinement", "Challenging Fit"]).describe("The AI's overall qualitative assessment of the content/niche fit."),
    summary: z.string().describe("A concise justification for the fit score, highlighting key strengths and weaknesses."),
    nextSteps: z.array(z.string()).describe("Actionable recommendations or next steps for the creator based on the analysis."),
});


export const ContentMarketFitResearchOutputSchema = z.object({
  marketOverview: z.string().describe("A general description of the market/niche, its current state, and key players or trends."),
  growthPotential: GrowthPotentialSchema,
  audienceAnalysis: AudienceAnalysisSchema,
  contentStrategySuggestions: ContentStrategySuggestionsSchema,
  monetizationOpportunities: MonetizationOpportunitiesSchema,
  platformSpecificInsights: z.array(PlatformSpecificInsightSchema).optional().describe("Insights for specific platforms, if platformFocus was provided by the user. Provide insights for each platform listed by the user, or omit/empty array if none listed."),
  riskAssessment: RiskAssessmentSchema,
  overallFitScore: OverallFitScoreSchema,
});
export type ContentMarketFitResearchOutput = z.infer<typeof ContentMarketFitResearchOutputSchema>;
