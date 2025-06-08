
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Zap,
  Wand2, 
  CalendarDays, 
  ThumbsUp, 
  Film, 
  Linkedin, 
  Users, 
  Instagram, 
  MessageSquare, 
  Heart, 
  Rocket, 
  Mail, 
  PlayCircle, 
  HelpCircle, 
  CheckCircle2,
  TrendingUp,
  Brain, // Added Brain
  Lightbulb, // Added Lightbulb
  Sparkles, // Added Sparkles
  Award, // Added Award
  MessageCircle as MessageCircleIcon, // Aliased MessageCircle to avoid conflict
  Eye, // Added Eye for Vision
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const howItWorksSteps = [
  {
    step: 1,
    title: "Tell Us What’s Up",
    description: "Want to blow up? Stay active? Look like a LinkedIn CEO? Just drop your idea or goal. No need to overthink, bro. We’re not here to judge your 2am shower thoughts.",
    icon: HelpCircle,
    imageSrc: "/images/Step1.jpg",
    dataAiHint: "goal setting interface",
  },
  {
    step: 2,
    title: "Get Fire Content Instantly",
    description: "Our AI is basically that one friend who always has the best comebacks. Instant ideas, scripts, and drafts — just waiting for your personal touch. You: “Give me content.” AI: “Say less, fam.”",
    icon: Wand2,
    imageSrc: "/images/step2.jpg",
    dataAiHint: "ai content generation",
  },
  {
    step: 3,
    title: "Save. Plan. Post. Repeat.",
    description: "Pick your favs, organize your week, tweak as you like, and boom — Your content calendar is more sorted than your weekend plans. Work smart, not hard. Because why struggle when you can schedule?",
    icon: CalendarDays,
    imageSrc: "/images/step3.jpg",
    dataAiHint: "content calendar planning",
  },
];

const platformExamples = [
  { platform: "LinkedIn", text: "posts that scream “hire me”", icon: Linkedin, color: "text-sky-400" },
  { platform: "Reels", text: "that actually get views (no more 12 likes, bro)", icon: Film, color: "text-pink-400" },
  { platform: "X (Twitter)", text: "threads that people actually read", icon: MessageSquare, color: "text-blue-300" }, // Changed Twitter to X
];

