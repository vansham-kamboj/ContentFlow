
'use server';
/**
 * @fileOverview Provides AI-driven content market fit research and analysis.
 *
 * - contentMarketFitResearch - A function that analyzes a content idea or niche.
 * (Input and Output types are now imported from @/lib/types)
 */

import {ai} from '@/ai/genkit';
import { 
  ContentMarketFitResearchInputSchema, 
  type ContentMarketFitResearchInput, 
  ContentMarketFitResearchOutputSchema,
  type ContentMarketFitResearchOutput 
} from '@/lib/types'; // Import schemas and types

export async function contentMarketFitResearch(
  input: ContentMarketFitResearchInput
): Promise<ContentMarketFitResearchOutput> {
  return contentMarketFitResearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentMarketFitResearchPrompt',
  input: { schema: ContentMarketFitResearchInputSchema },
  output: { schema: ContentMarketFitResearchOutputSchema },
  prompt: `You are an expert Content Market Fit Analyst and Senior Content Strategist.
Your primary goal is to provide a comprehensive market research report for a content creator based on their inputs.
The analysis should be insightful, data-informed (based on your general knowledge and pattern recognition), actionable, and presented clearly.

User Inputs:
- Topic/Niche: {{{topicOrNiche}}}
- Target Audience: {{{targetAudience}}}
{{#if contentIdea}}- Content Idea: {{{contentIdea}}}{{/if}}
{{#if platformFocus}}- Platform Focus: {{{platformFocus}}}{{/if}}
{{#if desiredOutcome}}- Desired Outcome: {{{desiredOutcome}}}{{/if}}

Based on these inputs, generate a detailed report covering all fields in the output schema.

Tone of Report:
{{#if voiceTone}}
The desired voice and tone for this research report is: "{{voiceTone}}".
Adapt your language, style, and presentation to match this specified tone.
{{else}}
Adopt an insightful, data-informed, yet modern, encouraging, and slightly informal Gen Z-friendly tone. Make the advice actionable and relatable. Use emojis where appropriate to enhance readability and engagement, but maintain a professional strategic core.
{{/if}}

Key areas to cover meticulously:

1.  **Market Overview**: Describe the {{{topicOrNiche}}} market. Is it growing, mature, niche? Who are typical key players or what are major trends?
2.  **Growth Potential**: Assess this. Is it High, Medium, Low, Emerging, or Saturated? Explain why. Consider competition and unique angles.
3.  **Audience Analysis**:
    *   What are common Pain Points for the {{{targetAudience}}} related to {{{topicOrNiche}}}?
    *   What are their key Interests related to {{{topicOrNiche}}}?
    *   Suggest Engagement Strategies for them.
4.  **Content Strategy Suggestions**:
    *   Recommend effective Content Formats.
    *   Suggest unique Content Angles.
    *   Provide 5-10 SEO Keywords/Keyphrases.
    *   Suggest 3-5 core Content Pillars/Themes.
5.  **Monetization Opportunities**:
    *   List Primary and Secondary income sources.
    *   For 'incomeEstimateRationale', discuss factors influencing income (e.g., audience size, niche demand, engagement, value proposition). DO NOT give specific dollar amounts or unrealistic guarantees. Focus on what makes monetization more or less feasible.
6.  **Platform Specific Insights**: {{#if platformFocus}}For each platform listed by the user in '{{{platformFocus}}}', provide a corresponding object adhering to the 'PlatformSpecificInsightSchema'. Ensure the 'platformSpecificInsights' field in your output is an array of these objects.{{else}}The user did not specify a 'platformFocus'. In this case, either omit the 'platformSpecificInsights' field entirely from your output or provide an empty array [] for it. Do not provide general text if no specific platforms are listed.{{/if}}
7.  **Risk Assessment**: Identify Potential Challenges and suggest Mitigation Strategies.
8.  **Overall Fit Score**: Give a qualitative score (e.g., "Strong Fit," "Moderate Fit," "Needs Refinement"). Summarize why and provide 3-5 actionable Next Steps for the creator.

Be thorough and provide practical, strategic advice. Your analysis should empower the creator to make informed decisions.
Ensure all fields in the output schema are addressed.
`,
});

const contentMarketFitResearchFlow = ai.defineFlow(
  {
    name: 'contentMarketFitResearchFlow',
    inputSchema: ContentMarketFitResearchInputSchema,
    outputSchema: ContentMarketFitResearchOutputSchema,
  },
  async (input): Promise<ContentMarketFitResearchOutput> => {
    try {
      const { output } = await prompt(input);
      if (!output) {
        console.error('ContentMarketFitResearchFlow: AI prompt returned undefined/null without throwing an error for input:', input);
        throw new Error('AI failed to generate a valid response structure. Please try again or refine your input.');
      }
      return output;
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
      console.error('Error in contentMarketFitResearchFlow:', e); 
      
      if (e instanceof Error) {
        throw e; 
      }
      throw new Error(`An unexpected issue occurred while generating content market fit research: ${String(e)}`);
    }
  }
);
