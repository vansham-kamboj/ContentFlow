
'use client';

import React, { useState, useCallback } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { HookGeneratorForm, type HookGeneratorFormValues } from '@/components/hook-generator/HookGeneratorForm';
import { HookDisplayCard } from '@/components/hook-generator/HookDisplayCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateHooks, type GenerateHooksInput } from '@/ai/flows/generate-hooks';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2, Download, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';

export default function HookGeneratorPage() {
  const [generatedHooks, setGeneratedHooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: GenerateHooksInput) => {
    setIsLoading(true);
    setError(null);
    setGeneratedHooks([]);
    try {
      const result = await generateHooks(data);
      setGeneratedHooks(result.hooks);
      if (result.hooks.length === 0) {
        toast({
            title: "No Hooks Generated",
            description: "The AI couldn't generate hooks for the given input. Try adjusting your topic or styles.",
            variant: "default",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate hooks. ${errorMessage}`);
      toast({
        title: "Error Generating Hooks",
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
    toast({ title: "Hooks Downloaded", description: `${filename} has been downloaded.` });
  };

  const handleDownloadHooks = () => {
    if (generatedHooks.length === 0) {
      toast({ title: "No Hooks to Download", description: "Generate some hooks first.", variant: "destructive" });
      return;
    }
    const content = generatedHooks.map((hook, index) => `Hook ${index + 1}:\n${hook}`).join('\n\n');
    downloadTextFile(`generated_hooks.txt`, content);
  };


  return (
    <PageWrapper title="Attention-Grabbing Hook Generator" description="Craft compelling opening lines for your content.">
      <Card className="shadow-xl bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center">
            <Wand2 className="mr-3 h-8 w-8 text-accent"/>
            Generate Viral Hooks
          </CardTitle>
          <CardDescription>
            Provide a topic, choose your content format, voice, and desired styles. Let AI create hooks that captivate your audience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HookGeneratorForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {isLoading && generatedHooks.length === 0 && (
             <div className="flex items-center justify-center h-40 mt-8">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="ml-4 text-lg text-foreground">Generating hooks...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {generatedHooks.length > 0 && !isLoading && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold font-headline text-primary-foreground">Generated Hooks</h2>
                <Button onClick={handleDownloadHooks} variant="outline" className="text-foreground border-accent hover:bg-accent/10">
                  <Download className="mr-2 h-4 w-4" />
                  Download All Hooks
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generatedHooks.map((hook, index) => (
                  <HookDisplayCard key={index} hookText={hook} index={index} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
