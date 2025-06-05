'use client';

import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function FeedPage() {
  return (
    <div className="container mx-auto px-4 pt-20 max-w-3xl">
      {/* ShareSpace Hero Section */}
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold mb-4 text-primary-foreground">
          ShareSpace is Coming Soon!
        </h1>
        <p className="text-muted-foreground text-lg mb-4">
          A dedicated space to share your content directly on our website — be it your ideas, resources, or your proudest moments.
        </p>
        <p className="text-muted-foreground text-base mb-4">
          Everything you post becomes part of a public feed reaching creators across the platform.
        </p>
        <p className="text-muted-foreground text-base mb-4">
          Think of it as your digital bulletin board — for visibility, for growth, and for connection.
        </p>
        <p className="text-muted-foreground text-base font-medium">
          💡 Got ideas for ShareSpace? We're building it with <b>you</b>, and for <b>you</b>.
        </p>
      </section>

      {/* Techies Community CTA Section */}
      <section className="bg-card p-6 rounded-xl shadow-lg text-center border border-border">
        <h2 className="text-2xl font-bold mb-3 text-primary-foreground">Join Our Community – <span className="text-purple-500">Techies</span></h2>
        <p className="text-muted-foreground mb-4">
          Be part of a growing community of creators. Share your journey, your work, and your voice by tagging us on Instagram or WhatsApp.
        </p>
        <p className="text-muted-foreground mb-4">
          If you've ever thought of starting content creation — now’s your chance. Use our tools, and we’ll be with you throughout the journey. 🎯
        </p>
        <p className="text-muted-foreground mb-6">
          We're also planning exclusive sessions & events to help you grow. Let’s build and rise together!
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://www.instagram.com/your_insta_handle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            <FaInstagram className="text-xl" />
            Join on Instagram
          </a>
          <a
            href="https://chat.whatsapp.com/your_community_link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            <FaWhatsapp className="text-xl" />
            Join on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
