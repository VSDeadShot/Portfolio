"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Projects as ProjectsComponent } from "@/components/ui/Projects";
import BlurText from "@/components/ui/BlurText";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30 pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4 flex flex-col items-center">
          <BlurText 
            text="My Projects" 
            className="text-4xl md:text-5xl font-bold" 
            animateBy="letters" 
            delay={50}
          />
          <BlurText 
            text="A collection of applications, tools, and experiments I've built."
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            animateBy="words"
            delay={30}
          />
        </div>
        
        {/* Reusing the Projects grid, but ensuring it fits the page structure */}
        <div className="mt-8">
           <ProjectsComponent /> 
        </div>
      </div>
    </main>
  );
}
