
'use client';

import React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

// Expanded placeholder data for the feed items
const placeholderFeedItems = Array.from({ length: 20 }).map((_, i) => ({
  id: `item-${i}`,
  linkUrl: `https://example.com/post/${i}`,
  platform: ['YouTube', 'Instagram', 'LinkedIn', 'TikTok', 'X.com'][i % 5],
  userName: `User ${i + 1}`,
  userAvatar: `https://placehold.co/40x40.png?text=U${i+1}`,
  imageUrl: `https://placehold.co/300x169.png?text=Post+${i+1}`, // 16:9 aspect ratio
  imageHint: ['travel', 'food', 'tech', 'nature', 'art'][i % 5],
  postCaption: `This is a captivating post (#${i + 1}) exploring new horizons and exciting ideas. Join the conversation! #socialmedia #content #explore`,
}));

interface FeedItem {
  id: string;
  linkUrl: string;
  platform: string;
  userName: string;
  userAvatar: string;
  imageUrl: string;
  imageHint?: string;
  postCaption: string;
}

function FeedItemCard({ item }: { item: FeedItem }) {
  return (
    <Card className="w-72 shrink-0 m-2 bg-card text-card-foreground border-border shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-3">
        <div className="flex items-center gap-2">
          <img src={item.userAvatar} alt={item.userName} className="h-8 w-8 rounded-full border" data-ai-hint="user avatar"/>
          <div>
            <p className="text-sm font-medium truncate" title={item.userName}>{item.userName}</p>
            <p className="text-xs text-muted-foreground">On {item.platform}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="aspect-video mb-2 w-full overflow-hidden rounded-md">
          <Image
            src={item.imageUrl}
            alt="Post image"
            width={268} 
            height={151} 
            className="object-cover w-full h-full"
            data-ai-hint={item.imageHint || "social media content"}
          />
        </div>
        <p className="text-xs break-words line-clamp-3 mb-2 h-12 leading-tight">{item.postCaption}</p>
        <a
          href={item.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent hover:underline truncate block mt-1"
        >
          View Post &rarr;
        </a>
      </CardContent>
    </Card>
  );
}

interface FeedRowProps {
  items: FeedItem[];
  animationClass: string;
  ariaLabel: string;
}

function FeedRow({ items, animationClass, ariaLabel }: FeedRowProps) {
  if (!items || items.length === 0) {
    return null;
  }
  // Duplicate items for seamless looping
  const displayItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden py-2 group" role="marquee" aria-label={ariaLabel}>
      <div className={`flex whitespace-nowrap ${animationClass} group-hover:pause-animation`}>
        {displayItems.map((item, index) => (
          <FeedItemCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function FeedPage() {
  const row1Items = placeholderFeedItems.slice(0, 7);
  const row2Items = placeholderFeedItems.slice(7, 13);
  const row3Items = placeholderFeedItems.slice(13, 20);

  return (
    <PageWrapper title="Public Feed" description="See what everyone is sharing in our dynamic feed!">
      <div className="mb-8 text-center">
        <p className="text-muted-foreground mt-2">
          Hover over a row to pause the animation.
        </p>
      </div>
      
      <div className="flex flex-col gap-2 -mx-4"> {/* Negative margin to utilize full PageWrapper width */}
        <FeedRow items={row1Items} animationClass="animate-scroll-left-slow" ariaLabel="Featured posts, slow scroll"/>
        <FeedRow items={row2Items} animationClass="animate-scroll-left-medium" ariaLabel="Trending content, medium scroll"/>
        <FeedRow items={row3Items} animationClass="animate-scroll-left-fast" ariaLabel="Latest shares, fast scroll"/>
      </div>

       {placeholderFeedItems.length === 0 && (
        <Card className="col-span-full mt-8">
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground">No posts shared yet. Content will appear here!</p>
          </CardContent>
        </Card>
      )}
    </PageWrapper>
  );
}
