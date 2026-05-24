"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Sparkles, TrendingUp, BadgeCheck } from "lucide-react";
import { formatNumber, getInitials, generateAvatarColor } from "@/lib/utils";

const mockCreators = [
  { username: "visualalchemy", displayName: "Visual Alchemy", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop", isVerified: true, promptCount: 142, followers: 8900, totalViews: 1200000, bio: "Cinematic & portrait prompts", speciality: "Midjourney" },
  { username: "promptwizard", displayName: "Prompt Wizard", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", isVerified: true, promptCount: 87, followers: 12400, totalViews: 890000, bio: "Business & productivity AI prompts", speciality: "ChatGPT" },
  { username: "animemaster", displayName: "Anime Master", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop", isVerified: false, promptCount: 203, followers: 15600, totalViews: 2100000, bio: "Anime & illustration prompts", speciality: "Flux" },
  { username: "codeguru", displayName: "Code Guru", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", isVerified: true, promptCount: 64, followers: 6700, totalViews: 540000, bio: "Developer-focused AI prompts", speciality: "Claude" },
  { username: "designpro", displayName: "Design Pro", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", isVerified: true, promptCount: 119, followers: 9200, totalViews: 780000, bio: "UI/UX & branding prompts", speciality: "DALL-E" },
  { username: "filmcraft", displayName: "Film Craft", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", isVerified: false, promptCount: 45, followers: 4100, totalViews: 320000, bio: "Video & cinematic prompts", speciality: "Runway" },
];

export function PopularCreators() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-medium text-pink-400">Top Creators</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Meet the <span className="gradient-text">Prompt Masters</span>
            </h2>
          </div>
          <Link href="/leaderboard" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
            View leaderboard <TrendingUp className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCreators.map((creator, i) => (
            <motion.div
              key={creator.username}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/creator/${creator.username}`}>
                <div className="glass-card rounded-2xl p-5 flex items-center gap-4 group cursor-pointer">
                  {/* Rank */}
                  <div className="text-2xl font-black text-white/10 group-hover:text-purple-500/30 transition-colors w-8 text-center flex-shrink-0">
                    #{i + 1}
                  </div>

                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {creator.avatar ? (
                      <Image
                        src={creator.avatar}
                        alt={creator.displayName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/10 group-hover:ring-purple-500/30 transition-all"
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${generateAvatarColor(creator.displayName)} flex items-center justify-center text-white font-bold`}>
                        {getInitials(creator.displayName)}
                      </div>
                    )}
                    {creator.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-background">
                        <BadgeCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white text-sm truncate group-hover:text-purple-300 transition-colors">
                        {creator.displayName}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 truncate mt-0.5">{creator.bio}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        {creator.promptCount} prompts
                      </span>
                      <span className="text-xs text-white/50 flex items-center gap-1">
                        <Users className="w-3 h-3 text-pink-400" />
                        {formatNumber(creator.followers)}
                      </span>
                    </div>
                  </div>

                  {/* Speciality badge */}
                  <div className="flex-shrink-0">
                    <span className="text-xs px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      {creator.speciality}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
