
'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button'; // Removed for now
// import Link from 'next/link'; // Removed for now

// Placeholder data for the feed items - replace with actual data fetching later
const placeholderFeedItems = Array.from({ length: 12 }).map((_, i) => ({
  id: `item-${i}`,
  linkUrl: `https://example.com/post/${i}`,
  platform: i % 3 === 0 ? 'YouTube' : i % 3 === 1 ? 'Instagram' : 'LinkedIn',
  userName: `User ${i + 1}`,
  userAvatar: `https://placehold.co/40x40.png?text=U${i+1}`,
}));

interface FeedItem {
  id: string;
  linkUrl: string;
  platform: string;
  userName: string;
  userAvatar: string;
}

function FeedItemCard({ item }: { item: FeedItem }) {
  return (
    <Card className="bg-card text-card-foreground border-border shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex-row items-center gap-3 pb-3">
        <img src={item.userAvatar} alt={item.userName} className="h-10 w-10 rounded-full border" data-ai-hint="user avatar"/>
        <div>
          <CardTitle className="text-base font-medium">{item.userName}</CardTitle>
          <CardDescription className="text-xs">Shared on {item.platform}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <a
          href={item.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:underline break-all"
        >
          {item.linkUrl}
        </a>
      </CardContent>
    </Card>
  );
}


export default function FeedPage() {
  // In the future, you might fetch posts from Firestore here
  // For now, we'll use placeholder data

  return (
    <PageWrapper title="Public Feed" description="See what everyone is sharing!">
      <div className="mb-8 text-center">
        <p className="text-muted-foreground mt-2">
          This is a basic feed. Functionality to share posts will be added in future updates!
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {placeholderFeedItems.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
       {placeholderFeedItems.length === 0 && (
        <Card className="col-span-full">
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground">No posts shared yet. Be the first!</p>
          </CardContent>
        </Card>
      )}
    </PageWrapper>
  );
}