export default function NewGenZHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="subtle-grid-background relative py-32 md:py-40 -mt-16 text-center overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">

          {/* Static Notification Banner */}
          {showNotification && (
            <div className="mb-10 p-3 rounded-lg bg-accent/10 border border-accent/30 shadow-sm max-w-2xl mx-auto relative">
              <div className="flex items-center justify-center sm:justify-start pr-8"> {/* Added pr-8 for close button space */}
                <Megaphone className="h-5 w-5 text-accent mr-3 shrink-0" />
                <p className="text-sm text-accent-foreground/160">
                  <span className="font-semibold text-accent">Latest Update:</span> Our new Content Researcher tool is now live! Get market insights instantly. 
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-accent-foreground/70 hover:text-accent-foreground hover:bg-accent/20"
                onClick={() => setShowNotification(false)}
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <Zap className="mx-auto h-16 w-16 text-accent mb-6 animate-bounce" />
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 text-primary-foreground">
            Hey, content creator?
          </h1>
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Or just thinking <span className="text-accent">about jumping in?</span>
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-muted-foreground">
            Bro, that’s literally why we exist.
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            No burnout. No “what do I even post?” existential crisis.
            Just reels, LinkedIn posts, stories — all sorted.
            <br />
            <em className="text-accent font-semibold">Idea daalo, viral bano. Simple!</em>
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/reel">Try it now – Free Beta Access</Link>
          </Button>
        </div>
      </section>

      {/* Who's This For? Section */}
<section id="whos-this-for" className="py-16 md:py-20 bg-background/60">
  <div className="container mx-auto px-4">
    <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-8 text-primary-foreground">
      Who’s This Tool For? <span className="text-accent">Everyone Chasing Growth!</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Founders */}
      <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0 pb-4 flex flex-col items-center">
          <Award className="w-10 h-10 mb-3 text-yellow-400" />
          <CardTitle className="font-headline text-xl text-center">Founders</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-center">
          <CardDescription className="text-base">
            Building your personal brand while building your company?  
            <br />
            <span className="font-medium text-accent">Show the world your vision, leadership, and wins—without spending hours on content.</span>
            <br />
            <span className="text-muted-foreground text-sm">“Bro, founder ho ya future unicorn—content toh king hai!”</span>
          </CardDescription>
        </CardContent>
      </Card>
      {/* Professionals */}
      <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0 pb-4 flex flex-col items-center">
          <TrendingUp className="w-10 h-10 mb-3 text-blue-400" />
          <CardTitle className="font-headline text-xl text-center">Professionals</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-center">
          <CardDescription className="text-base">
            Want to grow your company’s presence or build a killer side hustle?  
            <br />
            <span className="font-medium text-accent">Get LinkedIn posts, case studies, and updates that make your team and boss go “damn!”</span>
            <br />
            <span className="text-muted-foreground text-sm">“Bro, work smart—not just hard.”</span>
          </CardDescription>
        </CardContent>
      </Card>
      {/* Content Creators */}
      <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-0 pb-4 flex flex-col items-center">
          <Sparkles className="w-10 h-10 mb-3 text-pink-400" />
          <CardTitle className="font-headline text-xl text-center">Content Creators</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-center">
          <CardDescription className="text-base">
            Make your life easy, bro—ditch the content block and focus on your vibe.  
            <br />
            <span className="font-medium text-accent">Reels, stories, tweets—get them all, ready-to-go. Just add your magic touch and post.</span>
            <br />
            <span className="text-muted-foreground text-sm">“No more ‘what do I post?’ drama.”</span>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  </div>
</section>


      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4 text-primary-foreground">
            Content Creation, But Make It <span className="text-accent">Effortless</span>
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-16 max-w-xl mx-auto">(a.k.a. How It Works)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step) => (
              <Card key={step.step} className="bg-card text-card-foreground shadow-xl border-border hover:shadow-accent/20 hover:border-accent transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-start">
                    <span className="text-accent text-5xl font-bold mr-4">{step.step}</span>
                    <div className="flex flex-col">
                      <span className="font-headline text-2xl">{step.title}</span>
                      <step.icon className="w-8 h-8 text-muted-foreground mt-1" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <Image
                    src={step.imageSrc}
                    alt={step.title}
                    width={600}
                    height={400}
                    className="rounded-md mb-4 border border-border"
                    data-ai-hint={step.dataAiHint}
                  />
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Tool? Section */}
      <section id="why-this-tool" className="py-16 md:py-24 bg-background/70">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
            Why <span className="text-accent">This Tool?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0 pb-4">
                <CheckCircle2 className="w-10 h-10 mb-3 text-green-400" />
                <CardTitle className="font-headline text-xl">Stop Wasting Time, Start Winning</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-base">
                  Bro, nobody has time for blank screens and creative blocks.
                  Drop your idea, get ready-to-post content, and spend your extra time… I dunno, actually living life?
                  <br />
                  <em className="text-accent font-medium">“Main hoon na!” — Our AI, probably.</em>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0 pb-4">
                <Rocket className="w-10 h-10 mb-3 text-purple-400" />
                <CardTitle className="font-headline text-xl">For Every Platform</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                {platformExamples.map(platform => (
                  <div key={platform.platform} className="flex items-center">
                    <platform.icon className={`w-5 h-5 mr-2 ${platform.color}`} /> 
                    <span className="text-card-foreground">{platform.platform}: <span className="text-muted-foreground text-sm">{platform.text}</span></span>
                  </div>
                ))}
                <CardDescription className="text-base pt-2">All ready for your personal flavor.</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader className="p-0 pb-4">
                <Users className="w-10 h-10 mb-3 text-accent" />
                <CardTitle className="font-headline text-xl">Powered by Community</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-base mb-4">
                  You’re not solo in this game. Join a squad of founders, creators, devs, freelancers, and designers — all hyping each other up.
                  <br/>
                  <em className="text-accent font-medium">“Akele mat ghuso, squad ke saath grow karo!”</em>
                </CardDescription>
                <div className="flex flex-col sm:flex-row justify-start items-center gap-3">
                  <Button asChild className="bg-transparent border border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-sm w-full sm:w-auto">
                    <Link href="https://chat.whatsapp.com/ESI9d1MyJ6NE1Pa3YHQ7GR" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                    </Link>
                  </Button>
                  <Button asChild className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white text-sm w-full sm:w-auto">
                    <Link href="https://www.instagram.com/techies_comm/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="mr-2 h-4 w-4" /> Instagram
                    </Link>
                  </Button>
                </div>
                 <CardDescription className="text-xs mt-2">Real talk, daily tips, instant feedback & collabs!</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* We're With You Section */}
      <section className="py-16 md:py-20 bg-background/50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Heart className="mx-auto h-14 w-14 text-red-400 mb-6 animate-pulse" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            We’re With You — <span className="text-accent">Wins, Fails, and Every Awkward Reel in Between</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            We’re not just here to celebrate your viral moments, bro.
            We’re right there with you when your post flops, when the algorithm acts shady, and when you’re just figuring things out.
          </p>
          <p className="text-lg text-muted-foreground">
            From “Bro, I made it!” to “Bro, what even is this?” — we’re your ride-or-die for every part of your creator journey.
            Because real squads stick together, no matter what.
          </p>
        </div>
      </section>

      {/* Coming Soon: ShareSpace Section */}
      <section id="sharespace-coming-soon" className="py-16 md:py-24 bg-background/70">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Rocket className="mx-auto h-14 w-14 text-accent mb-6 transform rotate-[-45deg]" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            <span className="text-accent">ShareSpace</span> : Coming Soon
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Imagine this: You make fire content with our tool, hit share, and boom — it’s live on ShareSpace.
          </p>
          <ul className="list-none space-y-2 text-muted-foreground mb-8 text-left sm:text-center max-w-md mx-auto">
            <li className="flex items-center justify-center sm:justify-start"><CheckCircle2 className="text-green-400 mr-2"/>Show off your work (flex a little, you deserve it)</li>
            <li className="flex items-center justify-center sm:justify-start"><Wand2 className="text-purple-400 mr-2"/>Get inspired by what others are dropping</li>
            <li className="flex items-center justify-center sm:justify-start"><TrendingUp className="text-blue-400 mr-2"/>Build your rep as the content bro</li>
          </ul>
          <p className="text-lg text-muted-foreground">
            It’s like your own highlight reel, but <span className="font-semibold text-primary-foreground">everyone’s invited.</span>
          </p>
        </div>
      </section>

      {/* Feedback & CTA Section */}
      <section id="feedback-cta" className="subtle-grid-background py-20 md:py-28 bg-gradient-to-t from-background to-slate-900/60">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ThumbsUp className="mx-auto h-14 w-14 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            We Want Your <span className="text-accent">Feedback!</span> (Still in Beta, Bro!)
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your feedback = cheat code for making this tool even better. Tell us what’s working, what’s meh, and what would make your life easier. Help us help you, Jerry Maguire style.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              <Link href="https://chat.whatsapp.com/ESI9d1MyJ6NE1Pa3YHQ7GR" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2" /> Join WhatsApp
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
              <Link href="https://www.instagram.com/techies_comm/" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2" /> Follow on Insta
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/reel">
                <PlayCircle className="mr-2" /> Try the Tool
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-white" onClick={() => window.location.href = 'mailto:feedback@example.com?subject=ContentFlow Feedback'}>
                <Mail className="mr-2" /> Give Feedback
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

    
