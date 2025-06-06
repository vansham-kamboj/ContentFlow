
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { DailyTweets } from '@/ai/flows/generate-weekly-tweets';
import { TweetItem } from './TweetItem';
import { Separator } from '@/components/ui/separator';

interface DailyTweetCardProps {
  daySchedule: DailyTweets;
}

export function DailyTweetCard({ daySchedule }: DailyTweetCardProps) {
  return (
    <Card className="bg-card text-card-foreground border-border shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary-foreground">{daySchedule.day}</CardTitle>
        <CardDescription>
          {daySchedule.tweets.length} tweet{daySchedule.tweets.length === 1 ? '' : 's'} planned for this day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {daySchedule.tweets.map((tweet, index) => (
          <React.Fragment key={index}>
            <TweetItem tweetText={tweet} day={daySchedule.day} index={index} />
            {index < daySchedule.tweets.length - 1 && <Separator className="my-3" />}
          </React.Fragment>
        ))}
        {daySchedule.tweets.length === 0 && (
            <p className="text-muted-foreground italic">No tweets generated for this day.</p>
        )}
      </CardContent>
    </Card>
  );
}

// Needed for React.Fragment with key
import React from 'react';
