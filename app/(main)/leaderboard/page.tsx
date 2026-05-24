"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trophy, TrendingUp, Sparkles, Users, Eye, BadgeCheck, DollarSign } from "lucide-react";
import { formatNumber, getInitials, generateAvatarColor, cn } from "@/lib/utils";

const mockLeaderboard = Array.from({ length: 50 }, (_, i) => ({
  rank: i + 1,
  username: `creator_${i + 1}`,
  displayName: [
    "Visual Alchemy", "Prompt Wizard", "Anime Master", "Code Guru", "Design Pro",
    "Film Craft", "Crypto Gen", "Marketing Pro", "Edu Bot", "Social Star"
  ][i % 10] + (i > 9 ? ` ${i + 1}` : ""),
  avatar: i % 3 === 0 ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" : undefined,
  isVerified: i % 4 === 0,
  score: Math.floor(100000 / (i + 1)) + Math.floor(Math.random() * 5000),
  promptCount: Math.floor(1000 / (i + 1)) + 5,
  followers: Math.floor(50000 / (i + 1)),
  totalViews: Math.floor(5000000 / (i + 1)),
  trend: i < 3 ? "up" : i % 5 === 0 ? "down" : "same",
}));

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/20 text-amber-400 text-sm mb-4">
            <Trophy className="w-4 h-4" />
            Top Creators Global
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Creator <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Discover the most influential prompt engineers on the platform, ranked by total impact, sales, and community engagement.
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-12 mt-20 md:mt-32">
          {[mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]].map((creator, i) => {
            const isFirst = i === 1;
            const rank = isFirst ? 1 : i === 0 ? 2 : 3;
            const heightClass = isFirst ? "h-64" : i === 0 ? "h-48" : "h-40";
            const colorClass = isFirst ? "from-amber-400 to-orange-500" : i === 0 ? "from-gray-300 to-gray-500" : "from-amber-700 to-amber-900";

            return (
              <motion.div
                key={creator.username}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={cn("w-full md:w-1/3 flex flex-col items-center relative", isFirst ? "z-10" : "z-0")}
              >
                {/* Avatar floating above podium */}
                <Link href={`/creator/${creator.username}`} className="absolute -top-16 md:-top-24 flex flex-col items-center group">
                  {isFirst && <Trophy className="w-8 h-8 text-amber-400 mb-2 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />}
                  <div className="relative">
                    {creator.avatar ? (
                      <Image src={creator.avatar} alt={creator.displayName} width={isFirst ? 96 : 80} height={isFirst ? 96 : 80}
                        className={cn("rounded-full object-cover ring-4 ring-background shadow-xl group-hover:scale-105 transition-transform", isFirst ? "w-24 h-24" : "w-20 h-20")} />
                    ) : (
                      <div className={cn(`rounded-full bg-gradient-to-br ${generateAvatarColor(creator.displayName)} flex items-center justify-center text-white font-bold ring-4 ring-background shadow-xl group-hover:scale-105 transition-transform`, isFirst ? "w-24 h-24 text-2xl" : "w-20 h-20 text-xl")}>
                        {getInitials(creator.displayName)}
                      </div>
                    )}
                    {creator.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-background">
                        <BadgeCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <p className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">{creator.displayName}</p>
                    <p className="text-white/40 text-sm">@{creator.username}</p>
                  </div>
                </Link>

                {/* Podium Block */}
                <div className={cn("w-full rounded-t-2xl bg-gradient-to-t flex flex-col items-center pt-8 border-t border-l border-r border-white/20 mt-24 md:mt-0", heightClass, colorClass, "opacity-90")}>
                  <span className="text-4xl font-black text-white/30 drop-shadow-md">#{rank}</span>
                  <div className="mt-auto pb-4 text-center">
                    <p className="text-white font-bold">{formatNumber(creator.score)} pts</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full List */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Creator</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-white/40 uppercase tracking-wider">Impact Score</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-white/40 uppercase tracking-wider hidden sm:table-cell">Prompts</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-white/40 uppercase tracking-wider hidden md:table-cell">Followers</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-white/40 uppercase tracking-wider hidden lg:table-cell">Total Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockLeaderboard.slice(3).map((creator) => (
                  <motion.tr
                    key={creator.username}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-white/30 w-8">{creator.rank}</span>
                        {creator.trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                        {creator.trend === "down" && <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />}
                        {creator.trend === "same" && <div className="w-4 h-0.5 bg-white/20" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/creator/${creator.username}`} className="flex items-center gap-3">
                        {creator.avatar ? (
                          <Image src={creator.avatar} alt={creator.displayName} width={40} height={40} className="rounded-full object-cover" />
                        ) : (
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${generateAvatarColor(creator.displayName)} flex items-center justify-center text-white text-xs font-bold`}>
                            {getInitials(creator.displayName)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-white text-sm group-hover:text-purple-300 transition-colors">{creator.displayName}</span>
                            {creator.isVerified && <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />}
                          </div>
                          <span className="text-xs text-white/40">@{creator.username}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-amber-400">{formatNumber(creator.score)}</span>
                    </td>
                    <td className="px-6 py-4 text-right hidden sm:table-cell">
                      <span className="text-white/70 flex items-center justify-end gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        {creator.promptCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right hidden md:table-cell">
                      <span className="text-white/70 flex items-center justify-end gap-1.5">
                        <Users className="w-3.5 h-3.5 text-pink-400" />
                        {formatNumber(creator.followers)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right hidden lg:table-cell">
                      <span className="text-white/70 flex items-center justify-end gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        {formatNumber(creator.totalViews)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 text-center">
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
