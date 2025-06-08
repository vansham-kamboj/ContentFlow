
'use server';

import {ai} from '@/ai/genkit';
import { 
  GenerateWeeklyTweetsInputSchema, 
  type GenerateWeeklyTweetsInput,
  GenerateWeeklyTweetsOutputSchema,
  type GenerateWeeklyTweetsOutput,
} from '@/lib/types';

export async function generateWeeklyTweets(
  input: GenerateWeeklyTweetsInput
): Promise<GenerateWeeklyTweetsOutput> {
  return generateWeeklyTweetsFlow(input);
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const prompt = ai.definePrompt({
  name: 'generateWeeklyTweetsPrompt',
  input: { schema: GenerateWeeklyTweetsInputSchema }, 
  output: { schema: GenerateWeeklyTweetsOutputSchema }, 
  prompt: `You are an expert social media manager and content creator, specializing in crafting engaging and authentic X (Twitter) content. Your main goal is to generate tweets that sound like they were written by a real, relatable human, avoiding any robotic or generic AI characteristics.

Your goal is to generate a 7-day content schedule of tweets. For each day from Monday to Sunday, you need to generate {{tweetsPerDay}} unique tweets.

The main topic/theme for the week is:
"{{{userPrompt}}}"

The content strategy to follow is: "{{strategy}}".
- If 'Engagement-focused', tweets should aim to start genuine conversations, ask relatable questions, run fun polls, or encourage thoughtful replies. Use relevant emojis to add personality.
- If 'Educational', tweets should provide valuable tips, interesting facts, or concise insights in a clear, accessible, and conversational way. Imagine explaining it to a friend.
- If 'Promotional', tweets should highlight products, services, or calls to action in an appealing and authentic manner. Avoid sounding overly salesy; focus on the value or story.
- If 'Brand Building', tweets should reflect company values, share humanizing behind-the-scenes content, or tell brand stories in a relatable, down-to-earth manner.
- If 'Thought Leadership', tweets should offer unique, well-articulated opinions, analyze industry trends with a fresh perspective, or provide commentary with a confident, current, and human voice.
- If 'Mixed / Balanced', tweets should incorporate a variety of the above approaches throughout the week, maintaining an overall engaging, authentic, and human-like tone.

{{#if voiceTone}}
The desired voice and tone for the tweets is: "{{voiceTone}}".
Fully embody this tone in your vocabulary, sentence structure, emotional expression, and formality. Ensure it sounds completely natural, conversational, and human. If it complements the user's specified tone and the X (Twitter) platform, consider subtly infusing elements of a modern, concise, and Gen Z-friendly style where appropriate.
{{else}}
Adopt a modern, engaging, concise, and slightly informal Gen Z-friendly tone, suitable for X (Twitter). This means using contemporary language, relevant slang (authentically and not excessively), emojis where they add personality, and a generally upbeat and relatable style. Each tweet should feel like it's from a real person active on X.
{{/if}}

For each day (Monday to Sunday), provide exactly {{tweetsPerDay}} tweet(s).
Each tweet MUST:
- Be well-crafted and sound like a human wrote it.
- Be relatively short (respecting X character limits).
- Be engaging for an X (Twitter) audience.
- Show personality (witty, empathetic, curious, direct, etc., depending on strategy and tone).
- Avoid repetitive sentence starters or generic phrasing.
- Include 1-3 relevant and thoughtfully chosen hashtags within or at the end of tweets where appropriate to increase reach, not just a spammy list.

The output must be an array of 7 objects, one for each day of the week in order (Monday to Sunday). Each object must have a "day" (string) and a "tweets" (array of strings) property.
Example for one day: { "day": "Monday", "tweets": ["Tweet 1 for Monday feeling human #example ✨", "Tweet 2 for Monday, like a real person #anothertag 🚀"] }
Ensure the 'weeklySchedule' array in the output contains exactly 7 entries, one for each day.
`,
});

const generateWeeklyTweetsFlow = ai.defineFlow(
  {
    name: 'generateWeeklyTweetsFlow',
    inputSchema: GenerateWeeklyTweetsInputSchema, 
    outputSchema: GenerateWeeklyTweetsOutputSchema, 
  },
  async (input): Promise<GenerateWeeklyTweetsOutput> => {
    try {
      const { output } = await prompt(input);
      if (output && output.weeklySchedule && output.weeklySchedule.length === 7) {
        const validatedSchedule = output.weeklySchedule.map((daySchedule, index) => {
          const dayName = DAYS_OF_WEEK[index];
          let tweets = daySchedule.tweets || [];
          if (tweets.length > input.tweetsPerDay) {
            tweets = tweets.slice(0, input.tweetsPerDay);
          } else if (tweets.length < input.tweetsPerDay) {

            const diff = input.tweetsPerDay - tweets.length;
            for (let i = 0; i < diff; i++) {
              tweets.push(`Placeholder tweet ${i + 1} for ${dayName} - AI generated too few. Please refine prompt or retry.`);
            }
          }
          return { day: dayName, tweets };
        });
        return { weeklySchedule: validatedSchedule };
      }

      console.warn("AI output for weekly tweets was not structured as expected or was incomplete. Generating placeholder schedule.");
      const placeholderSchedule = DAYS_OF_WEEK.map(day => ({
        day,
        tweets: Array(input.tweetsPerDay).fill(`AI failed to generate tweets for ${day}. Please try adjusting your prompt or check service status.`),
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
