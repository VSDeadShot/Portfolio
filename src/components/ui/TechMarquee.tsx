"use client";

import { motion } from "framer-motion";
import { 
  Code2, Database, Globe, Cpu, Layers, Smartphone, Terminal, 
  Wifi, Shield, Zap, Layout, Box, Command, Hash, Braces,
  Cloud, Server, GitBranch, Monitor, HardDrive, Coffee
} from "lucide-react";

const techs = [
  { name: "React", icon: Code2, color: "text-blue-500" },
  { name: "Next.js", icon: Globe, color: "text-white" },
  { name: "TypeScript", icon: Braces, color: "text-blue-400" },
  { name: "Node.js", icon: Server, color: "text-green-500" },
  { name: "Tailwind", icon: Layout, color: "text-cyan-400" },
  { name: "PostgreSQL", icon: Database, color: "text-blue-300" },
  { name: "C", icon: Terminal, color: "text-blue-600" },
  { name: "C++", icon: Cpu, color: "text-blue-500" },
  { name: "Java", icon: Coffee, color: "text-red-500" },
  { name: "HTML", icon: Layout, color: "text-orange-500" },
  { name: "CSS", icon: Layers, color: "text-blue-400" },
  { name: "AWS", icon: Cloud, color: "text-orange-500" },
  { name: "Git", icon: GitBranch, color: "text-red-500" },
  { name: "Python", icon: Hash, color: "text-yellow-400" },
  { name: "Linux", icon: Terminal, color: "text-yellow-500" },
  { name: "Framer", icon: Zap, color: "text-pink-500" },
  { name: "Redux", icon: Command, color: "text-purple-500" },
];

export function TechMarquee() {
  return (
    <div 
      className="w-full overflow-hidden py-10 relative flex"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <div className="flex w-max">
        <MarqueeGroup />
        <MarqueeGroup />
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  );
}

function MarqueeGroup() {
  return (
    <motion.div 
      className="flex gap-16 pr-16 shrink-0"
      animate={{ x: "-100%" }}
      transition={{ 
        duration: 40, 
        repeat: Infinity, 
        ease: "linear",
        repeatType: "loop"
      }}
    >
      {techs.map((tech, index) => (
        <div key={index} className="flex items-center gap-3 group cursor-pointer">
          <tech.icon className={`w-8 h-8 ${tech.color} group-hover:scale-110 transition-transform`} />
          <span className="text-xl font-bold text-muted-foreground group-hover:text-white transition-colors">
            {tech.name}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
