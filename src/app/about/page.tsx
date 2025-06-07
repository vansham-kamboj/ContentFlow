
'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, Users, Heart, Eye, Rocket, Zap, Brain, Lightbulb, MessageCircle, Instagram, Award, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <PageWrapper title="About ContentFlow" description="Ending the “Kya Post Karun?” Nightmare">
      <div className="max-w-3xl mx-auto space-y-12 text-foreground">

        {/* Our Story / Intro */}
        <section className="text-center">
          <Zap className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Our Story
          </h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            Let’s be honest — content creation can feel like a never-ending group project where you’re the only one doing the work. Every day: “What do I post?” “How do I make this reel not cringe?”
          </p>
          <p className="text-xl font-semibold text-accent mb-6">
            Bro, we’ve all been there. Total dimaag ka dahi. <span className="italic text-muted-foreground text-base">(Mind = scrambled, basically)</span>
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            So we built ContentFlow to end the struggle. No more blank screens, no more creative burnout, no more “I’ll do it tomorrow.” Now, you just show up, drop your idea, and get content that slaps.
          </p>
        </section>

        <hr className="border-border/50" />

        {/* Not Just a Tool, It’s a Tribe */}
        <section className="text-center">
          <Users className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Not Just a Tool, It’s a Tribe
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            This isn’t just about automation. It’s about building a community where <span className="font-semibold text-primary-foreground">everyone’s the main character.</span>
          </p>
          <ul className="space-y-4 text-left max-w-lg mx-auto mb-8 text-muted-foreground">
            <li className="flex items-start">
              <Brain className="w-7 h-7 text-pink-400 mr-4 mt-1 shrink-0" />
              <div>
                <strong className="text-primary-foreground block text-lg">Founders dropping wisdom bombs</strong>
                Sharing insights, strategies, and maybe a few life hacks.
              </div>
            </li>
            <li className="flex items-start">
              <Sparkles className="w-7 h-7 text-yellow-400 mr-4 mt-1 shrink-0" />
              <div>
                <strong className="text-primary-foreground block text-lg">Creators collabing on viral stuff</strong>
                Sparking creativity and making internet magic together.
              </div>
            </li>
            <li className="flex items-start">
              <Lightbulb className="w-7 h-7 text-purple-400 mr-4 mt-1 shrink-0" />
              <div>
                <strong className="text-primary-foreground block text-lg">Devs & designers making things smoother</strong>
                Than butter chicken, for real. We’re all about that seamless experience.
              </div>
            </li>
          </ul>
          <p className="font-semibold text-accent text-xl italic mb-2">
            “Sabki growth, sabke saath.”
          </p>
          <p className="text-sm text-muted-foreground">(Yes, we’re quoting Bollywood. Don’t judge.)</p>
        </section>

        <hr className="border-border/50" />

        {/* Always By Your Side */}
        <section className="text-center">
          <Heart className="w-16 h-16 text-accent mx-auto mb-6 animate-pulse" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Always By Your Side — No Matter What
          </h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            We’re not just here for your highlight reels and #Winning moments. We’re with you for the flops, the fails, and those “Bro, what even is this?” days too.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you’re smashing goals or just surviving Monday, we’ve got your back — every step, every post, every awkward story. Because real bros don’t ghost when things get tough. We’re in this together, start to viral.
          </p>
        </section>

        <hr className="border-border/50" />

        {/* Our Vision */}
        <section className="text-center">
          <Eye className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Our Vision
          </h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            We want content creation to be so easy and fun, you’ll actually look forward to it. And with <strong className="text-accent">ShareSpace (coming soon! <Rocket className="inline w-5 h-5"/>)</strong>, you’ll be able to flex your work, get noticed, and vibe with other creators.
          </p>
          <p className="text-lg text-muted-foreground italic leading-relaxed">
            No corporate drama, no boring vibes — just real people, real growth, and a lot of “Bro, you did THAT?!” moments.
          </p>
        </section>

        {/* Be Part of the Journey / CTA */}
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
                <MessageCircle className="mr-2" /> Give Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </PageWrapper>
  );
}

