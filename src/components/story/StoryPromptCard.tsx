'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import type { StoryPrompt } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface StoryPromptCardProps {
  prompt: StoryPrompt;
}

export function StoryPromptCard({ prompt }: StoryPromptCardProps) {
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(prompt.text)
      .then(() => {
        toast({ title: "Prompt Copied!", description: "The story prompt has been copied to your clipboard." });
      })
      .catch(err => {
        toast({ title: "Copy Failed", description: `Could not copy prompt: ${err.message}`, variant: "destructive" });
      });
  };

  return (
    <Card className="bg-card text-card-foreground border-border shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex flex-col items-start space-y-4">
        <p className="text-base leading-relaxed flex-grow">{prompt.text}</p>
        <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="self-end text-foreground border-accent hover:bg-accent/10">
          <Copy className="mr-2 h-4 w-4" /> Copy Prompt
        </Button>
      </CardContent>
    </Card>
  );
}
