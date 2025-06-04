
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
import { AlertCircle, Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const PREDEFINED_VOICE_TONES = [
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
  const [seriesName, setSeriesName] = useState('');
  const [selectedPredefinedTone, setSelectedPredefinedTone] = useState<string>('');
  const [customVoiceTone, setCustomVoiceTone] = useState<string>('');

  const [reelIdeas, setReelIdeas] = useState<ReelIdea[]>(initialReelIdeas);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedReelForPreview, setSelectedReelForPreview] = useState<ReelIdea | null>(null);
  
  const { toast } = useToast();

  const getFinalVoiceTone = useCallback(() => {
    if (selectedPredefinedTone === "Custom...") {
      return customVoiceTone.trim() || undefined;
    }
    return selectedPredefinedTone || undefined;
  }, [selectedPredefinedTone, customVoiceTone]);

  const fetchReelIdea = useCallback(async (day: string, currentNiche: string, currentSeriesName?: string, currentVoiceTone?: string): Promise<string | null> => {
    setReelIdeas(prev => prev.map(idea => idea.id === day ? { ...idea, isLoading: true, error: null, scriptData: null } : idea));
    try {
      const input: GenerateReelIdeasInput = { 
        niche: currentNiche, 
        dayOfWeek: day, 
        seriesName: currentSeriesName || undefined,
        voiceTone: currentVoiceTone,
      };
      const result = await generateReelIdeas(input);
      setReelIdeas(prev => prev.map(idea =>
        idea.id === day ? { ...idea, title: result.reelTitle, oneLineIdea: result.oneLineIdea, isLoading: false } : idea
      ));
      return null; 
    } catch (error) {
      console.error(`Error generating idea for ${day}:`, error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      const fullErrorText = `Failed to generate idea for ${day}. ${errorMessage}`;
      setReelIdeas(prev => prev.map(idea => idea.id === day ? { ...idea, isLoading: false, error: fullErrorText } : idea));
      return fullErrorText; 
    }
  }, []);

  const handleFetchAllIdeas = useCallback(async () => {
    if (!niche.trim()) {
      toast({ title: "Niche Required", description: "Please enter your niche to generate ideas.", variant: "destructive" });
      return;
    }
    setIsLoadingAll(true);
    setGlobalError(null);
    setReelIdeas(prevIdeas => prevIdeas.map(idea => ({ 
      ...initialReelIdeas.find(initIdea => initIdea.id === idea.id)!, 
      isLoading: true, 
      error: null,
      scriptData: null,
    })));

    const finalVoiceTone = getFinalVoiceTone();
    const promises = DAYS_OF_WEEK.map(day => fetchReelIdea(day, niche, seriesName, finalVoiceTone));
    const results = await Promise.all(promises); 
    
    setIsLoadingAll(false);

    const errorsEncountered = results.filter(result => result !== null) as string[];
    if (errorsEncountered.length > 0) {
        const serviceUnavailableErrorPattern = /The AI service is currently experiencing high demand/i;
        const numServiceUnavailableErrors = errorsEncountered.filter(err => serviceUnavailableErrorPattern.test(err)).length;

        if (numServiceUnavailableErrors > 0 && numServiceUnavailableErrors === errorsEncountered.length) {
            setGlobalError("The AI service is currently overloaded. All ideas could not be generated. Please try again later.");
             toast({ title: "AI Service Overloaded", description: "All ideas could not be generated. Please try again later.", variant: "destructive", duration: 5000 });
        } else if (numServiceUnavailableErrors > 0) {
             setGlobalError("Some ideas could not be generated, partly due to AI service overload. Check individual day statuses or try again.");
             toast({ title: "Partial Success", description: "Some ideas failed, possibly due to AI service issues. Try again or check individual days.", variant: "warning", duration: 5000 });
        } else {
            setGlobalError(`Failed to generate ideas for ${errorsEncountered.length} day(s). Please check individual day statuses or try again.`);
            toast({ title: "Generation Error", description: `Ideas for ${errorsEncountered.length} day(s) failed.`, variant: "destructive", duration: 5000 });
        }
    } else {
        toast({ title: "Ideas Generated!", description: "All reel ideas for the week have been generated.", duration: 3000});
    }
  }, [niche, seriesName, fetchReelIdea, toast, getFinalVoiceTone]);


  const handleShuffle = (dayId: string) => {
    if (!niche.trim()) {
      toast({ title: "Niche Required", description: "Please enter your niche to regenerate the idea.", variant: "destructive" });
      return;
    }
    const finalVoiceTone = getFinalVoiceTone();
    fetchReelIdea(dayId, niche, seriesName, finalVoiceTone).then(error => {
        if (error) {
            toast({ title: `Error Regenerating Idea for ${dayId}`, description: error, variant: "destructive" });
        } else {
            toast({ title: `Idea Regenerated for ${dayId}`, description: "The reel idea has been updated."});
        }
    });
  };

  const handlePreview = async (ideaToPreview: ReelIdea) => {
    setSelectedReelForPreview(ideaToPreview);
    setIsPreviewModalOpen(true);

    if (!ideaToPreview.scriptData && ideaToPreview.title && ideaToPreview.oneLineIdea && !ideaToPreview.error) {
       setReelIdeas(prev => prev.map(idea => idea.id === ideaToPreview.id ? { ...idea, isGeneratingScript: true, error: null } : idea));
      try {
        const finalVoiceTone = getFinalVoiceTone();
        const input: GenerateReelScriptInput = {
          reelTitle: ideaToPreview.title,
          reelIdea: ideaToPreview.oneLineIdea,
          userNiche: niche,
          seriesName: seriesName || undefined,
          voiceTone: finalVoiceTone,
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
          Enter your niche, optionally a series name, and your preferred voice/tone, then generate a week's worth of reel ideas. Shuffle individual ideas or preview the full script.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Input
            type="text"
            placeholder="E.g., Sustainable Fashion, AI Productivity"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="text-base"
            aria-label="Your Niche"
          />
          <Input
            type="text"
            placeholder="Optional: Series Name (e.g., 'Weekly Coding Tips')"
            value={seriesName}
            onChange={(e) => setSeriesName(e.target.value)}
            className="text-base"
            aria-label="Series Name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="voiceToneSelect" className="mb-2 block text-sm font-medium">Preferred Voice & Tone</Label>
            <Select value={selectedPredefinedTone} onValueChange={setSelectedPredefinedTone}>
              <SelectTrigger id="voiceToneSelect">
                <SelectValue placeholder="Select a tone (or 'Custom...')" />
              </SelectTrigger>
              <SelectContent>
                {PREDEFINED_VOICE_TONES.map(tone => (
                  <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedPredefinedTone === "Custom..." && (
            <div>
              <Label htmlFor="customVoiceTone" className="mb-2 block text-sm font-medium">Custom Voice & Tone</Label>
              <Input
                id="customVoiceTone"
                type="text"
                placeholder="Describe your custom tone (e.g., 'Academic but engaging')"
                value={customVoiceTone}
                onChange={(e) => setCustomVoiceTone(e.target.value)}
                className="text-base"
              />
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button 
            onClick={handleFetchAllIdeas} 
            disabled={isLoadingAll || !niche.trim()} 
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isLoadingAll ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4"/>}
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
            dayOfWeek={selectedReelForPreview.day} 
            scriptData={selectedReelForPreview.scriptData}
            isLoadingScript={!!selectedReelForPreview.isGeneratingScript}
            error={selectedReelForPreview.error}
            onRegenerate={() => {
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
