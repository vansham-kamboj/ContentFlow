
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, MessageSquare } from 'lucide-react';

// Import schema and types from the shared location (src/lib/types.ts)
import { 
  GenerateWeeklyTweetsInputSchema, 
  type GenerateWeeklyTweetsInput,
  // TweetStrategyEnum, // Not directly used here, but its type TweetStrategy is part of GenerateWeeklyTweetsInput
} from '@/lib/types'; 

import { PREDEFINED_VOICE_TONES_COMMON, TWEET_STRATEGY_OPTIONS } from '@/lib/types';

// Form schema derives from the AI flow input schema (now imported from lib/types)
const formSchema = GenerateWeeklyTweetsInputSchema.extend({
  selectedPredefinedTone: z.string().optional(),
  customVoiceTone: z.string().optional(),
}).omit({ voiceTone: true }); // voiceTone will be constructed dynamically

export type TweetGeneratorFormValues = z.infer<typeof formSchema>;

interface TweetGeneratorFormProps {
  onSubmit: (data: GenerateWeeklyTweetsInput) => void;
  isLoading: boolean;
}

export function TweetGeneratorForm({ onSubmit, isLoading }: TweetGeneratorFormProps) {
  const form = useForm<TweetGeneratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userPrompt: '',
      strategy: 'Mixed / Balanced', // Default value must be one of the TweetStrategyEnum values
      tweetsPerDay: 1,
      selectedPredefinedTone: '',
      customVoiceTone: '',
    },
  });

  const selectedTone = form.watch('selectedPredefinedTone');

  const handleFormSubmit = (data: TweetGeneratorFormValues) => {
    let finalVoiceTone: string | undefined;
    if (data.selectedPredefinedTone === 'Custom...') {
      finalVoiceTone = data.customVoiceTone?.trim() || undefined;
    } else {
      finalVoiceTone = data.selectedPredefinedTone || undefined;
    }
    // Construct the object matching GenerateWeeklyTweetsInput
    const submissionData: GenerateWeeklyTweetsInput = {
      userPrompt: data.userPrompt,
      strategy: data.strategy, // This should be type TweetStrategy
      tweetsPerDay: data.tweetsPerDay,
      voiceTone: finalVoiceTone,
    };
    onSubmit(submissionData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userPrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Prompt / Theme for the Week</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="E.g., Tips for new remote workers, upcoming product launch features, common misconceptions about AI..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe the core idea or topic for the entire week's tweets.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="strategy"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Content Strategy</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a content strategy" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {TWEET_STRATEGY_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormDescription>
                    {TWEET_STRATEGY_OPTIONS.find(opt => opt.value === field.value)?.description || "Choose a strategy to guide tweet generation."}
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="tweetsPerDay"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Tweets Per Day (1-5)</FormLabel>
                <FormControl>
                    <Input type="number" min="1" max="5" {...field} onChange={e => field.onChange(parseInt(e.target.value,10))}/>
                </FormControl>
                <FormDescription>
                    How many unique tweets for each day?
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="selectedPredefinedTone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Voice & Tone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ''}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone (or 'Custom...')" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PREDEFINED_VOICE_TONES_COMMON.map((tone) => (
                      <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Optional: Choose or define a tone for the tweets.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedTone === 'Custom...' && (
            <FormField
              control={form.control}
              name="customVoiceTone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Voice & Tone Description</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., 'Slightly ironic but helpful'" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe your unique voice and tone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MessageSquare className="mr-2 h-4 w-4" />}
          Generate Weekly Tweets
        </Button>
      </form>
    </Form>
  );
}
