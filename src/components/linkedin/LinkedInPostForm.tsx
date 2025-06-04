
'use client';

import React, { useState } from 'react'; // Added useState
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Ensure Label is imported
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { LinkedInTheme } from '@/lib/types';
import { Loader2, Wand2 } from 'lucide-react';

const themes: LinkedInTheme[] = ['Milestone', 'Advice', 'Behind-the-Scenes', 'Personal Growth'];

const PREDEFINED_VOICE_TONES_LINKEDIN = [ // Renamed to avoid potential conflicts if imported elsewhere
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


const formSchema = z.object({
  theme: z.enum(themes, { required_error: "Please select a theme." }),
  topic: z.string().min(5, { message: "Topic must be at least 5 characters long." }).max(100, { message: "Topic must be 100 characters or less." }),
  includeTrendingInsight: z.boolean().default(false),
  selectedPredefinedTone: z.string().optional(), // For the Select component
  customVoiceTone: z.string().optional(), // For the custom Input field
});

export type LinkedInPostFormValues = z.infer<typeof formSchema> & { voiceTone?: string }; // Add voiceTone to the final output type

interface LinkedInPostFormProps {
  onSubmit: (data: LinkedInPostFormValues) => void;
  isLoading: boolean;
}

export function LinkedInPostForm({ onSubmit, isLoading }: LinkedInPostFormProps) {
  const form = useForm<LinkedInPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: undefined, 
      topic: '',
      includeTrendingInsight: false,
      selectedPredefinedTone: '',
      customVoiceTone: '',
    },
  });

  const selectedTone = form.watch("selectedPredefinedTone");

  const handleFormSubmit = (data: LinkedInPostFormValues) => {
    let finalVoiceTone: string | undefined = undefined;
    if (data.selectedPredefinedTone === "Custom...") {
      finalVoiceTone = data.customVoiceTone?.trim() || undefined;
    } else {
      finalVoiceTone = data.selectedPredefinedTone || undefined;
    }
    onSubmit({ ...data, voiceTone: finalVoiceTone });
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme for your post" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {themes.map((themeName) => (
                    <SelectItem key={themeName} value={themeName}>
                      {themeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the overall style or purpose of your LinkedIn post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Launching a new product, Lessons from a recent project" {...field} />
              </FormControl>
              <FormDescription>
                What specific subject do you want to post about?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="selectedPredefinedTone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Voice & Tone</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tone (or 'Custom...')" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PREDEFINED_VOICE_TONES_LINKEDIN.map((tone) => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the desired tone for your post, or select "Custom..." to define your own.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedTone === "Custom..." && (
          <FormField
            control={form.control}
            name="customVoiceTone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Voice & Tone</FormLabel>
                <FormControl>
                  <Input placeholder="Describe your custom tone (e.g., 'Scholarly yet approachable')" {...field} />
                </FormControl>
                <FormDescription>
                  If you selected "Custom...", type your desired voice and tone here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="includeTrendingInsight"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow bg-background">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Include Trending Insight
                </FormLabel>
                <FormDescription>
                  Optionally, add AI-generated insights on why this topic might be trending.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          Generate LinkedIn Post
        </Button>
      </form>
    </Form>
  );
}
