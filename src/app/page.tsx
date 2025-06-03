import { PageWrapper } from '@/components/layout/PageWrapper';
import { ContentTypeCard } from '@/components/ContentTypeCard';
import type { ContentType } from '@/lib/types';
// Icons will be handled by ContentTypeCard

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

export default function HomePage() {
  return (
    <PageWrapper title="Welcome to ContentFlow" description="Select a content type to start planning with AI.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {contentTypes.map((item) => (
          <ContentTypeCard key={item.id} item={item} />
        ))}
      </div>
    </PageWrapper>
  );
}
