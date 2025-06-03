'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Loader2, Download, Copy } from 'lucide-react';
import type { GenerateReelScriptOutput } from '@/ai/flows/generate-reel-script';
import { useToast } from '@/hooks/use-toast';

interface ReelPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reelTitle: string;
  reelIdea: string;
  scriptData: GenerateReelScriptOutput | null | undefined;
  isLoadingScript: boolean;
  error?: string | null;
  onRegenerate?: () => void; // Optional: if regeneration within modal is needed
}

export function ReelPreviewModal({
  isOpen,
  onClose,
  reelTitle,
  reelIdea,
  scriptData,
  isLoadingScript,
  error,
  onRegenerate,
}: ReelPreviewModalProps) {
  const { toast } = useToast();

  const downloadTextFile = (filename: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Content Downloaded", description: `${filename} has been downloaded.` });
  };

  const handleDownload = () => {
    if (scriptData) {
      const content = `
Reel Title: ${reelTitle}
Reel Idea: ${reelIdea}

Script:
${scriptData.reelScript}

Caption:
${scriptData.caption}

Hashtags:
${scriptData.hashtags.join(' ')}
      `;
      downloadTextFile(`${reelTitle.replace(/\s+/g, '_')}_reel_content.txt`, content.trim());
    }
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card text-card-foreground border-border">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Reel Preview: {reelTitle}</DialogTitle>
          <DialogDescription>
            Generated script, caption, and hashtags for your reel idea: "{reelIdea}"
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          {isLoadingScript && (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-12 w-12 animate-spin text-accent" />
              <p className="ml-4 text-lg">Generating script...</p>
            </div>
          )}
          {error && !isLoadingScript && (
             <div className="text-destructive p-4 border border-destructive rounded-md">
                <p className="font-semibold">Error generating script:</p>
                <p>{error}</p>
                {onRegenerate && (
                   <Button onClick={onRegenerate} variant="outline" className="mt-2">Try Again</Button>
                )}
             </div>
          )}
          {scriptData && !isLoadingScript && !error && (
            <div className="space-y-6 py-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold font-headline">Script</h3>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(scriptData.reelScript, "Script")}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </div>
                <p className="whitespace-pre-wrap p-3 bg-background rounded-md text-sm leading-relaxed">{scriptData.reelScript}</p>
              </div>
              <Separator />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold font-headline">Caption</h3>
                   <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(scriptData.caption, "Caption")}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </div>
                <p className="whitespace-pre-wrap p-3 bg-background rounded-md text-sm leading-relaxed">{scriptData.caption}</p>
              </div>
              <Separator />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold font-headline">Hashtags</h3>
                   <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(scriptData.hashtags.join(' '), "Hashtags")}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 bg-background rounded-md">
                  {scriptData.hashtags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
        <DialogFooter className="mt-4">
          {scriptData && !isLoadingScript && !error && (
            <Button onClick={handleDownload} variant="outline" className="text-foreground border-accent hover:bg-accent/10">
              <Download className="mr-2 h-4 w-4" />
              Download All
            </Button>
          )}
          <Button onClick={onClose} variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
