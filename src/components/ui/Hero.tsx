"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { InteractiveGrid } from "./InteractiveGrid";

import BlurText from "./BlurText";

const roles = ["Software Engineer", "Full Stack Developer", "Competitive Programmer"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      if (text === currentRole) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, 150);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-20">
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left z-10 space-y-6"
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-primary/20 bg-primary/10">
            <BlurText 
              text="Hello World, I'm" 
              delay={50} 
              animateBy="words" 
              className="text-xs font-mono text-primary" 
            />
          </div>
          
          <div className="pb-2">
            <BlurText
              text="Vedansh Sharma"
              delay={50}
              animateBy="letters"
              direction="top"
              className="text-5xl md:text-7xl font-bold tracking-tight text-white justify-center lg:justify-start"
            />
          </div>

          <div className="h-8">
            <p className="text-xl md:text-2xl font-mono text-muted-foreground">
              &gt; {text}
              <span className="animate-pulse">|</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
            <motion.a 
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-white rounded-full font-medium shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              View Work
            </motion.a>
            <motion.a 
              href="https://github.com/VSDeadShot"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/5 backdrop-blur-md text-white rounded-full font-medium border border-white/10 hover:bg-white/10 transition-all"
            >
              GitHub
            </motion.a>
          </div>
        </motion.div>

        {/* Right Content - 3D Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block relative"
        >
           <InteractiveGrid />
        </motion.div>
      </div>
    </section>
  );
}