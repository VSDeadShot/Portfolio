"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import { MouseEvent } from "react";

const projects = [
  {
    title: "Bixby PC Navigator",
    description: "An advanced two-way bridge transforming Samsung's Bixby into a local AI orchestrator. Features secure local Node.js server relays, Google Gemini 2.5 LLM integration, and context-aware screen reading.",
    tags: ["Node.js", "Python", "Google Gemini 2.5", "Bixby"],
    github: "https://github.com/VSDeadShot/Bixby-PC-Navigator",
    demo: "https://github.com/VSDeadShot/Bixby-PC-Navigator",
  },
  {
    title: "FluxBudget",
    description: "A beautifully designed personal finance tracker built with Electron and React. Features full dashboard analytics, a bucketing budget system, and offline-first local storage.",
    tags: ["React 18", "Electron", "Tailwind CSS", "Recharts"],
    github: "https://github.com/VSDeadShot/FluxBudget",
    demo: "https://github.com/VSDeadShot/FluxBudget",
  },
  {
    title: "OmniTask",
    description: "A centralized, developer-focused task manager featuring a premium React dashboard and a global CLI for seamlessly managing to-dos across multiple projects.",
    tags: ["React 19", "Express.js", "Vite", "CLI"],
    github: "https://github.com/VSDeadShot/OmniTask",
    demo: "https://github.com/VSDeadShot/OmniTask",
  },
  {
    title: "Portfolio",
    description: "My personal developer portfolio built with Next.js and Framer Motion, featuring a sleek, premium Samsung One UI inspired aesthetic.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/VSDeadShot/Portfolio",
    demo: "https://vedanshsharma.vercel.app",
  },
  {
    title: "University RDBMS",
    description: "A comprehensive Relational Database Management System built to efficiently manage university administration, student records, and academic data.",
    tags: ["TypeScript", "SQL", "Database Management"],
    github: "https://github.com/VSDeadShot/university-rdbms",
    demo: "https://github.com/VSDeadShot/university-rdbms",
  },
];

import BlurText from "./BlurText";

export function Projects({ limit }: { limit?: number }) {
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
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
            <Folder size={20} />
          </div>
          <div className="flex gap-3">
            <a 
              href={project.github} 
              target="_blank" 
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href={project.demo} 
              target="_blank" 
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <div className="mb-2">
            <BlurText 
                text={project.title} 
                className="text-xl font-bold group-hover:text-primary transition-colors" 
                animateBy="words"
                delay={40}
            />
        </div>
        
        <div className="mb-4 flex-1">
             <BlurText 
                text={project.description} 
                className="text-sm text-muted-foreground" 
                animateBy="words"
                delay={20}
            />
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs font-medium rounded-xl bg-white/5 text-gray-300 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
