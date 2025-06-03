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
  return (
    <TableRow key={idea.id} className="border-b-border hover:bg-muted/50">
      <TableCell className="font-medium py-4">{idea.day}</TableCell>
      <TableCell className="py-4 max-w-xs truncate" title={idea.title || "Not generated yet"}>
        {idea.title || <span className="text-muted-foreground italic">Click shuffle to generate...</span>}
      </TableCell>
      <TableCell className="py-4 max-w-md truncate" title={idea.oneLineIdea || "Not generated yet"}>
        {idea.oneLineIdea || <span className="text-muted-foreground italic">Not generated yet</span>}
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
                  disabled={!idea.title || idea.isLoading}
                  className="hover:text-accent"
                  aria-label={`Preview script for ${idea.day}`}
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview Script</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}
