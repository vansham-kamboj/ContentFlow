
'use client';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { TweetGeneratorForm, type TweetGeneratorFormValues } from '@/components/tweet-generator/TweetGeneratorForm';
import { DailyTweetCard } from '@/components/tweet-generator/DailyTweetCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateWeeklyTweets, type GenerateWeeklyTweetsInput, type DailyTweets } from '@/ai/flows/generate-weekly-tweets';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2, Download, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';

export default function TweetGeneratorPage() {
  const [weeklySchedule, setWeeklySchedule] = useState<DailyTweets[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = async (data: GenerateWeeklyTweetsInput) => {
    setIsLoading(true);
    setError(null);
    setWeeklySchedule([]);
    try {
      const result = await generateWeeklyTweets(data);
      setWeeklySchedule(result.weeklySchedule);
      if (result.weeklySchedule.every(day => day.tweets.length === 0)) {
        toast({
            title: "No Tweets Generated",
            description: "The AI couldn't generate tweets for the given input. Try adjusting your prompt or strategy.",
            variant: "default",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate tweets. ${errorMessage}`);
      toast({
        title: "Error Generating Tweets",
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
    toast({ title: "Tweets Downloaded", description: `${filename} has been downloaded.` });
  };

  const handleDownloadTweets = () => {
    if (weeklySchedule.length === 0) {
      toast({ title: "No Tweets to Download", description: "Generate some tweets first.", variant: "destructive" });
      return;
    }
    let content = "Weekly X (Twitter) Schedule:\n\n";
    weeklySchedule.forEach(daySchedule => {
      content += `## ${daySchedule.day}\n\n`;
      daySchedule.tweets.forEach((tweet, index) => {
        content += `Tweet ${index + 1}:\n${tweet}\n\n`;
      });
      content += "---\n\n";
    });
    downloadTextFile(`weekly_tweets_schedule.txt`, content);
  };

  return (
    <PageWrapper title="Weekly X (Twitter) Tweet Generator" description="Plan your week's X content with AI-powered tweet ideas.">
      <Card className="shadow-xl bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center">
            <MessageSquare className="mr-3 h-8 w-8 text-accent"/>
            Craft Your Weekly Tweet Schedule
          </CardTitle>
          <CardDescription>
            Provide a main prompt, choose a strategy, set tweets per day, and select a voice. AI will generate a 7-day plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TweetGeneratorForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {isLoading && weeklySchedule.length === 0 && (
             <div className="flex items-center justify-center h-40 mt-8">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="ml-4 text-lg text-foreground">Generating weekly tweets...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {weeklySchedule.length > 0 && !isLoading && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold font-headline text-primary-foreground">Generated Weekly Schedule</h2>
                <Button onClick={handleDownloadTweets} variant="outline" className="text-foreground border-accent hover:bg-accent/10">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Schedule
                </Button>
              </div>
              <div className="space-y-8">
                {weeklySchedule.map((daySchedule) => (
                  <DailyTweetCard key={daySchedule.day} daySchedule={daySchedule} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

