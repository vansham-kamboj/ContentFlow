
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, Film, Instagram, LinkedinIcon, CheckCircle2, User, Briefcase, Rocket, Brain, Hash, FileText, Shuffle, Save, Target, BarChart3, Clock3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const growthStats = [
  { icon: BarChart3, text: "+500% content consistency", color: "text-green-400" },
  { icon: Clock3, text: "3x faster creation speed", color: "text-blue-400" },
  { icon: Target, text: "0 planning stress", color: "text-purple-400" },
];

const supportedContentTypes = [
  { icon: Film, label: "Reels", color: "text-pink-400" },
  { icon: Instagram, label: "Stories", color: "text-orange-400" },
  { icon: LinkedinIcon, label: "LinkedIn Posts", color: "text-sky-400" },
];

const keyFeaturesList = [
  { icon: CheckCircle2, text: "Viral-ready scripts" },
  { icon: CheckCircle2, text: "Weekly planners" },
  { icon: CheckCircle2, text: "One-click shuffle for fresh content" },
];

const howItWorksSteps = [
  {
    step: 1,
    title: "Choose Content Type",
    description: "Select whether you want to generate a Reel, Instagram Story, or LinkedIn Post.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "content selection",
  },
  {
    step: 2,
    title: "Generate & Shuffle Ideas",
    description: "Let our AI brainstorm unique ideas. Shuffle to explore more options until you find the perfect fit.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "ai generation",
  },
  {
    step: 3,
    title: "Save Your Plan & Create",
    description: "Organize your generated content into a 7-day plan. Save, edit, and start creating!",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "planning schedule",
  },
];

const targetAudiences = [
  { icon: User, name: "Content Creators", description: "Supercharge your output and beat creative blocks." },
  { icon: Rocket, name: "Startup Founders", description: "Build your brand presence efficiently and effectively." },
  { icon: Brain, name: "Personal Brands", description: "Craft authentic content that resonates with your audience." },
  { icon: Briefcase, name: "Busy Professionals", description: "Save time on content planning and focus on your core work." },
];

const featureHighlights = [
  { icon: Hash, title: "Viral Hashtags", description: "Niche-based suggestions to boost your reach." },
  { icon: FileText, title: "Scripts & Captions", description: "Engaging reel scripts and compelling captions, AI-generated." },
  { icon: Shuffle, title: "One-Click Shuffle", description: "Instantly get fresh ideas and alternatives." },
  { icon: Save, title: "Save & Edit Plans", description: "Organize your content schedule and make adjustments anytime." },
];

export default function NewHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center overflow-hidden bg-gradient-to-br from-background to-slate-900/50">
        <div className="container mx-auto px-4 relative z-10">
          <Zap className="mx-auto h-16 w-16 text-accent mb-6 animate-pulse" />
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 text-primary-foreground">
            Simplify Content Creation.
          </h1>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Amplify Your <span className="text-accent">Reach</span>.
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
            From ideas to viral reels, stories, and posts — all in one AI-powered flow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/reel">Try Free Plan</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground px-10 py-6 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
          <div className="mt-16">
            <Image 
              src="https://placehold.co/800x450.png" 
              alt="ContentFlow in action" 
              width={800} 
              height={450} 
              className="rounded-lg shadow-2xl mx-auto border-2 border-accent/30"
              data-ai-hint="content generation app interface"
            />
          </div>
        </div>
      </section>

      {/* Growth You Can Expect Section */}
      <section id="growth" className="py-16 md:py-24 bg-background/70">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
            See the <span className="text-accent">Growth</span>. Not the Grind.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
            {growthStats.map((stat, index) => (
              <div key={index} className="p-6 bg-card rounded-lg shadow-xl border border-border">
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                <p className="text-2xl font-semibold text-primary-foreground">{stat.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary-foreground">Supports Your Favorite Platforms:</h3>
            <div className="flex justify-center items-center gap-6">
              {supportedContentTypes.map((type, index) => (
                <div key={index} className="flex flex-col items-center">
                  <type.icon className={`w-10 h-10 mb-2 ${type.color}`} />
                  <span className="text-muted-foreground">{type.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-3">
              {keyFeaturesList.map((feature, index) => (
                <li key={index} className="flex items-center text-lg text-muted-foreground">
                  <feature.icon className="w-6 h-6 mr-3 text-accent" />
                  {feature.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16 text-primary-foreground">
            Effortless Content in <span className="text-accent">3 Simple Steps</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step) => (
              <Card key={step.step} className="bg-card text-card-foreground shadow-xl border-border hover:shadow-accent/20 transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-accent text-5xl font-bold mr-4">{step.step}</span>
                    <span className="font-headline text-2xl">{step.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
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

      {/* Who’s This For? Section */}
      <section id="who-is-this-for" className="py-16 md:py-24 bg-background/70">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
            Perfect For <span className="text-accent">Ambitious Creators</span> Like You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudiences.map((audience, index) => (
              <Card key={index} className="bg-card text-card-foreground shadow-lg border-border text-center p-6 hover:border-accent transition-colors duration-300">
                <audience.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <CardTitle className="font-headline text-xl mb-2">{audience.name}</CardTitle>
                <CardDescription>{audience.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
            Packed with <span className="text-accent">Powerful Features</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureHighlights.map((feature, index) => (
              <Card key={index} className="bg-card text-card-foreground shadow-lg border-border p-6 flex flex-col items-center text-center hover:shadow-accent/20 transition-shadow duration-300">
                <feature.icon className="w-10 h-10 mb-4 text-accent" />
                <CardTitle className="font-headline text-lg mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 text-center bg-gradient-to-tr from-background to-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Start Creating <span className="text-accent">Smarter</span>, Not Harder.
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-muted-foreground">
            You don’t need a team to create smart content. Just this tool.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-7 text-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <Link href="/reel">Start Planning Your Week</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
