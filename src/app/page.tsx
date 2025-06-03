
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ContentTypeCard } from '@/components/ContentTypeCard';
import type { ContentType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap } from 'lucide-react';

const contentTypes: ContentType[] = [
  {
    id: 'reel',
    title: 'Reel Content',
    description: 'Plan and generate scripts for your Instagram Reels or TikToks.',
    iconName: 'Film',
    href: '/reel',
  },
  {
    id: 'story',
    title: 'Instagram Story',
    description: 'Create engaging prompts for your Instagram Stories.',
    iconName: 'Instagram',
    href: '/story',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Post',
    description: 'Craft insightful posts for your LinkedIn audience.',
    iconName: 'LinkedinIcon',
    href: '/linkedin',
  },
  {
    id: 'previous-session',
    title: 'Continue Previous Session',
    description: 'Pick up where you left off with your content planning.',
    iconName: 'History',
    href: '#',
    disabled: true,
    disabledMessage: 'Feature coming soon!',
  },
];

export default function NewHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center overflow-hidden">
        {/* The global background from globals.css will provide the space effect */}
        <div className="container mx-auto px-4 relative z-10">
          <Zap className="mx-auto h-16 w-16 text-accent mb-6 animate-pulse" />
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Ignite Your <span className="text-accent">ContentFlow</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
            Supercharge your content strategy with AI. Effortlessly generate engaging Reels, captivating Instagram Stories, and insightful LinkedIn posts.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="#content-tools">Start Creating Now</Link>
          </Button>
        </div>
      </section>

      {/* Content Type Selection Section */}
      <PageWrapper title="Choose Your Content Adventure" description="Select a tool to begin your AI-powered content creation journey.">
        <div id="content-tools" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-8">
          {contentTypes.map((item) => (
            <ContentTypeCard key={item.id} item={item} />
          ))}
        </div>
      </PageWrapper>
    </>
  );
}
