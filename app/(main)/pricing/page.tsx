import type { Metadata } from "next";
import { PricingSection } from "@/components/landing/PricingSection";

export const metadata: Metadata = {
  title: "Pricing — InstaPromptHub",
  description: "Start free. Upgrade for unlimited access to premium AI prompts, advanced features, and creator monetization tools.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Simple, <span className="gradient-text">transparent</span> pricing
        </h1>
        <p className="text-white/50 text-lg">Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
      </div>
      <PricingSection />
    </div>
  );
}
