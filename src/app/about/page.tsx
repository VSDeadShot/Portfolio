"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { Calendar, Briefcase, GraduationCap } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

export default function About() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30 pt-24 pb-12 px-4">
      <Navbar />

      <div className="max-w-4xl mx-auto space-y-20">
        {/* Header Section */}
        <section className="text-center space-y-6">
          <div className="relative w-40 h-40 mx-auto group cursor-pointer">
            {/* Pulsing Glow Background */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/50 transition-colors" 
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full rounded-full bg-gradient-to-tr from-primary to-purple-500 p-1 shadow-xl"
            >
              <div className="w-full h-full rounded-full bg-black/90 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-white/10">
                 <motion.span 
                   className="text-6xl"
                   animate={{ rotate: [-10, 10, -10] }}
                   whileHover={{ 
                     rotate: [-15, 15, -15],
                     scale: 1.1,
                     transition: { duration: 1.2, repeat: Infinity, ease: "linear" } 
                   }}
                   transition={{ 
                     duration: 1.5, 
                     repeat: Infinity, 
                     ease: "easeInOut"
                   }}
                   style={{ display: "inline-block", transformOrigin: "bottom right" }}
                 >
                   👋
                 </motion.span>
              </div>
            </motion.div>
          </div>
          
          <div className="flex flex-col items-center">
            <BlurText 
              text="About Me" 
              className="text-4xl md:text-5xl font-bold mb-4" 
              animateBy="letters" 
              delay={50}
            />
            <BlurText 
              text="A passionate developer crafting digital experiences with code and creativity."
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              animateBy="words"
              delay={20}
            />
          </div>
        </section>

        {/* Bio Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="prose prose-invert mx-auto bg-black/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm shadow-2xl shadow-black/50"
        >
          <BlurText 
            text="I'm a Software Engineer and Competitive Programmer based in India. I thrive on the thrill of solving algorithmic challenges and translating those problem-solving skills into robust, full-stack applications. Currently pursuing my B.Tech in Computer Science, I'm passionate about building systems that are both highly performant and user-centric. When I'm not grinding on LeetCode or CodeChef, you can find me exploring new tech stacks or building side projects."
            className="text-lg leading-relaxed text-gray-300"
            animateBy="words"
            delay={10}
          />
        </motion.section>

        {/* Tech Stack Marquee */}
        <section className="py-8">
           <div className="flex justify-center mb-8">
             <BlurText text="Technologies I Use" className="text-2xl font-bold text-center" animateBy="words" />
           </div>
           <TechMarquee />
        </section>

        {/* Education */}
        <section className="max-w-2xl mx-auto w-full">
            <TimelineSection title="Education" icon={GraduationCap}>
                <TimelineItem 
                    role="B.Tech Computer Science and Engineering"
                    company="Manipal University Jaipur"
                    date="2024 - 2028"
                    description="Specializing in software development and intelligent systems. Actively participating in technical clubs and research initiatives."
                />
            </TimelineSection>
        </section>

      </div>
    </main>
  );
}

interface TimelineSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function TimelineSection({ title, icon: Icon, children }: TimelineSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <Icon className="text-primary" /> {title}
            </h2>
            <div className="space-y-8 pl-2 border-l-2 border-white/10 ml-3">
                {children}
            </div>
        </motion.div>
    );
}

interface TimelineItemProps {
  role: string;
  company: string;
  date: string;
  description: string;
}

function TimelineItem({ role, company, date, description }: TimelineItemProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative pl-8 group"
        >
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-white/20 group-hover:border-primary transition-colors" />
            <h3 className="text-lg font-semibold">{role}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>{company}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
            </div>
            <p className="text-sm text-gray-400">{description}</p>
        </motion.div>
    );
}
