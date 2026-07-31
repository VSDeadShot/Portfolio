"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import BlurText from "@/components/ui/BlurText";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { MouseEvent } from "react";

const certificates: any[] = [
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "Jul 2026",
    link: "/certificates/claude-101.pdf",
    description: "Completed Anthropic's introductory course covering the fundamentals of working with Claude, including prompting techniques and practical AI application development.",
    skills: ["Claude", "Prompt Engineering", "AI Fundamentals"],
  },
];

export default function CertificatesPage() {
  return (
    <main className="min-h-screen relative selection:bg-primary/30 pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4 flex flex-col items-center">
          <BlurText 
            text="My Certificates" 
            className="text-4xl md:text-5xl font-bold" 
            animateBy="letters" 
            delay={50}
          />
          <BlurText 
            text="Professional certifications and achievements fueling my expertise."
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
            animateBy="words"
            delay={30}
          />
        </div>
        
        {certificates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {certificates.map((cert, index) => (
              <CertificateCard key={index} cert={cert} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 shadow-2xl shadow-black/50 backdrop-blur-sm">
            <Award className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">I'm currently earning new certifications. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  );
}

function CertificateCard({ cert, index }: { cert: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl bg-white/5 border border-white/5 shadow-2xl shadow-black/50 overflow-hidden transition-transform duration-300 hover:-translate-y-2"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Award size={24} />
          </div>
          <a 
            href={cert.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors flex items-center gap-1 text-xs"
          >
            Verify <ExternalLink size={14} />
          </a>
        </div>

        <div className="mb-2">
            <BlurText 
                text={cert.title} 
                className="text-xl font-bold group-hover:text-primary transition-colors" 
                animateBy="words"
                delay={40}
            />
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                {cert.issuer}
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="flex items-center gap-1"><Calendar size={12} /> {cert.date}</span>
            </p>
        </div>
        
        <div className="mb-4 flex-1">
             <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-sm text-muted-foreground/80 leading-relaxed"
            >
                {cert.description}
            </motion.p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {cert.skills.map((skill: string) => (
            <span 
              key={skill} 
              className="px-2 py-1 text-xs font-medium rounded-xl bg-white/5 text-gray-300 border border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
