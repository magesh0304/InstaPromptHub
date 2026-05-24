import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck, Globe, MessageCircle, Code, MapPin, Users,
  Sparkles, Eye, DollarSign, Grid3X3, Heart, BookMarked
} from "lucide-react";
import { PromptCard } from "@/components/prompts/PromptCard";
import { formatNumber } from "@/lib/utils";
import type { Prompt } from "@/types";

async function getCreator(username: string) {
  // TODO: prisma.profile.findUnique({ where: { username }, include: { ... } })
  return {
    username,
    displayName: "Visual Alchemy",
    bio: "Professional photographer turned AI artist. Creating stunning cinematic prompts since 2022. Specialized in Midjourney, Flux, and Stable Diffusion.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop",
    coverBanner: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&h=400&fit=crop",
    website: "https://visualalchemy.art",
    twitterUrl: "https://twitter.com/visualalchemy",
    githubUrl: "https://github.com/visualalchemy",
    location: "San Francisco, CA",
    isVerified: true,
    totalViews: 1200000,
    totalEarnings: 8420,
    _count: { followers: 8900, following: 234, prompts: 142 },
  };
}

const mockCreatorPrompts: Prompt[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 100),
  slug: `creator-prompt-${i}`,
  title: ["Cinematic Portrait Master", "Golden Hour Magic", "Moody Film Noir", "Neon Cyberpunk City"][i % 4],
  content: "Sample prompt...",
  aiModel: "MIDJOURNEY" as const,
  category: "PORTRAIT" as const,
  status: "PUBLISHED" as const,
  previewImage: [
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=450&fit=crop",
  ][i % 4],
  isPremium: i % 3 === 0,
  price: i % 3 === 0 ? 4.99 : undefined,
  creatorId: "u1",
  viewCount: Math.floor(Math.random() * 20000) + 1000,
  likeCount: Math.floor(Math.random() * 5000) + 100,
  copyCount: Math.floor(Math.random() * 8000) + 200,
  bookmarkCount: Math.floor(Math.random() * 2000) + 50,
  createdAt: new Date(Date.now() - i * 86400000 * 7),
  updatedAt: new Date(),
  creator: {
    id: "u1", userId: "u1", username: "visualalchemy",
    displayName: "Visual Alchemy", isVerified: true,
    totalViews: 1200000, totalEarnings: 0,
    createdAt: new Date(), updatedAt: new Date(),
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop",
  },
  tags: [{ id: "t1", name: "cinematic", slug: "cinematic" }],
}));

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  const creator = await getCreator(username);
  return {
    title: `${creator.displayName} (@${creator.username})`,
    description: creator.bio,
    openGraph: {
      title: `${creator.displayName} — InstaPromptHub Creator`,
      description: creator.bio,
      images: creator.avatar ? [{ url: creator.avatar }] : [],
    },
  };
}

export default async function CreatorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const creator = await getCreator(username);
  if (!creator) notFound();

  const tabs = ["Prompts", "Collections", "Liked", "Saved"];

  return (
    <div className="min-h-screen">
      {/* Cover Banner */}
      <div className="relative h-48 md:h-64">
        {creator.coverBanner ? (
          <Image
            src={creator.coverBanner}
            alt={`${creator.displayName} cover`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 animated-gradient-bg" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Image
                src={creator.avatar}
                alt={creator.displayName}
                width={96}
                height={96}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-background shadow-xl"
              />
              {creator.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-background shadow-lg">
                  <BadgeCheck className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-white">{creator.displayName}</h1>
                    {creator.isVerified && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm">@{creator.username}</p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Follow
                  </button>
                  <button className="px-4 py-2.5 rounded-xl border border-white/15 text-white/70 text-sm hover:bg-white/5 hover:text-white transition-all">
                    Message
                  </button>
                  <button className="px-4 py-2.5 rounded-xl border border-white/15 text-white/70 text-sm hover:bg-white/5 hover:text-white transition-all">
                    Share
                  </button>
                </div>
              </div>

              <p className="text-white/60 text-sm mt-3 max-w-2xl">{creator.bio}</p>

              {/* Meta links */}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                {creator.location && (
                  <span className="flex items-center gap-1.5 text-xs text-white/40">
                    <MapPin className="w-3.5 h-3.5" /> {creator.location}
                  </span>
                )}
                {creator.website && (
                  <a href={creator.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
                {creator.twitterUrl && (
                  <a href={creator.twitterUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> Twitter
                  </a>
                )}
                {creator.githubUrl && (
                  <a href={creator.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
                    <Code className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
            {[
              { label: "Prompts", value: creator._count.prompts, icon: Sparkles, color: "text-purple-400" },
              { label: "Followers", value: creator._count.followers, icon: Users, color: "text-pink-400" },
              { label: "Following", value: creator._count.following, icon: Users, color: "text-blue-400" },
              { label: "Total Views", value: creator.totalViews, icon: Eye, color: "text-cyan-400" },
              { label: "Earnings", value: creator.totalEarnings, icon: DollarSign, color: "text-amber-400", isMonetary: true },
            ].map(({ label, value, icon: Icon, color, isMonetary }) => (
              <div key={label} className="glass-card rounded-xl p-3.5 text-center">
                <Icon className={`w-4 h-4 ${color} mx-auto mb-1.5`} />
                <div className={`text-xl font-bold ${color}`}>
                  {isMonetary ? "$" : ""}{formatNumber(value)}
                </div>
                <div className="text-xs text-white/40">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-white/5 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-all ${tab === "Prompts" ? "text-white border-purple-500" : "text-white/40 border-transparent hover:text-white/70"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Prompt Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 pb-16">
          {mockCreatorPrompts.map((prompt, i) => (
            <PromptCard key={prompt.id} prompt={prompt} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
