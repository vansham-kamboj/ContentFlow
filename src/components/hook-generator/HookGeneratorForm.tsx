
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2 } from 'lucide-react';
import type { GenerateHooksInput } from '@/ai/flows/generate-hooks';
import { ContentFormatHookEnum, HookStyleEnum } from '@/ai/flows/generate-hooks';
import { CONTENT_FORMAT_HOOK_OPTIONS, HOOK_STYLE_OPTIONS, PREDEFINED_VOICE_TONES_COMMON } from '@/lib/types';

const formSchema = z.object({
  topicOrSummary: z
    .string()
    .min(5, { message: 'Topic or summary must be at least 5 characters.' })
    .max(300, { message: 'Topic or summary must be 300 characters or less.' }),
  contentFormat: ContentFormatHookEnum,
  selectedPredefinedTone: z.string().optional(),
  customVoiceTone: z.string().optional(),
  hookStyles: z
    .array(HookStyleEnum)
    .min(1, { message: 'Please select at least one hook style.' }),
  numberOfHooks: z.number().min(3).max(10).default(5),
});

export type HookGeneratorFormValues = z.infer<typeof formSchema>;

interface HookGeneratorFormProps {
  onSubmit: (data: GenerateHooksInput) => void;
  isLoading: boolean;
}

export function HookGeneratorForm({ onSubmit, isLoading }: HookGeneratorFormProps) {
  const form = useForm<HookGeneratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topicOrSummary: '',
      contentFormat: 'Reel',
      selectedPredefinedTone: '',
      customVoiceTone: '',
      hookStyles: [],
      numberOfHooks: 5,
    },
  });

  const selectedTone = form.watch('selectedPredefinedTone');

  const handleFormSubmit = (data: HookGeneratorFormValues) => {
    let finalVoiceTone: string | undefined;
    if (data.selectedPredefinedTone === 'Custom...') {
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
          name="topicOrSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic or Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="E.g., How creators can save 10 hours a week with AI tools"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe the core idea or topic your content is about.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Format</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content format" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CONTENT_FORMAT_HOOK_OPTIONS.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                What type of content are you creating?
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
                  Optional: Choose or define a tone.
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
                  <FormLabel>Custom Voice & Tone</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., 'Excited and slightly quirky'" {...field} />
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
        
        <FormField
          control={form.control}
          name="numberOfHooks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Hooks to Generate (3-10)</FormLabel>
              <FormControl>
                <Input type="number" min="3" max="10" {...field} onChange={e => field.onChange(parseInt(e.target.value,10))}/>
              </FormControl>
              <FormDescription>
                How many hook variations would you like?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="hookStyles"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Hook Styles</FormLabel>
                <FormDescription>
                  Select one or more styles for your hooks.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HOOK_STYLE_OPTIONS.map((style) => (
                  <FormField
                    key={style.id}
                    control={form.control}
                    name="hookStyles"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={style.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background hover:bg-muted/50 transition-colors"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(style.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), style.id])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== style.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium cursor-pointer">
                              {style.label}
                            </FormLabel>
                            {style.description && (
                               <FormDescription className="text-xs">{style.description}</FormDescription>
                            )}
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          Generate Hooks
        </Button>
      </form>
    </Form>
  );
}
