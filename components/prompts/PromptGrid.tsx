"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { PromptCard } from "@/components/prompts/PromptCard";
import { cn } from "@/lib/utils";
import {
  AI_MODEL_LABELS, CATEGORY_LABELS, type AIModel, type PromptCategory, type Prompt
} from "@/types";
import type { PromptFilters } from "@/types";

// Mock prompts — replace with real API
const MOCK_PROMPTS: Prompt[] = Array.from({ length: 24 }, (_, i) => ({
  id: String(i + 1),
  slug: `prompt-${i + 1}`,
  title: [
    "Ultra Cinematic Portrait Master", "ChatGPT Business Strategist", "Anime Character Creator",
    "Minimalist Logo System", "Expert Code Reviewer", "Runway Video Generator",
    "Marketing Copy Machine", "Architecture Visualizer", "Fashion Editorial Prompt",
    "Social Media Content Pack", "Educational Course Creator", "Photography Style Guide",
  ][i % 12],
  content: "Sample prompt content goes here...",
  aiModel: (["CHATGPT", "GEMINI", "CLAUDE", "MIDJOURNEY", "FLUX", "DALLE", "RUNWAY", "STABLE_DIFFUSION", "LEONARDO", "IDEOGRAM", "SORA", "GROK"] as AIModel[])[i % 12],
  category: (["PORTRAIT", "BUSINESS", "ANIME", "LOGO", "CODING", "VIDEO_CREATION", "MARKETING", "ARCHITECTURE", "FASHION", "SOCIAL_MEDIA", "EDUCATION", "PHOTOGRAPHY"] as PromptCategory[])[i % 12],
  status: "PUBLISHED" as const,
  previewImage: i % 3 !== 0 ? [
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=400&h=550&fit=crop",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=450&fit=crop",
  ][i % 6] : undefined,
  isPremium: i % 4 === 0,
  price: i % 4 === 0 ? [2.99, 4.99, 7.99, 9.99][i % 4] : undefined,
  creatorId: `u${(i % 6) + 1}`,
  viewCount: Math.floor(Math.random() * 20000) + 1000,
  likeCount: Math.floor(Math.random() * 5000) + 100,
  copyCount: Math.floor(Math.random() * 8000) + 200,
  bookmarkCount: Math.floor(Math.random() * 2000) + 50,
  createdAt: new Date(Date.now() - i * 86400000 * 3),
  updatedAt: new Date(),
  creator: {
    id: `u${(i % 6) + 1}`, userId: `u${(i % 6) + 1}`,
    username: ["visualalchemy", "promptwizard", "animemaster", "codeguru", "designpro", "filmcraft"][i % 6],
    displayName: ["Visual Alchemy", "Prompt Wizard", "Anime Master", "Code Guru", "Design Pro", "Film Craft"][i % 6],
    isVerified: i % 3 === 0, totalViews: 0, totalEarnings: 0,
    createdAt: new Date(), updatedAt: new Date(),
    avatar: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=48&h=48&fit=crop",
    ][i % 3],
  },
  tags: [
    { id: "t1", name: "ai", slug: "ai" },
    { id: "t2", name: ["creative", "business", "anime", "design", "coding", "marketing"][i % 6], slug: ["creative", "business", "anime", "design", "coding", "marketing"][i % 6] },
  ],
  isLiked: i % 5 === 0,
  isBookmarked: i % 7 === 0,
}));

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "trending", label: "Trending" },
  { value: "mostCopied", label: "Most Copied" },
  { value: "mostLiked", label: "Most Liked" },
];

export function PromptGrid() {
  const [filters, setFilters] = useState<PromptFilters>({ sort: "latest" });
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [prompts, setPrompts] = useState<Prompt[]>(MOCK_PROMPTS.slice(0, 12));
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.1 });

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    const nextPage = page + 1;
    const newPrompts = MOCK_PROMPTS.slice(page * 12, nextPage * 12);
    if (newPrompts.length === 0) {
      setHasMore(false);
    } else {
      setPrompts((prev) => [...prev, ...newPrompts]);
      setPage(nextPage);
    }
    setLoading(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);

  const aiModels = Object.entries(AI_MODEL_LABELS) as [AIModel, string][];
  const categories = Object.entries(CATEGORY_LABELS) as [PromptCategory, string][];

  return (
    <div className="max-w-8xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Search + View Controls */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative hero-search rounded-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts..."
              className="w-full pl-10 pr-4 py-3 bg-transparent text-white placeholder-white/30 outline-none text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-white/40 hover:text-white" />
              </button>
            )}
          </div>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all",
              filtersOpen
                ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/8"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {(filters.aiModel && filters.aiModel !== "ALL") ||
              (filters.category && filters.category !== "ALL") ? (
              <span className="w-2 h-2 rounded-full bg-purple-400" />
            ) : null}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sort || "latest"}
              onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as PromptFilters["sort"] }))}
              className="appearance-none bg-white/5 border border-white/10 text-white text-sm px-4 py-3 pr-8 rounded-xl outline-none hover:bg-white/8 cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-gray-900">{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
          </div>

          {/* View mode */}
          <div className="hidden sm:flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-purple-500/30 text-purple-300" : "text-white/40 hover:text-white")}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-purple-500/30 text-purple-300" : "text-white/40 hover:text-white")}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card rounded-2xl p-5 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI Model */}
                <div>
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">AI Model</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilters((f) => ({ ...f, aiModel: "ALL" }))}
                      className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", filters.aiModel === "ALL" || !filters.aiModel ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "border-white/10 text-white/50 hover:text-white hover:border-white/20")}
                    >All Models</button>
                    {aiModels.map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setFilters((f) => ({ ...f, aiModel: key }))}
                        className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", filters.aiModel === key ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "border-white/10 text-white/50 hover:text-white hover:border-white/20")}
                      >{label}</button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilters((f) => ({ ...f, category: "ALL" }))}
                      className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", filters.category === "ALL" || !filters.category ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "border-white/10 text-white/50 hover:text-white hover:border-white/20")}
                    >All</button>
                    {categories.map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setFilters((f) => ({ ...f, category: key }))}
                        className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", filters.category === key ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "border-white/10 text-white/50 hover:text-white hover:border-white/20")}
                      >{label}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Premium filter */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => setFilters((f) => ({ ...f, isPremium: f.isPremium === true ? undefined : true }))}
                  className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", filters.isPremium ? "bg-amber-500/20 border-amber-500/40 text-amber-300" : "border-white/10 text-white/50 hover:text-white hover:border-white/20")}
                >
                  ⭐ Premium Only
                </button>
                <button
                  onClick={() => setFilters({})}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-white/40">
          Showing <span className="text-white font-medium">{prompts.length}</span> prompts
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {prompts.map((prompt, i) => (
          <PromptCard key={prompt.id} prompt={prompt} index={i} />
        ))}
      </div>

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="flex justify-center py-12">
        {loading && (
          <div className="flex items-center gap-3 text-white/40">
            <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <span className="text-sm">Loading more prompts...</span>
          </div>
        )}
        {!hasMore && !loading && (
          <p className="text-sm text-white/30">You&apos;ve seen all prompts 🎉</p>
        )}
      </div>
    </div>
  );
}
