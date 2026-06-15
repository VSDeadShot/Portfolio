"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { Projects } from "@/components/ui/Projects";
import BlurText from "@/components/ui/BlurText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30">
      <Navbar />
      <Hero />
      
      <TechMarquee />

      <section className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12"
        >
          <div className="space-y-2">
            <BlurText 
              text="Featured Projects" 
              className="text-3xl md:text-4xl font-bold tracking-tighter" 
              animateBy="letters" 
              delay={50}
            />
            <BlurText 
              text="A selection of my recent technical experiments and applications." 
              className="text-muted-foreground text-lg" 
              animateBy="words"
              delay={30}
            />
          </div>
          <Link 
            href="/projects"
            className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View Full Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        
        <Projects limit={3} />
      </section>
      
      <footer className="py-12 text-center text-sm text-muted-foreground border-t border-white/5 bg-black/20 backdrop-blur-sm flex justify-center">
        <BlurText 
          text={`© ${new Date().getFullYear()} Vedansh Sharma. Built with Next.js & Framer Motion.`}
          animateBy="words"
          className="inline-block"
        />
      </footer>
    </main>
  );
}