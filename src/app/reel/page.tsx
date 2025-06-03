import { PageWrapper } from '@/components/layout/PageWrapper';
import { ReelCalendar } from '@/components/reel/ReelCalendar';

export default function ReelPage() {
  return (
    <PageWrapper title="Reel Content Planner" description="Generate AI-powered ideas and scripts for your next viral reel.">
      <ReelCalendar />
    </PageWrapper>
  );
}
