
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ReelCalendarDay } from './ReelCalendarDay';
import { ReelPreviewModal } from './ReelPreviewModal';
import type { ReelIdea } from '@/lib/types';
import { generateReelIdeas, type GenerateReelIdeasInput } from '@/ai/flows/generate-reel-ideas';
import { generateReelScript, type GenerateReelScriptInput } from '@/ai/flows/generate-reel-script';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initialReelIdeas: ReelIdea[] = DAYS_OF_WEEK.map(day => ({
  id: day,
  day,
  title: '',
  oneLineIdea: '',
  isLoading: false,
  scriptData: null,
  isGeneratingScript: false,
  error: null,
}));

export function ReelCalendar() {
  const [niche, setNiche] = useState('');
  const [reelIdeas, setReelIdeas] = useState<ReelIdea[]>(initialReelIdeas);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedReelForPreview, setSelectedReelForPreview] = useState<ReelIdea | null>(null);
  
  const { toast } = useToast();

  const fetchReelIdea = useCallback(async (day: string, currentNiche: string): Promise<string | null> => {
    setReelIdeas(prev => prev.map(idea => idea.id === day ? { ...idea, isLoading: true, error: null, scriptData: null } : idea));
    try {
      const input: GenerateReelIdeasInput = { niche: currentNiche, dayOfWeek: day };
      const result = await generateReelIdeas(input);
      setReelIdeas(prev => prev.map(idea =>
        idea.id === day ? { ...idea, title: result.reelTitle, oneLineIdea: result.oneLineIdea, isLoading: false } : idea
      ));
      return null; // Success
    } catch (error) {
      console.error(`Error generating idea for ${day}:`, error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      const fullErrorText = `Failed to generate idea for ${day}. ${errorMessage}`;
      setReelIdeas(prev => prev.map(idea => idea.id === day ? { ...idea, isLoading: false, error: fullErrorText } : idea));
      toast({
        title: `Error Generating Idea for ${day}`,
        description: errorMessage, // Keep toast concise for individual errors
        variant: "destructive",
      });
      return fullErrorText; // Return the detailed error message
    }
  }, [toast]);

  const handleFetchAllIdeas = useCallback(async () => {
    if (!niche.trim()) {
      toast({ title: "Niche Required", description: "Please enter your niche to generate ideas.", variant: "destructive" });
      return;
    }
    setIsLoadingAll(true);
    setGlobalError(null);
    // Reset all ideas and errors before fetching
    setReelIdeas(prevIdeas => prevIdeas.map(idea => ({ 
      ...initialReelIdeas.find(initIdea => initIdea.id === idea.id)!, // Reset to initial structure
      isLoading: true, // Set loading true for all
      error: null,
      scriptData: null,
    })));

    const promises = DAYS_OF_WEEK.map(day => fetchReelIdea(day, niche));
    const results = await Promise.all(promises); // Each promise resolves to string (error message) or null (success)
    
    setIsLoadingAll(false);

    const errorsEncountered = results.filter(result => result !== null) as string[];
    if (errorsEncountered.length > 0) {
        const serviceUnavailableErrorPattern = /The AI service is currently experiencing high demand/i;
        const numServiceUnavailableErrors = errorsEncountered.filter(err => serviceUnavailableErrorPattern.test(err)).length;

        if (numServiceUnavailableErrors > 0 && numServiceUnavailableErrors === errorsEncountered.length) {
            setGlobalError("The AI service is currently overloaded. Some or all ideas could not be generated. Please try again later.");
        } else if (numServiceUnavailableErrors > 0) {
             setGlobalError("Some ideas could not be generated. This may be partly due to AI service overload. Check individual day statuses or try again.");
        } else {
            setGlobalError("Some ideas could not be generated. Please check individual day statuses or try again.");
        }
    }
  }, [niche, fetchReelIdea, toast]);


  const handleShuffle = (dayId: string) => {
    if (!niche.trim()) {
      toast({ title: "Niche Required", description: "Please enter your niche to regenerate the idea.", variant: "destructive" });
      return;
    }
    fetchReelIdea(dayId, niche); // Individual shuffle still uses its own error display via toast and per-day error field
  };

  const handlePreview = async (ideaToPreview: ReelIdea) => {
    setSelectedReelForPreview(ideaToPreview);
    setIsPreviewModalOpen(true);

    // Only fetch script if it doesn't exist and there's content to base it on
    if (!ideaToPreview.scriptData && ideaToPreview.title && ideaToPreview.oneLineIdea && !ideaToPreview.error) {
       setReelIdeas(prev => prev.map(idea => idea.id === ideaToPreview.id ? { ...idea, isGeneratingScript: true, error: null } : idea));
      try {
        const input: GenerateReelScriptInput = {
          reelTitle: ideaToPreview.title,
          reelIdea: ideaToPreview.oneLineIdea,
          userNiche: niche,
        };
        const scriptResult = await generateReelScript(input);
        setReelIdeas(prev => prev.map(idea =>
          idea.id === ideaToPreview.id ? { ...idea, scriptData: scriptResult, isGeneratingScript: false } : idea
        ));
        setSelectedReelForPreview(prev => prev ? {...prev, scriptData: scriptResult, isGeneratingScript: false} : null);
      } catch (error) {
        console.error(`Error generating script for ${ideaToPreview.title}:`, error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        const scriptErrorText = `Failed to generate script. ${errorMessage}`;
        setReelIdeas(prev => prev.map(idea => idea.id === ideaToPreview.id ? { ...idea, isGeneratingScript: false, error: scriptErrorText } : idea));
        setSelectedReelForPreview(prev => prev ? {...prev, error: scriptErrorText, isGeneratingScript: false} : null);
        toast({
          title: "Error Generating Script",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } else if (ideaToPreview.error && !ideaToPreview.scriptData) {
        // If there was an error fetching the idea, reflect that in the modal for script generation attempt
        setSelectedReelForPreview(prev => prev ? {...prev, error: `Cannot generate script because the initial idea failed: ${ideaToPreview.error}`, isGeneratingScript: false} : null);
    }
  };
  
  useEffect(() => {
    if (selectedReelForPreview) {
      const updatedIdea = reelIdeas.find(idea => idea.id === selectedReelForPreview.id);
      if (updatedIdea) {
        setSelectedReelForPreview(updatedIdea);
      }
    }
  }, [reelIdeas, selectedReelForPreview]);


  return (
    <Card className="shadow-xl bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Reel Content Calendar</CardTitle>
        <CardDescription>
          Enter your niche and generate a week's worth of reel ideas. Shuffle individual ideas or preview the full script.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            type="text"
            placeholder="E.g., Sustainable Fashion, AI Productivity, Home Cooking"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="flex-grow text-base"
            aria-label="Your Niche"
          />
          <Button onClick={handleFetchAllIdeas} disabled={isLoadingAll || !niche.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoadingAll ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate All Ideas
          </Button>
        </div>

        {globalError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Generating Ideas</AlertTitle>
            <AlertDescription>{globalError}</AlertDescription>
          </Alert>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-border">
                <TableHead className="w-[120px]">Day</TableHead>
                <TableHead>Reel Title</TableHead>
                <TableHead>One-Line Idea</TableHead>
                <TableHead className="text-right w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reelIdeas.map((idea) => (
                <ReelCalendarDay
                  key={idea.id}
                  idea={idea}
                  onShuffle={handleShuffle}
                  onPreview={handlePreview}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        {selectedReelForPreview && (
          <ReelPreviewModal
            isOpen={isPreviewModalOpen}
            onClose={() => setIsPreviewModalOpen(false)}
            reelTitle={selectedReelForPreview.title}
            reelIdea={selectedReelForPreview.oneLineIdea}
            scriptData={selectedReelForPreview.scriptData}
            isLoadingScript={!!selectedReelForPreview.isGeneratingScript}
            error={selectedReelForPreview.error}
            onRegenerate={() => {
                // Ensure we have the latest idea state for regeneration
                const currentIdeaState = reelIdeas.find(i => i.id === selectedReelForPreview.id);
                if (currentIdeaState) {
                    handlePreview(currentIdeaState);
                }
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}


    