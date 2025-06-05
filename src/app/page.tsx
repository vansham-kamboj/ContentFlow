// 'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Zap, Film, Instagram, Linkedin, CheckCircle2, User, Briefcase, Rocket, Brain,
  Hash, FileText, Shuffle, Save, Target, BarChart3, Clock3, Users, Quote, TrendingUp, Sparkles, CalendarCheck, Lightbulb, Share2, MessageCircle, HeartHandshake, Award
} from 'lucide-react'; // Added new icons: MessageCircle, HeartHandshake, Award
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

const growthStats = [
  { icon: BarChart3, text: "Post like a beast — 5x more consistent", color: "text-green-400" },
  { icon: Clock3, text: "Create stuff 3x quicker — no burnout, just flow", color: "text-blue-400" },
  { icon: Target, text: "Planning? Nah. We already did that for you - 0 planning stress", color: "text-purple-400" },
];

const supportedContentTypes = [
  { icon: Film, label: "Reels", color: "text-pink-400" },
  { icon: Instagram, label: "Stories", color: "text-orange-400" },
  { icon: Linkedin, label: "LinkedIn Posts", color: "text-sky-400" },
];

const creatorGrowthFeatures = [
    {
        icon: Sparkles,
        title: "AI-Powered Idea Generation",
        description: "Never run out of inspiration. Our AI generates fresh, trend-aware content ideas, ensuring you're always creating.",
        growth: "Your creative flow goes beast mode. No more blank-screen moments.",
        color: "text-yellow-400"
    },
    {
        icon: CalendarCheck,
        title: "Automated Weekly Planning",
        description: "Get a structured 7-day content schedule tailored to your goals. Stay organized and consistent effortlessly.",
        growth: "Increases content consistency by 500%, reduces planning time significantly.",
        color: "text-cyan-400"
    },
    {
        icon: TrendingUp,
        title: "Performance-Driven Scripts",
        description: "Generate video scripts and captions designed for maximum engagement and viral potential.",
        growth: "More views, more reach, and a growing fanbase that actually vibes with you.",
        color: "text-red-400"
    },
    {
        icon: Shuffle,
        title: "Instant Content Variations",
        description: "Shuffle ideas or entire plans with a single click to explore diverse angles and keep your content fresh.",
        growth: "Diversifies content strategy, prevents audience fatigue.",
        color: "text-lime-400"
    },
    {
        icon: Lightbulb,
        title: "Niche-Specific Hashtag Research",
        description: "Receive intelligent hashtag suggestions tailored to your content and target audience for optimal discoverability.",
        growth: "More reach, better engagement, and no more guessing games.",
        color: "text-orange-400"
    },
    {
        icon: Share2,
        title: "Direct ShareSpace Integration",
        description: "Seamlessly share your generated content drafts with the ShareSpace community for feedback and collaboration.",
        growth: "Real talk from real creators = faster growth, better content, stronger community.",
        color: "text-fuchsia-400"
    },
];


const howItWorksSteps = [
  {
    step: 1,
    title: "Tell us what you’re tryna do",
    description: "Go viral? Stay active? Look smart on LinkedIn? Say less.",
    imageSrc: "/images/Step1.jpg",
    dataAiHint: "content selection interface",
  },
  {
    step: 2,
    title: "Get fire ideas instantly",
    description: "AI does the thinking. You just sprinkle your magic on top.",
    imageSrc: "/images/step2.jpg",
    dataAiHint: "ai generation and shuffling interface",
  },
  {
    step: 3,
    title: "Save. Plan. Post. Repeat.",
    description: "Organize your chosen content into a flexible 7-day plan. Save, edit, and start bringing your ideas to life!",
    imageSrc: "/images/step3.jpg",
    dataAiHint: "Plan the week, chill out, and let your posts do the talking.",
  },
];

const targetAudiences = [
  { icon: User, name: "Content Creators", description: "Posting daily sounds cute… until you actually try it. We make it doable, for real." },
  { icon: Rocket, name: "Startup Founders", description: "Build your online brand without turning it into a full-time job. Easy wins, zero chaos." },
  { icon: Brain, name: "Personal Brands", description: "Your vibe is the brand. We just help you package it like a pro." },
  { icon: Briefcase, name: "Busy Professionals", description: "Planning content? Nah. Focus on your grind — we’ll handle the rest." },
];

