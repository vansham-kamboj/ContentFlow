
import Link from 'next/link';
import { Heart, MessageSquare, Share2, TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/80 py-8 mt-12 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-primary-foreground mb-2">
            Thank You for Using ContentFlow!
          </h3>
          <p className="text-sm max-w-2xl mx-auto">
            We're thrilled to help you streamline your content creation process.
          </p>
        </div>

        <div className="mb-6 p-6 bg-card/50 rounded-lg border border-accent/20 shadow-md">
          <h4 className="text-lg font-semibold text-accent mb-3 flex items-center justify-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Amplify Your Reach with Our Public Feed!
          </h4>
          <p className="text-sm mb-4 max-w-xl mx-auto">
            Share your generated content on the <Link href="/feed" className="text-accent hover:underline font-medium">Public Feed</Link> to showcase your work, connect with other creators, and gain inspiration. The more you share, the more visibility you get!
          </p>
          <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center"><Heart className="mr-1 h-4 w-4 text-pink-500"/> Get Inspired</span>
            <span className="flex items-center"><MessageSquare className="mr-1 h-4 w-4 text-blue-500"/> Spark Conversations</span>
            <span className="flex items-center"><Share2 className="mr-1 h-4 w-4 text-green-500"/> Increase Visibility</span>
          </div>
        </div>

        <p className="text-xs">
          &copy; {new Date().getFullYear()} ContentFlow. All rights reserved.
          Powered by AI, built for creators.
        </p>
      </div>
    </footer>
  );
}
