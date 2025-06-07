
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { LinkedInTheme } from '@/lib/types';
import { Loader2, Wand2 } from 'lucide-react';
import { PREDEFINED_VOICE_TONES_COMMON } from '@/lib/types';

const themes: LinkedInTheme[] = ['Milestone', 'Advice', 'Behind-the-Scenes', 'Personal Growth'];

const formSchema = z.object({
  theme: z.enum(themes, { required_error: "Please select a theme." }),
  topic: z
    .string()
    .min(1, { message: "Topic cannot be empty."})
    .max(100, { message: "Topic must be 100 characters or less." }),
  postDetails: z
    .string()
    .min(10, { message: "Please provide some details for your post (at least 10 characters)." })
    .max(1500, { message: "Post details must be 1500 characters or less." }),
  includeTrendingInsight: z.boolean().default(false),
  selectedPredefinedTone: z.string().optional(),
  customVoiceTone: z.string().optional(),
});

// This type includes the dynamically added voiceTone for submission
export type LinkedInPostFormValues = z.infer<typeof formSchema> & { voiceTone?: string }; 

interface LinkedInPostFormProps {
  onSubmit: (data: LinkedInPostFormValues) => void; // Uses the extended type
  isLoading: boolean;
}

export function LinkedInPostForm({ onSubmit, isLoading }: LinkedInPostFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({ // form uses the base schema type
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: undefined, 
      topic: '',
      postDetails: '',
      includeTrendingInsight: false,
      selectedPredefinedTone: '',
      customVoiceTone: '',
    },
  });

  const selectedTone = form.watch("selectedPredefinedTone");

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
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
              <Select onValueChange={field.onChange} value={field.value || ''}>
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
              <FormLabel>Topic (Max 100 Characters)</FormLabel>
              <FormControl>
                <Input placeholder="E.g., New Product Launch, Key Project Learnings" {...field} />
              </FormControl>
              <FormDescription>
                A concise headline or context for your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell about your post (Your Story/Idea/Key Points)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share the details, story, or key points you want your post to cover. The AI will use this as the main content." 
                  className="min-h-[150px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                This is where you provide the core information for your post. Be as detailed as you like (up to 1500 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="selectedPredefinedTone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Preferred Voice & Tone</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ''}>
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
                    Choose or define a tone for the post.
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
                    <Input placeholder="Describe your custom tone" {...field} />
                    </FormControl>
                    <FormDescription>
                    E.g., 'Scholarly yet approachable'.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            )}
        </div>


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
                  Optionally, add AI-generated insights on why your topic might be trending.
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

