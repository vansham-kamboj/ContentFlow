'use client';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StoryPromptCard } from '@/components/story/StoryPromptCard';
import type { StoryPrompt } from '@/lib/types';
import { generateInstagramStoryPrompts, type GenerateInstagramStoryPromptsInput } from '@/ai/flows/generate-instagram-story-prompts';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Download, AlertCircle, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function StoryPage() {
  const [niche, setNiche] = useState('');
  const [prompts, setPrompts] = useState<StoryPrompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGeneratePrompts = async () => {
    if (!niche.trim()) {
      toast({ title: "Niche Required", description: "Please enter your niche to generate story prompts.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setError(null);
    setPrompts([]); 
    try {
      const input: GenerateInstagramStoryPromptsInput = { niche };
      const result = await generateInstagramStoryPrompts(input);
      setPrompts(result.prompts.map((p, index) => ({ id: `prompt-${index}`, text: p })));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate story prompts. ${errorMessage}`);
      toast({
        title: "Error Generating Prompts",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTextFile = (filename: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Prompts Downloaded", description: `${filename} has been downloaded.` });
  };

  const handleDownloadPrompts = () => {
    if (prompts.length === 0) {
      toast({ title: "No Prompts", description: "Generate some prompts first before downloading.", variant: "destructive" });
      return;
    }
    const content = prompts.map(p => `- ${p.text}`).join('\n\n');
    downloadTextFile(`instagram_story_prompts_${niche.replace(/\s+/g, '_')}.txt`, content);
  };

  return (
    <PageWrapper title="Instagram Story Prompts" description="Generate interactive story ideas to engage your audience.">
      <Card className="shadow-xl bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Boost Your Story Engagement</CardTitle>
          <CardDescription>
            Enter your niche to get a list of creative Instagram Story prompts like polls, Q&As, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              type="text"
              placeholder="E.g., Fitness, Travel, Tech Gadgets"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="flex-grow text-base"
              aria-label="Your Niche for Instagram Stories"
            />
            <Button onClick={handleGeneratePrompts} disabled={isLoading || !niche.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Prompts
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {prompts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {prompts.map((prompt) => (
                  <StoryPromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
              <div className="text-center">
                <Button onClick={handleDownloadPrompts} variant="outline" className="text-foreground border-accent hover:bg-accent/10">
                  <Download className="mr-2 h-4 w-4" />
                  Download All Prompts
                </Button>
              </div>
            </>
          )}
          {isLoading && prompts.length === 0 && (
             <div className="flex items-center justify-center h-40">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="ml-4 text-lg">Generating prompts...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
