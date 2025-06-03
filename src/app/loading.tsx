
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex h-screen w-screen flex-col items-center justify-center bg-background/80 backdrop-blur-sm" role="status" aria-live="polite" aria-label="Loading page">
      <Loader2 className="h-16 w-16 animate-spin text-accent" />
      <p className="mt-4 text-lg text-foreground">Loading your next adventure...</p>
    </div>
  );
}
