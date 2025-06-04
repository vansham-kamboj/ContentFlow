
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HookDisplayCardProps {
  hookText: string;
  index: number;
}

export function HookDisplayCard({ hookText, index }: HookDisplayCardProps) {
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(hookText)
      .then(() => {
        toast({ title: `Hook ${index + 1} Copied!`, description: "The hook has been copied to your clipboard." });
      })
      .catch(err => {
        toast({ title: "Copy Failed", description: `Could not copy hook: ${err.message}`, variant: "destructive" });
      });
  };

  return (
    <Card className="bg-card text-card-foreground border-border shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4 sm:p-6 flex flex-col items-start space-y-3">
        <p className="text-base leading-relaxed flex-grow italic">"{hookText}"</p>
        <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="self-end text-foreground border-accent hover:bg-accent/10">
          <Copy className="mr-2 h-4 w-4" /> Copy Hook
        </Button>
      </CardContent>
    </Card>
  );
}
