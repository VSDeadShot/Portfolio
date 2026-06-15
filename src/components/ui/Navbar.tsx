"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Home, User, Briefcase, Terminal, Mail, Award } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Stats", href: "/stats", icon: Terminal },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Certificates", href: "/certificates", icon: Award },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
    >
      <div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-2 px-4 py-3 rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-2xl shadow-xl"
      >
        {navItems.map((item) => (
           <DockItem key={item.name} mouseX={mouseX} item={item} isActive={pathname === item.href} />
        ))}
      </div>
    </motion.nav>
  );
}

function DockItem({ mouseX, item, isActive }: { mouseX: MotionValue, item: any, isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={item.href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className={cn(
          "aspect-square rounded-2xl flex items-center justify-center relative transition-colors group",
          isActive ? "bg-primary/20 text-primary border border-primary/50" : "bg-white/5 text-muted-foreground border border-white/5 hover:bg-white/10"
        )}
      >
        <span className="absolute -top-10 text-xs font-medium bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
            {item.name}
        </span>
        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
      </motion.div>
    </Link>
  );
}
