"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Trophy, Activity, Code2, Award } from "lucide-react";

interface Stats {
  leetcode: {
    solved: number;
    ranking: number;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
  };
  codechef: {
    solved: number;
    rating: number;
    stars: string;
    globalRank: number;
  };
  hackerrank: {
    solved: number;
    badges: {
      gold: number;
      silver: number;
      bronze: number;
    };
    points: number;
    ranking: number;
  };
}

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [spring, value, inView]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function CodingStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  // Replace these with your actual usernames or pass them as props
  const leetcodeUser = "VSDeadShot"; 
  const codechefUser = "fair_turkey_13";
  const hackerrankUser = "vedanshsharma281";

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`/api/stats?leetcode=${leetcodeUser}&codechef=${codechefUser}&hackerrank=${hackerrankUser}`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* LeetCode Card */}
        <StatCard
          title="LeetCode"
          icon={Code2}
          color="text-yellow-500"
          loading={loading}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-4xl font-bold">
                  <AnimatedCounter value={stats?.leetcode.solved || 0} />
                </div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Rank</div>
                <div className="text-xl">
                  <AnimatedCounter value={stats?.leetcode.ranking || 0} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <DifficultyBadge label="Easy" count={stats?.leetcode.easy || 0} color="bg-green-500/20 text-green-400" />
              <DifficultyBadge label="Med" count={stats?.leetcode.medium || 0} color="bg-yellow-500/20 text-yellow-400" />
              <DifficultyBadge label="Hard" count={stats?.leetcode.hard || 0} color="bg-red-500/20 text-red-400" />
            </div>
          </div>
        </StatCard>

        {/* CodeChef Card */}
        <StatCard
          title="CodeChef"
          icon={Trophy}
          color="text-orange-500"
          loading={loading}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-4xl font-bold">
                  <AnimatedCounter value={stats?.codechef.solved || 0} />
                </div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className="text-xl font-bold">
                    <AnimatedCounter value={stats?.codechef.rating || 0} />
                  </span>
                  <div className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold border border-orange-500/30">
                    {stats?.codechef.stars || "Unrated"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <Activity size={14} /> Global Rank
              </span>
              <span className="font-mono font-bold text-sm">
                <AnimatedCounter value={stats?.codechef.globalRank || 0} />
              </span>
            </div>
          </div>
        </StatCard>

        {/* HackerRank Card */}
        <StatCard
          title="HackerRank"
          icon={Award}
          color="text-green-500"
          loading={loading}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-4xl font-bold">
                  <AnimatedCounter value={stats?.hackerrank.solved || 0} />
                </div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">
                  <AnimatedCounter value={stats?.hackerrank.points || 0} />
                </div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
            </div>
            
            <div className="space-y-1">
                 <div className="text-xs text-muted-foreground">Badges</div>
                 <div className="flex gap-2">
                    <BadgeCount count={stats?.hackerrank.badges.gold || 0} color="text-yellow-400" label="Gold" />
                    <BadgeCount count={stats?.hackerrank.badges.silver || 0} color="text-gray-400" label="Silver" />
                    <BadgeCount count={stats?.hackerrank.badges.bronze || 0} color="text-amber-700" label="Bronze" />
                 </div>
            </div>
          </div>
        </StatCard>
      </div>
    </motion.div>
  );
}

interface StatCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  color: string;
  loading: boolean;
}

function StatCard({ title, icon: Icon, children, color, loading }: StatCardProps) {
  return (
    <div className="group relative p-6 rounded-2xl bg-black/40 border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col backdrop-blur-sm">
      {/* Dynamic Background Gradient */}
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-white/5 via-transparent to-transparent", color.replace('text-', 'bg-').replace('500', '500/10'))} />
      
      {/* Glow Effect */}
      <div className={cn("absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-all duration-500 group-hover:opacity-40", color.replace('text-', 'bg-').replace('500', '500/30'))} />

      <div className="relative z-10 space-y-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-2">
          <div className={cn("p-3 rounded-xl bg-white/5 shadow-inner ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300", color)}>
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        </div>

        {loading ? (
          <div className="space-y-3 animate-pulse flex-1">
            <div className="h-8 w-24 bg-white/10 rounded" />
            <div className="h-4 w-32 bg-white/5 rounded" />
            <div className="h-12 w-full bg-white/5 rounded mt-4" />
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

interface DifficultyBadgeProps {
  label: string;
  count: number;
  color: string;
}

function DifficultyBadge({ label, count, color }: DifficultyBadgeProps) {
  return (
    <div className={cn("flex flex-col items-center p-2 rounded-lg border border-white/5 backdrop-blur-md transition-all hover:scale-105", color)}>
      <span className="text-lg font-bold"><AnimatedCounter value={count} /></span>
      <span className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">{label}</span>
    </div>
  );
}

function BadgeCount({ count, color, label }: { count: number, color: string, label: string }) {
    return (
        <div className="flex flex-col items-center bg-white/5 rounded-lg px-3 py-1.5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
            <span className={cn("font-bold text-lg", color)}><AnimatedCounter value={count} /></span>
            <span className="text-[10px] text-muted-foreground uppercase font-medium">{label}</span>
        </div>
    )
}