const testimonials = [
  {
    quote: "ContentFlow is a game-changer! My consistency has skyrocketed, and planning is actually enjoyable now.",
    author: "Riya Sharma",
    title: "Fitness Influencer",
    avatar: "https://placehold.co/100x100/A0B0C0/FFFFFF/png?text=RS" // Replace with actual avatar
  },
  {
    quote: "As a startup founder, time is precious. ContentFlow lets me maintain a strong online presence without the grind.",
    author: "Arjun Mehta",
    title: "Tech Startup CEO",
    avatar: "https://placehold.co/100x100/C0A0B0/FFFFFF/png?text=AM" // Replace with actual avatar
  },
  {
    quote: "The community aspect is incredible! I've connected with so many amazing creators and found inspiration.",
    author: "Priya Singh",
    title: "Digital Artist & Blogger",
    avatar: "https://placehold.co/100x100/B0C0A0/FFFFFF/png?text=PS" // Replace with actual avatar
  },
];

export default function NewHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-40 md:py-32 -mt-16 text-center overflow-hidden bg-gradient-to-br from-background to-slate-900/50">
        <div className="container mx-auto px-4 relative z-10">
          <Zap className="mx-auto h-16 w-16 text-accent mb-6 animate-pulse" />
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 text-primary-foreground">
            Hey, content creator?
          </h1>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Or thinking  <span className="text-accent">about it?</span>.
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto text-muted-foreground">
            Same. That’s literally why this exists.<br></br>
            No burnout. No “what to post?” freakouts. Just reels, stories, LinkedIn — all sorted.
          </p>
                <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
        <strong>Welcome to ShareSpace</strong> — Welcome to ShareSpace — your spot for messy ideas, wild projects, and late-night thoughts that actually slap.<br />
        <strong>Techies Community</strong> - Bro... it’s a vibe.<br></br>
