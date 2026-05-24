"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Sparkles, Copy, Star, TrendingUp, Globe } from "lucide-react";

const stats = [
  { label: "AI Prompts", end: 50000, suffix: "+", prefix: "", icon: Sparkles, color: "text-purple-400" },
  { label: "Active Creators", end: 12000, suffix: "+", prefix: "", icon: Users, color: "text-pink-400" },
  { label: "Total Copies", end: 2000000, suffix: "+", prefix: "", icon: Copy, color: "text-cyan-400" },
  { label: "5-Star Reviews", end: 98000, suffix: "+", prefix: "", icon: Star, color: "text-amber-400" },
  { label: "Monthly Visitors", end: 500000, suffix: "+", prefix: "", icon: Globe, color: "text-green-400" },
  { label: "Revenue Shared", end: 250000, suffix: "+", prefix: "$", icon: TrendingUp, color: "text-rose-400" },
];

function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
}

function StatCard({ label, end, suffix, prefix, icon: Icon, color, delay }: {
  label: string; end: number; suffix: string; prefix: string;
  icon: React.ComponentType<{ className?: string }>; color: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(end, 2000, inView);

  const displayValue = end >= 1_000_000
    ? (count / 1_000_000).toFixed(1) + "M"
    : end >= 1000
    ? (count / 1000).toFixed(count >= end ? 0 : 1) + "K"
    : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-2xl p-6 text-center group hover:scale-105 transition-transform duration-300"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className={`text-3xl font-black ${color} mb-1`}>
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-sm text-white/50 font-medium">{label}</div>
    </motion.div>
  );
}

export function StatsCounter() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-purple-300 text-sm mb-4">
            <TrendingUp className="w-4 h-4" />
            Platform Growth
          </span>
          <h2 className="section-heading text-white mb-4">
            Numbers that <span className="gradient-text">speak volumes</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Trusted by thousands of creators and AI enthusiasts worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
