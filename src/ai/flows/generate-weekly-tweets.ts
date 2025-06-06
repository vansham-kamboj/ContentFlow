
'use server';
/**
 * @fileOverview Generates a 7-day X (Twitter) content schedule.
 *
 * - generateWeeklyTweets - A function that generates tweets for each day of the week.
 * - GenerateWeeklyTweetsInput - The input type for the generateWeeklyTweets function (imported).
 * - GenerateWeeklyTweetsOutput - The output type for the generateWeeklyTweets function (imported).
 * - TweetStrategyEnum - Enum for different content strategies (imported via schema in types.ts).
 */

import {ai} from '@/ai/genkit';
import { 
  GenerateWeeklyTweetsInputSchema, 
  type GenerateWeeklyTweetsInput,
  GenerateWeeklyTweetsOutputSchema,
  type GenerateWeeklyTweetsOutput,
  type DailyTweets // Import if used directly, though output schema handles structure
} from '@/lib/types';

export async function generateWeeklyTweets(
  input: GenerateWeeklyTweetsInput
): Promise<GenerateWeeklyTweetsOutput> {
  return generateWeeklyTweetsFlow(input);
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const prompt = ai.definePrompt({
  name: 'generateWeeklyTweetsPrompt',
  input: { schema: GenerateWeeklyTweetsInputSchema }, // Uses imported schema
  output: { schema: GenerateWeeklyTweetsOutputSchema }, // Uses imported schema
  prompt: `You are an expert social media manager specializing in X (Twitter) content strategy and creation.
Your goal is to generate a 7-day content schedule of tweets. For each day from Monday to Sunday, you need to generate {{tweetsPerDay}} unique tweets.

The main topic/theme for the week is:
"{{{userPrompt}}}"

The content strategy to follow is: "{{strategy}}".
- If 'Engagement-focused', tweets should aim to start conversations, ask questions, run polls, or encourage replies.
- If 'Educational', tweets should provide valuable tips, interesting facts, or concise insights.
- If 'Promotional', tweets should subtly (or directly, if appropriate for the prompt) highlight products, services, or calls to action.
- If 'Brand Building', tweets should reflect company values, share behind-the-scenes content, or tell brand stories.
- If 'Thought Leadership', tweets should offer unique opinions, analyze industry trends, or provide commentary.
- If 'Mixed / Balanced', tweets should incorporate a variety of the above approaches throughout the week.

{{#if voiceTone}}
The desired voice and tone for the tweets is: "{{voiceTone}}".
Adapt your vocabulary, sentence structure, emotional vibe, and formality to match this tone.
{{else}}
Adopt a generally engaging, modern, clear, and concise tone, suitable for X (Twitter).
{{/if}}

For each day (Monday to Sunday), provide exactly {{tweetsPerDay}} tweet(s).
Each tweet should be well-crafted, relatively short, and engaging for an X (Twitter) audience.
Include relevant hashtags within or at the end of tweets where appropriate to increase reach.

The output must be an array of 7 objects, one for each day of the week in order (Monday to Sunday). Each object must have a "day" (string) and a "tweets" (array of strings) property.
Example for one day: { "day": "Monday", "tweets": ["Tweet 1 for Monday #example", "Tweet 2 for Monday #anothertag"] }
Ensure the 'weeklySchedule' array in the output contains exactly 7 entries, one for each day.
`,
});

const generateWeeklyTweetsFlow = ai.defineFlow(
  {
    name: 'generateWeeklyTweetsFlow',
    inputSchema: GenerateWeeklyTweetsInputSchema, // Uses imported schema
    outputSchema: GenerateWeeklyTweetsOutputSchema, // Uses imported schema
  },
  async (input): Promise<GenerateWeeklyTweetsOutput> => {
    try {
      const { output } = await prompt(input);
      if (output && output.weeklySchedule && output.weeklySchedule.length === 7) {
        // Ensure each day has the correct number of tweets
        const validatedSchedule = output.weeklySchedule.map((daySchedule, index) => {
          const dayName = DAYS_OF_WEEK[index];
          let tweets = daySchedule.tweets || [];
          if (tweets.length > input.tweetsPerDay) {
            tweets = tweets.slice(0, input.tweetsPerDay);
          } else if (tweets.length < input.tweetsPerDay) {
            // If AI provides fewer, pad with placeholders
            const diff = input.tweetsPerDay - tweets.length;
            for (let i = 0; i < diff; i++) {
              tweets.push(`Placeholder tweet ${i + 1} for ${dayName} - please revise.`);
            }
          }
          return { day: dayName, tweets };
        });
        return { weeklySchedule: validatedSchedule };
      }
      // Fallback if AI output is not structured as expected
      console.warn("AI output for weekly tweets was not structured as expected. Generating placeholder schedule.");
      const placeholderSchedule = DAYS_OF_WEEK.map(day => ({
        day,
        tweets: Array(input.tweetsPerDay).fill(`AI failed to generate tweets for ${day}. Please try adjusting your prompt.`),
      }));
      return { weeklySchedule: placeholderSchedule };

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
      console.error('Error in generateWeeklyTweetsFlow:', e);
      throw new Error(`Failed to generate weekly tweets: ${e.message || 'Unknown error'}`);
    }
  }
);
