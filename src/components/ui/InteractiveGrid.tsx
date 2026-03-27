"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { 
  Code2, Database, Globe, Cpu, 
  Layers, Smartphone, Terminal, 
  Wifi, Shield, Zap, Layout, 
  Box, Command, Hash, Braces
} from "lucide-react";

const icons = [
  { icon: Code2, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/50" },
  { icon: Database, color: "from-green-500 to-green-600", shadow: "shadow-green-500/50" },
  { icon: Globe, color: "from-purple-500 to-purple-600", shadow: "shadow-purple-500/50" },
  { icon: Cpu, color: "from-red-500 to-red-600", shadow: "shadow-red-500/50" },
  { icon: Layers, color: "from-yellow-500 to-yellow-600", shadow: "shadow-yellow-500/50" },
  { icon: Smartphone, color: "from-pink-500 to-pink-600", shadow: "shadow-pink-500/50" },
  { icon: Terminal, color: "from-gray-600 to-gray-700", shadow: "shadow-gray-500/50" },
  { icon: Wifi, color: "from-cyan-500 to-cyan-600", shadow: "shadow-cyan-500/50" },
  { icon: Shield, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/50" },
  { icon: Zap, color: "from-orange-500 to-orange-600", shadow: "shadow-orange-500/50" },
  { icon: Layout, color: "from-indigo-500 to-indigo-600", shadow: "shadow-indigo-500/50" },
  { icon: Box, color: "from-rose-500 to-rose-600", shadow: "shadow-rose-500/50" },
  { icon: Command, color: "from-teal-500 to-teal-600", shadow: "shadow-teal-500/50" },
  { icon: Hash, color: "from-violet-500 to-violet-600", shadow: "shadow-violet-500/50" },
  { icon: Braces, color: "from-sky-500 to-sky-600", shadow: "shadow-sky-500/50" },
];

export function InteractiveGrid() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [20, -20]); 
  const rotateY = useTransform(x, [-0.5, 0.5], [-20, 20]);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        style={{ rotateX: springRotateX, rotateY: springRotateY }}
        className="relative grid grid-cols-4 gap-6 transform-style-3d cursor-pointer p-10"
      >
        {icons.map((item, index) => (
          <Key3D key={index} {...item} index={index} mouseX={x} mouseY={y} />
        ))}
      </motion.div>
    </div>
  );
}

function Key3D({ icon: Icon, color, shadow, index, mouseX, mouseY }: { icon: any, color: string, shadow: string, index: number, mouseX: any, mouseY: any }) {
  // More organic random movement
  const randomDelay = Math.random() * 5;
  const randomDuration = 4 + Math.random() * 4;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, z: -100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        z: 0,
        transition: { 
          delay: index * 0.05,
          type: "spring",
          stiffness: 100,
          damping: 20
        }
      }}
      whileHover={{ 
        z: 20,
        scale: 1.05,
        transition: { duration: 0.2 } 
      }}
      whileTap={{
        z: -10,
        scale: 0.95,
      }}
      className="relative w-16 h-16 group"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Floating Animation Wrapper */}
      <motion.div
        animate={{ 
          y: [0, -8, 0],
          rotateX: [0, 5, 0],
          rotateY: [0, 5, 0]
        }}
        transition={{ 
          duration: randomDuration, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: randomDelay
        }}
        className="relative w-full h-full transform-style-3d"
      >
        {/* Shadow */}
        <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 bg-black/60 blur-xl rounded-full opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300`} />
        
        {/* Key Body (Sides/Thickness) */}
        <div className="absolute inset-0 rounded-2xl bg-[#1a1a1a] translate-z-[-8px] translate-y-[8px] shadow-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-4 rounded-b-2xl bg-[#111] translate-y-[4px] translate-z-[-4px]" />
        
        {/* Key Face */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} p-0.5 shadow-lg ${shadow} transition-all duration-300 transform-style-3d overflow-hidden`}>
           {/* Top Highlight/Glare */}
           <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 rounded-2xl pointer-events-none" />
           
           <div className="relative w-full h-full rounded-[14px] bg-black/20 backdrop-blur-md flex items-center justify-center border-t border-white/30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
             <Icon className="text-white w-7 h-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform transition-transform group-hover:scale-110 group-active:scale-95" />
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}