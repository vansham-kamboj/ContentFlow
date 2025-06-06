
'use client';

import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TweetItemProps {
  tweetText: string;
  day: string;
  index: number;
}

export function TweetItem({ tweetText, day, index }: TweetItemProps) {
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(tweetText)
      .then(() => {
        toast({ title: `Tweet Copied!`, description: `${day} - Tweet ${index + 1} copied to clipboard.` });
      })
      .catch(err => {
        toast({ title: "Copy Failed", description: `Could not copy tweet: ${err.message}`, variant: "destructive" });
      });
  };

  // Basic link detection for display - VERY simple, not robust for complex URLs or edge cases.
  const formatTweetText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{part}</a>;
      }
      return part;
    });
  };


  return (
    <div className="p-3 bg-background rounded-md border border-border/70">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {formatTweetText(tweetText)}
        </p>
        <div className="text-right mt-2">
            <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} className="text-muted-foreground hover:text-accent">
            <Copy className="mr-2 h-3 w-3" /> Copy Tweet
            </Button>
        </div>
    </div>
  );
}
