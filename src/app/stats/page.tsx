"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { CodingStats } from "@/components/ui/CodingStats";
import BlurText from "@/components/ui/BlurText";

export default function StatsPage() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30 pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4 flex flex-col items-center">
          <BlurText 
            text="Coding Statistics" 
            className="text-4xl md:text-5xl font-bold" 
            animateBy="letters" 
            delay={50}
          />
          <BlurText 
            text="Real-time metrics from my competitive programming journey."
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            animateBy="words"
            delay={30}
          />
        </div>
        
        <CodingStats />
      </div>
    </main>
  );
}
