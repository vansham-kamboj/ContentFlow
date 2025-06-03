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

  const fetchReelIdea = useCallback(async (day: string, currentNiche: string) => {
    setReelIdeas(prev => prev.map(idea => idea.id === day ? { ...idea, isLoading: true, error: null } : idea));
    try {
      const input: GenerateReelIdeasInput = { niche: currentNiche, dayOfWeek: day };
      const result = await generateReelIdeas(input);
      setReelIdeas(prev => prev.map(idea =>
        idea.id === day ? { ...idea, title: result.reelTitle, oneLineIdea: result.oneLineIdea, isLoading: false } : idea
      ));
    } catch (error) {
      console.error(`Error generating idea for ${day}:`, error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      setReelIdeas(prev => prev.map(idea => idea.id === day ? { ...idea, isLoading: false, error: `Failed to generate idea for ${day}. ${errorMessage}` } : idea));
      toast({
        title: `Error Generating Idea for ${day}`,
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFetchAllIdeas = useCallback(async () => {
    if (!niche.trim()) {
      toast({ title: "Niche Required", description: "Please enter your niche to generate ideas.", variant: "destructive" });
      return;
    }
    setIsLoadingAll(true);
    setGlobalError(null);
    setReelIdeas(prevIdeas => prevIdeas.map(idea => ({ ...idea, title: '', oneLineIdea: '', scriptData: null, error: null }))); // Reset previous ideas and errors

    const promises = DAYS_OF_WEEK.map(day => fetchReelIdea(day, niche));
    await Promise.allSettled(promises);
    
    setIsLoadingAll(false);
    // Check if any individual fetch failed and set a global error if necessary
    if (reelIdeas.some(idea => idea.error)) {
        setGlobalError("Some ideas could not be generated. Check individual days or try again.");
    }
  }, [niche, fetchReelIdea, toast, reelIdeas]);


  const handleShuffle = (dayId: string) => {
    if (!niche.trim()) {
      toast({ title: "Niche Required", description: "Please enter your niche to regenerate the idea.", variant: "destructive" });
      return;
    }
    fetchReelIdea(dayId, niche);
  };

  const handlePreview = async (ideaToPreview: ReelIdea) => {
    setSelectedReelForPreview(ideaToPreview);
    setIsPreviewModalOpen(true);

    if (!ideaToPreview.scriptData && ideaToPreview.title && ideaToPreview.oneLineIdea) {
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
        // Update selectedReelForPreview state for modal immediately
        setSelectedReelForPreview(prev => prev ? {...prev, scriptData: scriptResult, isGeneratingScript: false} : null);
      } catch (error) {
        console.error(`Error generating script for ${ideaToPreview.title}:`, error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setReelIdeas(prev => prev.map(idea => idea.id === ideaToPreview.id ? { ...idea, isGeneratingScript: false, error: `Failed to generate script. ${errorMessage}` } : idea));
        setSelectedReelForPreview(prev => prev ? {...prev, error: `Failed to generate script. ${errorMessage}`, isGeneratingScript: false} : null);
        toast({
          title: "Error Generating Script",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };
  
  // Effect to update modal content when scriptData changes in reelIdeas state
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
            <AlertTitle>Error</AlertTitle>
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
            onRegenerate={() => handlePreview(selectedReelForPreview)}
          />
        )}
      </CardContent>
    </Card>
  );
}
