
import type { GenerateReelScriptOutput } from '@/ai/flows/generate-reel-script';

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

// Specific type for data being saved to Firestore to keep it clean
export interface SavedReelDayData {
  day: string;
  title: string;
  oneLineIdea: string;
  scriptData?: GenerateReelScriptOutput | null;
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
