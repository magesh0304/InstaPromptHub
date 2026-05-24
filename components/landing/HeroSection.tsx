"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search, Sparkles, ArrowRight, TrendingUp, Zap,
  ChevronRight, Bot, Image as ImageIcon, Code, Megaphone
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ParticleBackground } from "@/components/landing/ParticleBackground";

const trendingKeywords = [
  "Cinematic portrait", "Anime character", "Logo design",
  "Marketing copy", "ChatGPT business", "Midjourney fantasy",
  "Code review", "Social media post",
];

const aiModels = [
  { name: "ChatGPT", icon: "💬", color: "from-green-500/20 to-teal-500/20 border-green-500/20" },
  { name: "Midjourney", icon: "🎨", color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/20" },
  { name: "Gemini", icon: "✨", color: "from-blue-500/20 to-sky-500/20 border-blue-500/20" },
  { name: "Claude", icon: "🤖", color: "from-orange-500/20 to-amber-500/20 border-orange-500/20" },
  { name: "DALL-E", icon: "🖼️", color: "from-rose-500/20 to-pink-500/20 border-rose-500/20" },
  { name: "Flux", icon: "⚡", color: "from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/20" },
  { name: "Sora", icon: "🎬", color: "from-cyan-500/20 to-sky-500/20 border-cyan-500/20" },
  { name: "Grok", icon: "🧠", color: "from-gray-500/20 to-zinc-500/20 border-gray-500/20" },
];

const stats = [
  { label: "AI Prompts", value: "50K+", icon: Sparkles },
  { label: "Creators", value: "12K+", icon: Bot },
  { label: "Copies Made", value: "2M+", icon: Code },
  { label: "AI Models", value: "14+", icon: ImageIcon },
];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden animated-gradient-bg">
      <ParticleBackground />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-sm text-purple-300 mb-8 cursor-pointer hover:border-purple-500/40 transition-all group"
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span>🎉 Sora & Kling prompts now available!</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="section-heading mb-6"
        >
          <span className="text-white">Discover Viral</span>
          <br />
          <span className="gradient-text text-glow-purple">AI Prompts</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Explore thousands of powerful prompts for{" "}
          <span className="text-purple-300 font-medium">ChatGPT</span>,{" "}
          <span className="text-pink-300 font-medium">Gemini</span>,{" "}
          <span className="text-orange-300 font-medium">Claude</span>,{" "}
          <span className="text-indigo-300 font-medium">Midjourney</span> and every AI tool.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={handleSearch}
          className="flex items-center gap-2 max-w-2xl mx-auto mb-6"
        >
          <div className="flex-1 relative hero-search rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts, creators, categories..."
              className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-white/30 outline-none text-base"
              aria-label="Search prompts"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            Search
          </motion.button>
        </motion.form>

        {/* Trending keywords */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center justify-center flex-wrap gap-2 mb-12"
        >
          <span className="flex items-center gap-1 text-xs text-white/40">
            <TrendingUp className="w-3.5 h-3.5 text-pink-400" /> Trending:
          </span>
          {trendingKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => router.push(`/explore?search=${encodeURIComponent(kw)}`)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all"
            >
              {kw}
            </button>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-base hover:from-purple-500 hover:to-pink-500 transition-all shadow-xl shadow-purple-500/30"
            >
              <Sparkles className="w-5 h-5" />
              Explore Prompts
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/15 text-white font-semibold text-base hover:bg-white/5 hover:border-white/25 transition-all"
            >
              <Zap className="w-5 h-5 text-purple-400" />
              Become Creator
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-20"
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass-card rounded-2xl p-4 text-center">
              <Icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{value}</div>
              <div className="text-xs text-white/40 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* AI Model Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Works with all major AI models</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {aiModels.map((model) => (
              <Link
                key={model.name}
                href={`/explore?aiModel=${model.name.toUpperCase().replace(/\s/g, "_")}`}
                className={cn(
                  `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:scale-105`,
                  `bg-gradient-to-r text-white/80 hover:text-white`,
                  model.color
                )}
              >
                <span>{model.icon}</span>
                {model.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Helper cn import
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
