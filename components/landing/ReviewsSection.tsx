"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { getInitials, generateAvatarColor } from "@/lib/utils";

const reviews = [
  { name: "Sarah Chen", role: "Digital Artist", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop", rating: 5, text: "InstaPromptHub completely transformed my workflow. The prompt quality here is miles ahead of anything else I've tried. My Midjourney results improved by 10x!", badge: "Verified Creator" },
  { name: "Marcus Johnson", role: "Startup Founder", rating: 5, text: "Found the perfect ChatGPT business prompts in minutes. Saved me weeks of trial and error. The categorization is brilliant.", badge: "Pro Member" },
  { name: "Priya Sharma", role: "AI Researcher", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop", rating: 5, text: "The generator tool is incredible. I input a rough idea and got a professionally engineered prompt instantly. The best AI tool I've used this year.", badge: "Creator Plan" },
  { name: "Alex Kim", role: "Content Creator", rating: 5, text: "Made $1,200 in my first month selling prompts here. The creator analytics are fantastic. Highly recommend to anyone who creates AI content.", badge: "Top Creator" },
  { name: "Lisa Thompson", role: "UX Designer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&fit=crop", rating: 5, text: "The masonry layout is gorgeous and discovery is so intuitive. I've bookmarked hundreds of prompts and the collection system keeps everything organized perfectly.", badge: "Pro Member" },
  { name: "Raj Patel", role: "Developer", rating: 5, text: "Claude coding prompts on here are next-level. Code review, debugging, architecture — there's a prompt for everything. Worth every penny of the Creator plan.", badge: "Verified Creator" },
];

export function ReviewsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-white/60 text-sm ml-2">4.9/5 from 10,000+ users</span>
          </div>
          <h2 className="section-heading text-white mb-3">
            Loved by <span className="gradient-text">creators worldwide</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col"
            >
              <Quote className="w-6 h-6 text-purple-400/50 mb-4 flex-shrink-0" />

              <p className="text-white/70 text-sm leading-relaxed flex-1 mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <Image src={review.avatar} alt={review.name} width={36} height={36}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10" />
                  ) : (
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${generateAvatarColor(review.name)} flex items-center justify-center text-white text-xs font-bold`}>
                      {getInitials(review.name)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-white/40">{review.role}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    {review.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
