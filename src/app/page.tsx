
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Brain,
  Zap, 
  Lightbulb,
  Flame,
  Handshake,
  Users, 
  Puzzle,
  Briefcase,
  TrendingUp, 
  Sparkles, 
  ListChecks, 
  MessageCircle, 
  Smile, 
  PlayCircle,
  Megaphone,
  X,
  Instagram,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'; 

export default function NewHomePageV2() {
  const [showNotification, setShowNotification] = useState(true);

  const featureList = [
    "Reels ideas & full scripts",
    "LinkedIn post drafts ready to tweak",
    "Tweet suggestions for your next viral thought",
    "One-click downloads (even for Notion 👀)"
  ];

  const whatYouGetList = [
    "Ready-to-use tools (LinkedIn, Tweets, Reels, Research & more)",
    "Daily ideas, auto scripts",
    "1-click downloads (incl. Notion support)",
    "A chill community that grows together",
    "Meme-wala interface but pro-level results"
  ];
  return (
    <>
      {/* Hero Section */}
      <section className="subtle-grid-background relative py-32 md:py-40 -mt-16 text-center overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          
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

      {/* Section 1: You Add the Soul. We Handle the System. */}
      <section className="py-16 md:py-20 bg-background/60">
        <div className="container mx-auto px-4 text-center">
          <Lightbulb className="mx-auto h-12 w-12 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            You Add the Soul. <span className="text-accent">We Handle the System.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Creating content isn’t just about ideas. It’s about time, energy, and consistency.
            We simplify that process so <strong className="text-primary-foreground">you can bring your personal touch without the pressure.</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-4xl mx-auto">
            {featureList.map((feature, index) => (
              <Card key={index} className="bg-card text-card-foreground shadow-md border-border p-4 hover:border-accent transition-colors duration-300">
                <CardContent className="p-0 flex items-center justify-center text-center h-full">
                  <p className="text-base">{feature.startsWith("One-click") ? <span dangerouslySetInnerHTML={{ __html: feature.replace("👀", "<span class='inline-block ml-1'>👀</span>") }} /> : feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xl font-semibold italic text-accent">
            “Bro tu bas feel daal, humne pehle hi reel idea likh diya hai.”
          </p>
        </div>
      </section>

      {/* Section 2: Everyone’s Building Something. Let’s Help Each Other Grow. */}
      <section className="py-16 md:py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <Flame className="mx-auto h-12 w-12 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
            Everyone’s Building Something. <span className="text-accent">Let’s Help Each Other Grow.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="p-0 pb-4 flex flex-col items-center text-center">
                <Briefcase className="w-10 h-10 mb-3 text-blue-400" />
                <CardTitle className="font-headline text-xl">For Founders</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-center">
                <CardDescription className="text-base mb-3">
                  Focus on scaling your company — we’ll help build your <strong className="text-primary-foreground">startup brand</strong> and <strong className="text-primary-foreground">personal brand.</strong>
                </CardDescription>
                <p className="text-md font-semibold italic text-accent">"Tu unicorn banane mein lag ja, hum teri branding kar lenge."</p>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="p-0 pb-4 flex flex-col items-center text-center">
                <TrendingUp className="w-10 h-10 mb-3 text-green-400" />
                <CardTitle className="font-headline text-xl">For Professionals</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-center">
                <CardDescription className="text-base mb-3">
                  Crack your job goals and build your online presence — with minimal effort.
                </CardDescription>
                <p className="text-md font-semibold italic text-accent">"Client ko PPT dikhao, post hum likhdenge."</p>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground shadow-lg border-border p-6 hover:border-accent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="p-0 pb-4 flex flex-col items-center text-center">
                <Sparkles className="w-10 h-10 mb-3 text-pink-400" />
                <CardTitle className="font-headline text-xl">For Creators</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-center">
                <CardDescription className="text-base mb-3">
                  Your vibe matters. We’ll make sure your <strong className="text-primary-foreground">posting game stays consistent.</strong>
                </CardDescription>
                <p className="text-md font-semibold italic text-accent">"No more ‘kal se post karenge’. Aaj se flow mein aa ja."</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: This Isn’t Just a Tool. It’s a Tribe. */}
      <section className="py-16 md:py-20 bg-background/60">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Users className="mx-auto h-12 w-12 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            This Isn’t Just a Tool. <span className="text-accent">It’s a Tribe.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            Let’s be real — Everyone wants to grow alone.
            But what if we all grew <strong className="text-primary-foreground">together</strong>?
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            That’s what ContentFlow stands for — a <strong className="text-primary-foreground">community-first content platform</strong>.
            Where creators support creators. Founders help founders. And no one’s left behind.
          </p>
          <p className="text-xl font-semibold italic text-accent">
            “Yahan sirf content nahi banta, dosti bhi hoti hai.”
          </p>
        </div>
      </section>

      {/* Section 4: What You Get */}
      <section className="py-16 md:py-20 bg-background/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <ListChecks className="mx-auto h-12 w-12 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10 text-primary-foreground">
            What You Get <span className="text-accent">(The Good Stuff)</span>
          </h2>
          <Card className="bg-card text-card-foreground shadow-xl border-border p-6 md:p-8">
            <CardContent className="p-0">
              <ul className="space-y-4">
                {whatYouGetList.map((item, index) => (
                  <li key={index} className="flex items-start text-lg">
                    <span className="text-green-400 mr-3 mt-1">✅</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <p className="text-xl font-semibold italic text-accent text-center mt-10">
            "Productivity bhi, personality bhi. Ab dono ek saath possible hai."
          </p>
        </div>
      </section>
      
      {/* Section 5: Some Meme Magic */}
      <section className="py-16 md:py-20 bg-background/60">
        <div className="container mx-auto px-4 max-w-2xl text-center">
           <MessageCircle className="mx-auto h-12 w-12 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-10 text-primary-foreground">
            Some <span className="text-accent">Meme Magic</span>
          </h2>
          <div className="space-y-8">
            <Card className="bg-card text-card-foreground shadow-lg border-border p-6">
              <CardContent className="p-0">
                <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                  "Mummy: Itna phone kyun chala raha hai?<br/>
                  Main: Brand bana raha hu mummy, ContentFlow ke sath."
                </blockquote>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground shadow-lg border-border p-6">
              <CardContent className="p-0">
                <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                  "Client: Kal 7 post chahiye<br/>
                  Main (internally): Bhai ContentFlow hai to kya dikkat."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Last Section: Meet the Bro Behind the Flow */}
      <section className="py-16 md:py-20 bg-background/50">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Smile className="mx-auto h-12 w-12 text-accent mb-6" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Meet the Bro <span className="text-accent">Behind the Flow</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
            Hey! I’m <strong className="text-primary-foreground">Vansham</strong>, founder of ContentFlow.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            I love creating content, being active in communities, attending events, and most importantly — <strong className="text-primary-foreground">growing with people.</strong>
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            This isn’t just a product. It’s my way of saying:
          </p>
          <p className="text-xl font-semibold italic text-accent">
            “Tere jaise creators deserve better tools,<br/>
            Tera bhai bana raha hai wahi.”
          </p>
        </div>
      </section>

      {/* Feedback & CTA Section (Kept from original structure) */}
      <section className="py-20 md:py-28 bg-gradient-to-t from-background to-slate-900/60 relative">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Zap className="mx-auto h-14 w-14 text-accent mb-6" /> {/* Changed icon slightly for variety */}
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Flow? <span className="text-accent">(Still in Beta, Bro!)</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Your feedback = cheat code for making this tool even better. Tell us what’s working, what’s meh, and what would make your life easier.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              <Link href="https://chat.whatsapp.com/ESI9d1MyJ6NE1Pa3YHQ7GR" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" /> Join WhatsApp
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

    