founders, devs, designers, and chill creators all building and growing together.
      </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="/reel">I’m In, Let’s Go</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground px-10 py-6 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="#how-it-works">Walk Me Through</Link>
            </Button>
          </div>
          <div className="mt-16 relative z-10">
            {/* !!! IMPORTANT: Replace with actual UI screenshot of your app's main interface !!! */}
            <Image
              src="/images/app_hero_mockup.png" // Example path, create this image!
              alt="ContentFlow app interface showing content generation"
              width={800}
              height={450}
              className="rounded-lg shadow-2xl mx-auto border-2 border-accent/30 transform transition-transform duration-500 hover:scale-[1.02]"
              data-ai-hint="content generation app interface"
            />
          </div>
        </div>
      </section>

      {/* Growth You Can Expect */}
      <section id="growth" className="py-10 md:py-10 -mb-10 bg-background/70 ">
        <div className="container mx-auto px-4 ">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
            Wanna <span className="text-accent">grow</span>, without losing your mind?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center ">
            {growthStats.map((stat, index) => (
              <div key={index} className="p-6 bg-card rounded-lg shadow-xl border border-border transform transition-all duration-300 hover:shadow-gradient-glow">
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                <p className="text-2xl font-semibold text-primary-foreground">{stat.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-2 text-primary-foreground">Plug into your fav platforms:</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {supportedContentTypes.map((type, index) => (
                <div key={index} className="flex flex-col items-center p-4 rounded-lg hover:bg-card/30 transition-colors duration-200">
                  <type.icon className={`w-12 h-12 mb-2 ${type.color}`} />
                  <span className="text-lg font-medium text-muted-foreground">{type.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Driving Creator Growth */}
      <section id="creator-growth-features" className="py-16 -mb-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4 text-primary-foreground">
            More than just features — it’s a full-on <span className="text-accent">glow-up kit.</span>
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            ContentFlow’s got your back — every feature is here to help you post better, grow faster, and look like a total pro online.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creatorGrowthFeatures.map((feature, index) => (
              <Card key={index} className="bg-card text-card-foreground shadow-lg border-border p-6 flex flex-col hover:border-accent transition-colors duration-300 transform hover:scale-[1.02]">
                <feature.icon className={`w-10 h-10 mb-4 ${feature.color}`} />
                <CardTitle className="font-headline text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base mb-4">{feature.description}</CardDescription>
                <div className="mt-auto pt-4 border-t border-border-foreground/20">
                    <p className="text-sm text-muted-foreground font-semibold flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                        Why it rocks: <span className="text-green-300 ml-1">{feature.growth}</span>
                    </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16 text-primary-foreground">
            Effortless Content in <span className="text-accent">3 Simple Steps</span>
          </h2>
          {/* Optional: Add a video demo here */}
          {/* <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground mb-4">Watch our quick demo to see ContentFlow in action:</p>
            <div className="w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl border-2 border-accent/30">
              <iframe
                src="YOUR_YOUTUBE_OR_VIMEO_EMBED_LINK" // Replace with your video embed link
                title="ContentFlow Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step) => (
              <Card key={step.step} className="bg-card text-card-foreground shadow-xl border-border hover:shadow-accent/20 transition-shadow duration-300 transform hover:-translate-y-1">
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

      {/* Who Is This For */}
      <section id="who-is-this-for" className="py-16 md:py-24 bg-background/70">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
            For the <span className="text-accent">Creators Who Never </span> Settle.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudiences.map((audience, index) => (
              <Card key={index} className="bg-card text-card-foreground shadow-lg border-border text-center p-6 hover:border-accent transition-colors duration-300 transform">
                <audience.icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <CardTitle className="font-headline text-xl mb-2">{audience.name}</CardTitle>
                <CardDescription>{audience.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-background to-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <Quote className="mx-auto h-14 w-14 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-12 text-primary-foreground">
            Straight From<span className="text-accent"> the Content Fam</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-transparent text-card-foreground p-6 flex flex-col items-center text-center transition-all duration-300"
              >
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={80}
                  height={80}
                  className="rounded-full mb-4"
                />
                <CardContent className="flex-grow">
                  <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-primary-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATED: ShareSpace Community Section */}
      <section id="sharespace" className="py-20 md:py-28 bg-background/60">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Users className="mx-auto h-14 w-14 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Creators,<span className="text-accent"> This Is Your Zone </span>- Community
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
           <b>ShareSpace - </b> You don’t have to do the content thing alone.<br></br>
With ShareSpace, you’ve got a crew — people who get the grind, the overthinking, the late-night ideas.
          </p>
          <p className="text-lg text-muted-foreground mb-8 ">
            Share your AI-generated posts, check out what others are building, and actually connect — not just scroll past.<br></br>
            Join us on Instagram & WhatsApp. It’s not just a community — it’s a content fam.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-primary-foreground px-8 py-5 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="https://www.instagram.com/techies_comm/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 mr-2" /> Catch us on Instagram
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-primary-foreground px-8 py-5 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link href="https://chat.whatsapp.com/ESI9d1MyJ6NE1Pa3YHQ7GR" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" /> Hop into the WhatsApp gang
              </Link>
            </Button>
          </div>
          <p className="text-base text-muted-foreground">
            Be part of a supportive community that shares insights, celebrates successes, and fosters collaborative growth.
          </p>
        </div>
      </section>

      {/* NEW SECTION: Your Content Journey Starts Here */}
      <section id="start-journey" className="py-20 md:py-28 bg-gradient-to-tl from-background to-slate-900/60">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Award className="mx-auto h-14 w-14 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6 text-primary-foreground">
            About to start your content grind? <span className="text-accent">Start Here.</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            ContentFlow ain’t just some boring app — it’s your ride-or-die partner for the whole journey. We’re here for the wins, the fails, and everything in between.
          </p>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
            Join us for live sessions, workshops, and epic events that help you learn, grow, and flex your content muscle.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-7 text-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <Link href="/reel">Start my hustle!</Link>
          </Button>
        </div>
      </section>

    </>
  );
}
