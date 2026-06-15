"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import { MouseEvent } from "react";

const projects = [
  {
    title: "Student Management System",
    description: "A comprehensive website built for colleges to efficiently manage student records, attendance, and academic performance.",
    tags: ["Next.js", "React", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com",
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
