'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { LinkedInTheme } from '@/lib/types';
import { Loader2, Wand2 } from 'lucide-react';

const themes: LinkedInTheme[] = ['Milestone', 'Advice', 'Behind-the-Scenes', 'Personal Growth'];

const formSchema = z.object({
  theme: z.enum(themes, { required_error: "Please select a theme." }),
  topic: z.string().min(5, { message: "Topic must be at least 5 characters long." }).max(100, { message: "Topic must be 100 characters or less." }),
  includeTrendingInsight: z.boolean().default(false),
});

export type LinkedInPostFormValues = z.infer<typeof formSchema>;

interface LinkedInPostFormProps {
  onSubmit: (data: LinkedInPostFormValues) => void;
  isLoading: boolean;
}

export function LinkedInPostForm({ onSubmit, isLoading }: LinkedInPostFormProps) {
  const form = useForm<LinkedInPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: undefined, // Default to undefined to show placeholder
      topic: '',
      includeTrendingInsight: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
