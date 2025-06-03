'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { LinkedInPostData } from '@/lib/types';
import { Download, Copy, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LinkedInPostDisplayProps {
  postData: LinkedInPostData;
  topic: string;
}

export function LinkedInPostDisplay({ postData, topic }: LinkedInPostDisplayProps) {
  const { toast } = useToast();

  const downloadTextFile = (filename: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Post Downloaded", description: `${filename} has been downloaded.` });
  };

  const handleDownload = () => {
    let content = `LinkedIn Post (Topic: ${topic}):\n\n${postData.post}`;
    if (postData.trendingInsight) {
      content += `\n\nTrending Insight:\n${postData.trendingInsight}`;
    }
    downloadTextFile(`linkedin_post_${topic.replace(/\s+/g, '_')}.txt`, content);
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({ title: `${type} Copied!`, description: `${type} has been copied to your clipboard.` });
      })
      .catch(err => {
        toast({ title: "Copy Failed", description: `Could not copy ${type.toLowerCase()}: ${err.message}`, variant: "destructive" });
      });
  };


  return (
    <Card className="mt-8 shadow-xl bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Generated LinkedIn Post</CardTitle>
        <CardDescription>Review your AI-generated post content below.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Post Content</h3>
            <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(postData.post, "Post Content")}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
          </div>
          <p className="whitespace-pre-wrap p-4 bg-background rounded-md text-sm leading-relaxed border border-border">
            {postData.post}
          </p>
        </div>

        {postData.trendingInsight && (
          <>
            <Separator />
            <div>
              <div className="flex justify-between items-center mb-2">
                 <h3 className="text-xl font-semibold flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-accent" /> Trending Insight</h3>
                <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(postData.trendingInsight!, "Trending Insight")}>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
              </div>
              <p className="whitespace-pre-wrap p-4 bg-background rounded-md text-sm italic text-muted-foreground border border-border">
                {postData.trendingInsight}
              </p>
            </div>
          </>
        )}
        
        <div className="flex justify-end pt-4">
          <Button onClick={handleDownload} variant="outline" className="text-foreground border-accent hover:bg-accent/10">
            <Download className="mr-2 h-4 w-4" />
            Download Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
