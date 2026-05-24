"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Clock, Copy as CopyIcon, Star } from "lucide-react";
import { PromptCard } from "@/components/prompts/PromptCard";
import type { Prompt } from "@/types";

// Mock data for demonstration
const mockPrompts: Prompt[] = [
  {
    id: "1", slug: "cinematic-portrait-master", title: "Ultra Cinematic Portrait Master",
    content: "Create a hyper-realistic cinematic portrait of [subject], shot on ARRI Alexa with anamorphic lens, golden hour lighting, shallow depth of field, film grain, color graded like a Christopher Nolan film...",
    description: "Generate stunning cinematic portraits with professional film aesthetics",
    aiModel: "MIDJOURNEY", category: "PORTRAIT", status: "PUBLISHED",
    previewImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
    isPremium: false, creatorId: "u1", viewCount: 12400, likeCount: 2890, copyCount: 4200, bookmarkCount: 1200,
    createdAt: new Date("2024-01-15"), updatedAt: new Date(),
    creator: { id: "u1", userId: "u1", username: "visualalchemy", displayName: "Visual Alchemy", isVerified: true, totalViews: 0, totalEarnings: 0, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop" },
    tags: [{ id: "t1", name: "cinematic", slug: "cinematic" }, { id: "t2", name: "portrait", slug: "portrait" }],
    isLiked: false, isBookmarked: false,
  },
  {
    id: "2", slug: "chatgpt-business-analyst", title: "World-Class Business Analyst GPT",
    content: "You are a senior McKinsey consultant with 20 years of experience. Analyze [business problem] using the following frameworks: SWOT, Porter's Five Forces, BCG Matrix...",
    description: "Transform ChatGPT into a top-tier business strategist",
    aiModel: "CHATGPT", category: "BUSINESS", status: "PUBLISHED",
    isPremium: true, price: 4.99, creatorId: "u2", viewCount: 8900, likeCount: 1750, copyCount: 3100, bookmarkCount: 890,
    createdAt: new Date("2024-02-01"), updatedAt: new Date(),
    creator: { id: "u2", userId: "u2", username: "promptwizard", displayName: "Prompt Wizard", isVerified: true, totalViews: 0, totalEarnings: 0 },
    tags: [{ id: "t3", name: "business", slug: "business" }, { id: "t4", name: "strategy", slug: "strategy" }],
    isLiked: true, isBookmarked: false,
  },
  {
    id: "3", slug: "anime-character-flux", title: "Stunning Anime Character Creator",
    content: "anime style, [character description], vibrant colors, detailed linework, Studio Ghibli inspiration, soft watercolor background, dramatic lighting, expressive eyes...",
    aiModel: "FLUX", category: "ANIME", status: "PUBLISHED",
    previewImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    isPremium: false, creatorId: "u3", viewCount: 21000, likeCount: 4200, copyCount: 7800, bookmarkCount: 2100,
    createdAt: new Date("2024-02-10"), updatedAt: new Date(),
    creator: { id: "u3", userId: "u3", username: "animemaster", displayName: "Anime Master", isVerified: false, totalViews: 0, totalEarnings: 0 },
    tags: [{ id: "t5", name: "anime", slug: "anime" }, { id: "t6", name: "character", slug: "character" }],
    isLiked: false, isBookmarked: true,
  },
  {
    id: "4", slug: "logo-design-genius", title: "Minimalist Logo Design System",
    content: "Create a minimalist logo for [brand name] in the [industry] sector. The logo should convey [values]. Style: geometric, clean, modern. Colors: [palette]...",
    aiModel: "DALLE", category: "LOGO", status: "PUBLISHED",
    previewImage: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop",
    isPremium: false, creatorId: "u4", viewCount: 9800, likeCount: 1900, copyCount: 5200, bookmarkCount: 1400,
    createdAt: new Date("2024-02-15"), updatedAt: new Date(),
    creator: { id: "u4", userId: "u4", username: "designpro", displayName: "Design Pro", isVerified: true, totalViews: 0, totalEarnings: 0 },
    tags: [{ id: "t7", name: "logo", slug: "logo" }, { id: "t8", name: "design", slug: "design" }],
  },
  {
    id: "5", slug: "claude-code-reviewer", title: "Expert Code Review Assistant",
    content: "You are a senior software engineer at Google with expertise in [language]. Review the following code for: security vulnerabilities, performance issues, code quality, best practices...",
    aiModel: "CLAUDE", category: "CODING", status: "PUBLISHED",
    isPremium: true, price: 2.99, creatorId: "u5", viewCount: 15600, likeCount: 3200, copyCount: 6100, bookmarkCount: 1800,
    createdAt: new Date("2024-02-20"), updatedAt: new Date(),
    creator: { id: "u5", userId: "u5", username: "codeguru", displayName: "Code Guru", isVerified: true, totalViews: 0, totalEarnings: 0 },
    tags: [{ id: "t9", name: "coding", slug: "coding" }, { id: "t10", name: "review", slug: "review" }],
    isLiked: false, isBookmarked: false,
  },
  {
    id: "6", slug: "runway-cinematic-video", title: "Cinematic Short Film Creator",
    content: "Generate a cinematic short film sequence: [scene description]. Camera movement: slow dolly forward. Lighting: dramatic chiaroscuro. Color grade: teal and orange...",
    aiModel: "RUNWAY", category: "VIDEO_CREATION", status: "PUBLISHED",
    previewImage: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=400&h=550&fit=crop",
    isPremium: true, price: 7.99, creatorId: "u6", viewCount: 7200, likeCount: 1450, copyCount: 2100, bookmarkCount: 720,
    createdAt: new Date("2024-03-01"), updatedAt: new Date(),
    creator: { id: "u6", userId: "u6", username: "filmcraft", displayName: "Film Craft", isVerified: false, totalViews: 0, totalEarnings: 0 },
    tags: [{ id: "t11", name: "video", slug: "video" }, { id: "t12", name: "cinematic", slug: "cinematic" }],
  },
];

const sections = [
  { id: "featured", label: "Editor's Picks", icon: Star, color: "text-amber-400", description: "Curated by our experts" },
  { id: "trending", label: "Trending Today", icon: TrendingUp, color: "text-pink-400", description: "What's hot right now" },
  { id: "newest", label: "New Arrivals", icon: Clock, color: "text-cyan-400", description: "Just added" },
  { id: "mostCopied", label: "Most Copied", icon: CopyIcon, color: "text-green-400", description: "Community favorites" },
];

export function FeaturedPromptsSection() {
  return (
    <>
      {sections.map((section, sIdx) => (
        <section key={section.id} className="py-16 relative">
          {sIdx % 2 === 0 && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/3 to-transparent pointer-events-none" />
          )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="flex items-center justify-between mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <section.icon className={`w-5 h-5 ${section.color}`} />
                  <span className={`text-sm font-medium ${section.color}`}>{section.description}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{section.label}</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/explore?sort=${section.id}`}
                  className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors group"
                >
                  View all
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Prompt grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockPrompts.slice(0, 4).map((prompt, i) => (
                <PromptCard key={`${section.id}-${prompt.id}`} prompt={prompt} index={i} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
