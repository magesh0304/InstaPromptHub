"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Crown, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PLANS } from "@/lib/stripe/client";
import { cn } from "@/lib/utils";

const planIcons = { free: Sparkles, pro: Zap, creator: Crown };
const planIconColors = {
  free: "from-gray-500 to-slate-600",
  pro: "from-purple-500 to-violet-600",
  creator: "from-amber-500 to-orange-600",
};

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 text-purple-300 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Pricing Plans
          </span>
          <h2 className="section-heading text-white mb-4">
            Choose your <span className="gradient-text">creative power</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            Start free, upgrade when you&apos;re ready. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl glass border border-white/8">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all",
                billing === "monthly"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-white/50 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                billing === "yearly"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-white/50 hover:text-white"
              )}
            >
              Yearly
              <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full font-semibold">
                Save 30%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Object.entries(PLANS).map(([key, plan], i) => {
            const planKey = key.toLowerCase() as "free" | "pro" | "creator";
            const Icon = planIcons[planKey];
            const iconGradient = planIconColors[planKey];
            const price = billing === "monthly" ? plan.price.monthly : plan.price.yearly;
            const isHighlighted = "highlighted" in plan && plan.highlighted;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative rounded-3xl p-6 flex flex-col",
                  isHighlighted
                    ? "glass-card border-purple-500/30 ring-1 ring-purple-500/20"
                    : "glass-card"
                )}
              >
                {/* Popular badge */}
                {"badge" in plan && plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={cn(
                      "px-4 py-1 rounded-full text-xs font-bold text-white",
                      isHighlighted
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : "bg-gradient-to-r from-amber-500 to-orange-600"
                    )}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4",
                    iconGradient
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-white/50">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">
                      {price === 0 ? "Free" : `$${price}`}
                    </span>
                    {price > 0 && (
                      <span className="text-white/40 text-sm">
                        /{billing === "monthly" ? "mo" : "yr"}
                      </span>
                    )}
                  </div>
                  {billing === "yearly" && price > 0 && (
                    <p className="text-xs text-green-400 mt-1">
                      Save ${(plan.price.monthly * 12 - plan.price.yearly)} per year
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={price === 0 ? "/register" : `/checkout?plan=${planKey}&billing=${billing}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2",
                      isHighlighted
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25"
                        : "border border-white/15 text-white hover:bg-white/8 hover:border-white/25"
                    )}
                  >
                    {price === 0 ? "Get Started Free" : `Start ${plan.name}`}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-white/30 mt-8"
        >
          🔒 Secure payments via Stripe · Cancel anytime · No hidden fees
        </motion.p>
      </div>
    </section>
  );
}
