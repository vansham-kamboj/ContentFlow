
'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { ReelIdea } from '@/lib/types';
import { Eye, Shuffle, Loader2 } from 'lucide-react';

interface ReelCalendarDayProps {
  idea: ReelIdea;
  onShuffle: (day: string) => void;
  onPreview: (idea: ReelIdea) => void;
}

export function ReelCalendarDay({ idea, onShuffle, onPreview }: ReelCalendarDayProps) {
  const getTitleCellTooltip = () => {
    if (idea.error) return idea.error;
    if (idea.title) return idea.title;
    if (idea.isLoading) return "Generating title...";
    return "Click shuffle to generate title";
  };

  const getOneLineIdeaCellTooltip = () => {
    if (idea.error) return "Failed to generate idea";
    if (idea.oneLineIdea) return idea.oneLineIdea;
    if (idea.isLoading) return "Generating one-line idea...";
    return "Not generated yet";
  };

  return (
    <TableRow key={idea.id} className="border-b-border hover:bg-muted/50">
      <TableCell className="font-medium py-4">{idea.day}</TableCell>
      <TableCell className="py-4 max-w-xs" title={getTitleCellTooltip()}>
        {idea.error ? (
          <span className="text-destructive italic text-sm whitespace-normal">{idea.error}</span>
        ) : idea.title ? (
          <span className="truncate block">{idea.title}</span>
        ) : idea.isLoading ? (
          <span className="text-muted-foreground italic">Generating...</span>
        ) : (
          <span className="text-muted-foreground italic">Click shuffle to generate...</span>
        )}
      </TableCell>
      <TableCell className="py-4 max-w-md" title={getOneLineIdeaCellTooltip()}>
        {idea.error ? (
          <span className="text-destructive italic text-sm">-</span>
        ) : idea.oneLineIdea ? (
          <span className="truncate block">{idea.oneLineIdea}</span>
        ) : idea.isLoading ? (
          <span className="text-muted-foreground italic">Generating...</span>
        ) : (
          <span className="text-muted-foreground italic">Not generated yet</span>
        )}
      </TableCell>
      <TableCell className="text-right py-4">
        <div className="flex items-center justify-end space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onShuffle(idea.id)}
                  disabled={idea.isLoading}
                  className="hover:text-accent"
                  aria-label={`Shuffle idea for ${idea.day}`}
                >
                  {idea.isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Shuffle className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Regenerate Idea</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPreview(idea)}
                  disabled={!idea.title || idea.isLoading || !!idea.error}
                  className="hover:text-accent"
                  aria-label={`Preview script for ${idea.day}`}
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{idea.error ? "Cannot preview (error)" : "Preview Script"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}
