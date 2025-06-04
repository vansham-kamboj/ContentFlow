
import type { GenerateReelScriptOutput } from '@/ai/flows/generate-reel-script';
import type { ContentFormatHookEnum, HookStyleEnum } from '@/ai/flows/generate-hooks';
import type { z } from 'zod';


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
