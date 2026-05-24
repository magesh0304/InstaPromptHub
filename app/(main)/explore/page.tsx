import type { Metadata } from "next";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore AI Prompts",
  description: "Browse thousands of AI prompts for ChatGPT, Midjourney, Gemini, Claude, Flux, DALL-E and more. Filter by model, category, and sort by trending.",
};

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Prompt Gallery</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Explore <span className="gradient-text">AI Prompts</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Discover thousands of curated prompts for every AI model, style, and use case.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <PromptGrid />
      </div>
    </div>
  );
}
