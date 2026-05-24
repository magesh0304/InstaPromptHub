import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturedPromptsSection } from "@/components/landing/FeaturedPrompts";
import { CategoriesGrid } from "@/components/landing/CategoriesGrid";
import { PopularCreators } from "@/components/landing/PopularCreators";
import { StatsCounter } from "@/components/landing/StatsCounter";
import { PricingSection } from "@/components/landing/PricingSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";

export const metadata: Metadata = {
  title: "InstaPromptHub — World's Best AI Prompt Marketplace",
  description:
    "Discover, share, and sell AI prompts for ChatGPT, Gemini, Claude, Midjourney, Flux, DALL-E, and 14+ AI models. The world's premium AI prompt marketplace.",
  openGraph: {
    title: "InstaPromptHub — World's Best AI Prompt Marketplace",
    description: "Discover thousands of powerful AI prompts for every model.",
    images: [{ url: "/og-home.png", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPromptsSection />
      <CategoriesGrid />
      <StatsCounter />
      <PopularCreators />
      <ReviewsSection />
      <PricingSection />
    </>
  );
}
