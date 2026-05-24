import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart, Eye, Copy, Bookmark, Share2, Zap, Star,
  Lock, Flag, ArrowLeft, ExternalLink, MessageSquare,
  ChevronRight, BadgeCheck
} from "lucide-react";
import { AI_MODEL_LABELS, AI_MODEL_COLORS, CATEGORY_LABELS } from "@/types";
import { formatNumber, formatRelativeTime } from "@/lib/utils";

// Placeholder — replace with real DB fetch
async function getPrompt(slug: string) {
  // TODO: prisma.prompt.findUnique({ where: { slug }, include: { creator: true, tags: true } })
  return {
    id: "1",
    slug,
    title: "Ultra Cinematic Portrait Master",
    description: "Generate stunning, hyper-realistic cinematic portraits with professional film aesthetics. Perfect for creating dramatic editorial photos, character portraits, and atmospheric scenes.",
    content: `Create a hyper-realistic cinematic portrait of [SUBJECT DESCRIPTION], following these specifications:

**Technical Settings:**
- Shot on ARRI Alexa with 85mm anamorphic lens
- Aperture: f/1.4 for extreme shallow depth of field
- ISO: 800 with natural film grain

**Lighting:**
- Golden hour side lighting (warm amber tones)
- Subtle rim light from the opposite side
- Soft diffused fill light

**Style:**
- Color graded like Christopher Nolan's films (teal and orange palette)
- Film noir inspired shadows
- Cinematic letterbox format (2.39:1 aspect ratio)

**Mood:**
- Emotional and contemplative
- Epic and cinematic scale
- [ADD SPECIFIC MOOD/EMOTION]

**Additional details:**
- Bokeh background with city lights
- Subtle lens flare for authenticity
- Sharp focus on eyes`,
    aiModel: "MIDJOURNEY" as const,
    category: "PORTRAIT" as const,
    status: "PUBLISHED" as const,
    previewImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=900&fit=crop",
    isPremium: false,
    price: undefined,
    creatorId: "u1",
    viewCount: 12400,
    likeCount: 2890,
    copyCount: 4200,
    bookmarkCount: 1200,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date(),
    creator: {
      id: "u1", userId: "u1", username: "visualalchemy",
      displayName: "Visual Alchemy", isVerified: true,
      totalViews: 1200000, totalEarnings: 0,
      bio: "Professional photographer turned AI artist. Creating cinematic prompts since 2022.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
      createdAt: new Date(), updatedAt: new Date(),
    },
    tags: [
      { id: "t1", name: "cinematic", slug: "cinematic" },
      { id: "t2", name: "portrait", slug: "portrait" },
      { id: "t3", name: "realism", slug: "realism" },
      { id: "t4", name: "photography", slug: "photography" },
      { id: "t5", name: "film", slug: "film" },
    ],
    rating: 4.9,
    reviewCount: 142,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const prompt = await getPrompt(slug);
  if (!prompt) return { title: "Prompt Not Found" };
  return {
    title: prompt.title,
    description: prompt.description,
    openGraph: {
      title: prompt.title,
      description: prompt.description || "",
      images: prompt.previewImage ? [{ url: prompt.previewImage, width: 800, height: 900 }] : [],
    },
  };
}

export default async function PromptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prompt = await getPrompt(slug);
  if (!prompt) notFound();

  const modelLabel = AI_MODEL_LABELS[prompt.aiModel];
  const modelColor = AI_MODEL_COLORS[prompt.aiModel];
  const categoryLabel = CATEGORY_LABELS[prompt.category];

  const generateUrls = [
    { label: "ChatGPT", url: `https://chat.openai.com/?q=${encodeURIComponent(prompt.content.slice(0, 200))}`, icon: "💬" },
    { label: "Gemini", url: `https://gemini.google.com/`, icon: "✨" },
    { label: "Claude", url: `https://claude.ai/`, icon: "🤖" },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/explore" className="hover:text-white/70 transition-colors">Explore</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white/60 truncate">{prompt.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image + Actions */}
          <div className="lg:col-span-1 space-y-4">
            {/* Preview */}
            {prompt.previewImage && (
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={prompt.previewImage}
                  alt={prompt.title}
                  width={800}
                  height={900}
                  className="w-full object-cover"
                  priority
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`badge-model bg-gradient-to-r text-white text-[10px] ${modelColor}`}>
                    {modelLabel}
                  </span>
                  {prompt.isPremium && (
                    <span className="badge-model badge-premium flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-white" /> PRO
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="glass-card rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Eye, label: "Views", value: formatNumber(prompt.viewCount), color: "text-blue-400" },
                  { icon: Heart, label: "Likes", value: formatNumber(prompt.likeCount), color: "text-pink-400" },
                  { icon: Copy, label: "Copies", value: formatNumber(prompt.copyCount), color: "text-green-400" },
                  { icon: Bookmark, label: "Saves", value: formatNumber(prompt.bookmarkCount), color: "text-purple-400" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="text-center p-3 rounded-xl bg-white/3">
                    <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
                    <div className={`text-lg font-bold ${color}`}>{value}</div>
                    <div className="text-xs text-white/40">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator Card */}
            <div className="glass-card rounded-2xl p-4">
              <Link href={`/creator/${prompt.creator.username}`} className="flex items-center gap-3 group mb-4">
                <Image
                  src={prompt.creator.avatar!}
                  alt={prompt.creator.displayName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white text-sm group-hover:text-purple-300 transition-colors">
                      {prompt.creator.displayName}
                    </span>
                    {prompt.creator.isVerified && (
                      <BadgeCheck className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                  <p className="text-xs text-white/40">@{prompt.creator.username}</p>
                </div>
              </Link>
              <p className="text-xs text-white/50 mb-4">{prompt.creator.bio}</p>
              <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all">
                Follow Creator
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + Meta */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  {categoryLabel}
                </span>
                <span className="text-xs text-white/30">
                  {formatRelativeTime(prompt.createdAt)}
                </span>
                {prompt.rating && (
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-white">{prompt.rating}</span>
                    <span className="text-xs text-white/40">({prompt.reviewCount})</span>
                  </div>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{prompt.title}</h1>
              <p className="text-white/60 leading-relaxed">{prompt.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <Link key={tag.id} href={`/explore?tag=${tag.slug}`}
                  className="px-3 py-1 rounded-full text-xs border border-white/10 text-white/50 hover:text-purple-300 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all">
                  #{tag.name}
                </Link>
              ))}
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap gap-3">
              {prompt.isPremium ? (
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-400 hover:to-orange-500 transition-all">
                  <Lock className="w-4 h-4" />
                  Unlock for ${prompt.price}
                </button>
              ) : (
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all">
                  <Copy className="w-4 h-4" />
                  Copy Prompt
                </button>
              )}
              <button className="px-5 py-3.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition-all flex items-center gap-2">
                <Bookmark className="w-4 h-4" /> Save
              </button>
              <button className="px-5 py-3.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition-all flex items-center gap-2">
                <Heart className="w-4 h-4" /> Like
              </button>
              <button className="px-5 py-3.5 rounded-xl border border-white/15 text-white hover:bg-white/5 transition-all flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Generate in AI tools */}
            <div className="glass-card rounded-2xl p-4">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Generate in your AI tool</p>
              <div className="flex flex-wrap gap-2">
                {generateUrls.map(({ label, url, icon }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all text-sm">
                    <span>{icon}</span>
                    {label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
                <Link href={`/generate?promptId=${prompt.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-all text-sm">
                  <Zap className="w-4 h-4" />
                  AI Generator
                </Link>
              </div>
            </div>

            {/* Prompt Content */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">Prompt Content</h2>
                {prompt.isPremium && (
                  <span className="flex items-center gap-1.5 text-xs text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>

              <div className={`relative ${prompt.isPremium ? "select-none" : ""}`}>
                <pre className={`whitespace-pre-wrap text-sm text-white/70 leading-relaxed font-mono prose-dark ${prompt.isPremium ? "blur-sm pointer-events-none" : ""}`}>
                  {prompt.content}
                </pre>

                {prompt.isPremium && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-card rounded-xl p-5 text-center max-w-xs">
                      <Lock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                      <p className="text-white font-semibold mb-1">Premium Prompt</p>
                      <p className="text-white/50 text-sm mb-4">Unlock this prompt to see the full content</p>
                      <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold">
                        Unlock for ${prompt.price}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Report */}
            <div className="flex justify-end">
              <button className="flex items-center gap-1.5 text-xs text-white/20 hover:text-red-400 transition-colors">
                <Flag className="w-3.5 h-3.5" /> Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
