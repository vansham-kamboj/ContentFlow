
'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Users, 
  Heart, // Can be used for "Growth Buddy" or Community
  Brain, // For "Why We Exist" / Idea
  Settings, // For "How We Help" / System
  MessageSquare, // For Community / Quotes
  Instagram, 
  Award, // For CTA
  Smile, // For Founder Bro
  Briefcase,
  TrendingUp,
  Film,
  Sparkles // Generic positive icon
} from 'lucide-react';

export default function AboutPageV2() {
  const howWeHelpPoints = [
    { text: "You don’t need to plan your content. We already did.", emphasis: "We already did." },
    { text: "You don’t need to overthink your post. It’s already written.", emphasis: "It’s already written." },
    { text: "Just hit one button — your idea turns into a post." }
  ];

  const realGoals = [
    { icon: Briefcase, text: "Growing your startup" },
    { icon: TrendingUp, text: "Building your brand" },
    { icon: Film, text: "Connecting with your audience" },
  ];

  return (
    <PageWrapper title="We’re Not Just a Tool. We’re Your Growth Buddy." description=" ">
      <div className="max-w-3xl mx-auto space-y-12 text-foreground">

        {/* Why We Exist */}
        <section className="text-center">
          <Brain className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Why We Exist
          </h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            We saw people struggling to stay consistent, burning out, and overthinking content.
            That’s when we asked — what if we helped people <strong className="text-primary-foreground">focus on creation, not the chaos?</strong>
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            That’s how <strong className="text-accent">ContentFlow</strong> was born:
          </p>
          <p className="text-xl font-semibold text-accent italic">
            “Tum karo apni journey pe dhyan, hum karte hain content ka dhyan.”
          </p>
        </section>

        <hr className="border-border/50" />

        {/* How We Help */}
        <section className="text-center">
          <Settings className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            How We Help
          </h2>
          <ul className="space-y-3 text-lg text-muted-foreground max-w-xl mx-auto mb-6 text-left">
            {howWeHelpPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <Sparkles className="w-6 h-6 text-yellow-400 mr-3 mt-1 shrink-0" />
                <span>
                  {point.text.split(point.emphasis || '###')[0]}
                  {point.emphasis && <strong className="text-primary-foreground">{point.emphasis}</strong>}
                  {point.text.split(point.emphasis || '###')[1]}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            All this while you focus on your real goals:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 mb-8 max-w-xl mx-auto">
            {realGoals.map((goal, index) => (
              <div key={index} className="flex-1 flex flex-col items-center p-4 bg-card rounded-lg border border-border text-center">
                <goal.icon className="w-8 h-8 text-accent mb-2" />
                <p className="text-md text-primary-foreground">{goal.text}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-border/50" />
        
        {/* Community Over Competition */}
        <section className="text-center">
          <Users className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Community Over Competition
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            We believe creators grow faster <strong className="text-primary-foreground">together.</strong>
            <br/>
            So we’re not just helping you post, we’re helping you belong.
          </p>
          <p className="text-xl font-semibold text-accent italic">
            "Kyunki creator akela viral hota hai,<br/>
            par community milke legend banti hai." <span className="text-xl">💥</span>
          </p>
        </section>

        <hr className="border-border/50" />

        {/* Last: The Founder Bro */}
        <section className="text-center">
          <Smile className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            The Founder Bro
          </h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            I’m <strong className="text-primary-foreground">Vansham</strong>, and I’m not just building a tool — I’m building a movement.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            From growing startups to building personal brands, from creating content to building communities —
            <br />
            <strong className="text-primary-foreground">I’ve been in the zone. And now I want to bring others with me.</strong>
          </p>
          <p className="text-xl font-semibold text-accent italic">
            “Bro, you stay real. We make sure your content stays regular.”
          </p>
        </section>

        {/* Be Part of the Journey / CTA (Kept from original) */}
        <Card className="shadow-xl bg-card/80 text-card-foreground border-accent mt-16 backdrop-blur-sm">
          <CardHeader className="text-center pt-8">
            <Award className="w-12 h-12 text-accent mx-auto mb-4" />
            <CardTitle className="font-headline text-3xl text-primary-foreground">
              Be Part of the Journey
            </CardTitle>
            <CardDescription className="text-lg text-accent-foreground/90 mt-2">
              Your Vibe Shapes Our Tribe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center pb-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We’re in beta, and your feedback is literally our secret sauce. Drop your suggestions, share your struggles, and let’s build something epic together.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Let’s make content creation <span className="font-semibold text-accent">mast and fast!</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white shadow-md">
                <Link href="https://chat.whatsapp.com/ESI9d1MyJ6NE1Pa3YHQ7GR" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2" /> Join WhatsApp
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white shadow-md">
                <Link href="https://www.instagram.com/techies_comm/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2" /> Follow on Insta
                </Link>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
               <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                <Link href="/reel">
                  <Sparkles className="mr-2" /> Try the Tool
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-foreground text-foreground hover:bg-foreground/10 hover:text-foreground shadow-md" onClick={() => window.location.href = 'mailto:feedback@example.com?subject=ContentFlow Feedback'}>
                <MessageSquare className="mr-2" /> Give Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </PageWrapper>
  );
}
