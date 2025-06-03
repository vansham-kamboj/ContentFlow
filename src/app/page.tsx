
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

const benefits = [
  {
    id: 'benefit-1',
    title: "Unlock AI-Powered Creativity",
    description: "Let artificial intelligence be your creative partner, generating unique and engaging content ideas tailored to your niche."
  },
  {
    id: 'benefit-2',
    title: "Craft Viral Reels & Stories Instantly",
    description: "Go from idea to script to full content plan for your Instagram Reels and Stories in minutes, not hours."
  },
  {
    id: 'benefit-3',
    title: "Dominate LinkedIn with Insightful Posts",
    description: "Generate professional, thought-provoking LinkedIn posts that establish your authority and connect with your network."
  },
  {
    id: 'benefit-4',
    title: "Save Hours, Skyrocket Engagement",
    description: "Automate the hardest parts of content creation, freeing up your time to focus on what matters most: engaging with your audience."
  },
];


export default function NewHomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Zap className="mx-auto h-16 w-16 text-accent mb-6 animate-pulse" />
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Ignite Your <span className="text-accent">ContentFlow</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground">
            Supercharge your content strategy with AI. Effortlessly generate engaging Reels, captivating Instagram Stories, and insightful LinkedIn posts.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-6 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="/reel">Start Creating Now</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Carousel Section */}
      <section id="benefits-carousel" className="py-16 md:py-24 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">
            Why <span className="text-accent">ContentFlow</span>?
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true, // Enable looping
            }}
            plugins={[plugin.current]}
            className="w-full max-w-2xl mx-auto relative"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {benefits.map((benefit) => (
                <CarouselItem key={benefit.id} className="flex items-center justify-center">
                  <div className="p-1 text-center h-[250px] flex flex-col justify-center items-center"> {/* Adjusted height and flex for centering */}
                    <h3 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-md md:text-lg text-muted-foreground max-w-md">
                      {benefit.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Removed CarouselPrevious, CarouselNext, and CarouselDots */}
          </Carousel>
        </div>
      </section>
    </>
  );
}
