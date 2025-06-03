'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ContentType } from '@/lib/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Film, Instagram, LinkedinIcon, History, type LucideIcon } from 'lucide-react';

const iconMap: Record<ContentType['iconName'], LucideIcon> = {
  Film: Film,
  Instagram: Instagram,
  LinkedinIcon: LinkedinIcon,
  History: History,
};

interface ContentTypeCardProps {
  item: ContentType;
}

export function ContentTypeCard({ item }: ContentTypeCardProps) {
  const IconComponent = iconMap[item.iconName];

  const cardContent = (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 bg-card text-card-foreground border-border">
      <CardHeader className="flex-row items-center gap-4 pb-4">
        {IconComponent ? <IconComponent className="w-10 h-10 text-accent" /> : null}
        <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <CardDescription className="mb-6 text-base">{item.description}</CardDescription>
        <Button 
          asChild={!item.disabled} 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={item.disabled}
          aria-disabled={item.disabled}
        >
          {item.disabled ? (
            <span>Select</span>
          ) : (
            <Link href={item.href}>Select</Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  if (item.disabled && item.disabledMessage) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-not-allowed">{cardContent}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.disabledMessage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
}
