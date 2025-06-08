
'use client';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { LinkedInPostForm, type LinkedInPostFormValues } from '@/components/linkedin/LinkedInPostForm';
import { LinkedInPostDisplay } from '@/components/linkedin/LinkedInPostDisplay';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { LinkedInPostData } from '@/lib/types'; 
import { generateLinkedInPost, type GenerateLinkedInPostInput } from '@/ai/flows/generate-linkedin-post';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Loader2 } from 'lucide-react'; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LinkedInPage() {
  const [postData, setPostData] = useState<LinkedInPostData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const { toast } = useToast();

  const handleFormSubmit = async (data: LinkedInPostFormValues) => {
    setIsLoading(true);
    setError(null);
    setPostData(null);
    setCurrentTopic(data.topic); 
    try {
      const input: GenerateLinkedInPostInput = {
        theme: data.theme,
        topic: data.topic,
        postDetails: data.postDetails,
        includeTrendingInsight: data.includeTrendingInsight,
        voiceTone: data.voiceTone, 
      };
      const result = await generateLinkedInPost(input);
      setPostData(result);
      toast({
        title: "LinkedIn Post Generated!",
        description: "Your AI-crafted post is ready for review.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to generate LinkedIn post. ${errorMessage}`);
      toast({
        title: "Error Generating Post",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper title="LinkedIn Post Generator" description="Craft authentic and insightful posts for your professional network.">
      <Card className="shadow-xl bg-card text-card-foreground border-border">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Create Your Next LinkedIn Post</CardTitle>
          <CardDescription>
            Select a theme, provide a topic and your detailed content idea, choose your voice, and let AI help you generate compelling content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinkedInPostForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {isLoading && !postData && ( 
            <div className="flex items-center justify-center h-40 mt-8">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="ml-4 text-lg text-foreground">Generating your LinkedIn post...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {postData && !isLoading && (
            <LinkedInPostDisplay postData={postData} topic={currentTopic} />
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
