"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart, Eye, Copy, Bookmark, Share2, Zap,
  Star, Lock, MoreHorizontal, Flag
} from "lucide-react";
import { useState } from "react";
import { cn, formatNumber, getInitials, generateAvatarColor, truncate } from "@/lib/utils";
import { AI_MODEL_LABELS, AI_MODEL_COLORS, type Prompt } from "@/types";

interface PromptCardProps {
  prompt: Prompt;
  index?: number;
}

export function PromptCard({ prompt, index = 0 }: PromptCardProps) {
  const [liked, setLiked] = useState(prompt.isLiked || false);
  const [bookmarked, setBookmarked] = useState(prompt.isBookmarked || false);
  const [likeCount, setLikeCount] = useState(prompt.likeCount);
  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const modelLabel = AI_MODEL_LABELS[prompt.aiModel];
  const modelColor = AI_MODEL_COLORS[prompt.aiModel];
  const creatorName = prompt.creator?.displayName || "Unknown";
  const creatorAvatar = prompt.creator?.avatar;
  const initials = getInitials(creatorName);
  const avatarGradient = generateAvatarColor(creatorName);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    // TODO: call server action
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
    // TODO: call server action
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // TODO: call server action for copy count
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: prompt.title,
        text: prompt.description || prompt.title,
        url: `${window.location.origin}/prompt/${prompt.slug}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/prompt/${prompt.slug}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group prompt-card glass-card mb-4 break-inside-avoid"
    >
      <Link href={`/prompt/${prompt.slug}`} className="block">
        {/* Preview Image */}
        {prompt.previewImage ? (
          <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20">
            <Image
              src={prompt.previewImage}
              alt={prompt.title}
              width={400}
              height={300}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick actions on hover */}
            <div className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-white/90 text-gray-900 hover:bg-white"
                )}
              >
                <Copy className="w-3 h-3" />
                {copied ? "Copied!" : "Copy"}
              </motion.button>
              <Link
                href={`/generate?prompt=${prompt.id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/90 text-white hover:bg-purple-500 transition-all"
              >
                <Zap className="w-3 h-3" />
                Generate
              </Link>
            </div>

            {/* Badges on image */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className={cn(
                "badge-model bg-gradient-to-r text-white text-[10px]",
                modelColor
              )}>
                {modelLabel}
              </span>
              {prompt.isPremium && (
                <span className="badge-model badge-premium flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-white" />
                  PRO
                </span>
              )}
            </div>
          </div>
        ) : (
          /* No image — text card */
          <div className="relative p-5 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 rounded-t-2xl min-h-[120px] flex flex-col justify-between">
            <div className="flex items-center gap-1.5 mb-3">
              <span className={cn("badge-model bg-gradient-to-r text-white text-[10px]", modelColor)}>
                {modelLabel}
              </span>
              {prompt.isPremium && (
                <span className="badge-model badge-premium flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-white" /> PRO
                </span>
              )}
            </div>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-3 font-mono text-[13px]">
              {truncate(prompt.content, 120)}
            </p>
          </div>
        )}

        {/* Card Body */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {prompt.title}
          </h3>

          {/* Tags */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {prompt.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/50 hover:text-purple-300 hover:border-purple-500/30 transition-all"
                >
                  #{tag.name}
                </span>
              ))}
              {prompt.tags.length > 3 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/40">
                  +{prompt.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Creator */}
          <div className="flex items-center justify-between">
            <Link
              href={`/creator/${prompt.creator?.username || ""}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 group/creator"
            >
              {creatorAvatar ? (
                <Image
                  src={creatorAvatar}
                  alt={creatorName}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className={cn(
                  "w-6 h-6 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-[10px] font-bold",
                  avatarGradient
                )}>
                  {initials}
                </div>
              )}
              <span className="text-xs text-white/50 group-hover/creator:text-white/80 transition-colors">
                {prompt.creator?.username || "unknown"}
                {prompt.creator?.isVerified && (
                  <span className="ml-1 text-blue-400">✓</span>
                )}
              </span>
            </Link>

            {/* Price */}
            {prompt.isPremium && prompt.price && (
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                ${prompt.price}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Action Bar */}
      <div className="px-4 pb-4 flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-3">
          {/* Like */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1 text-xs transition-all",
              liked ? "text-pink-400" : "text-white/40 hover:text-pink-400"
            )}
            aria-label="Like prompt"
          >
            <Heart className={cn("w-4 h-4", liked && "fill-pink-400")} />
            <span>{formatNumber(likeCount)}</span>
          </motion.button>

          {/* Views */}
          <div className="flex items-center gap-1 text-xs text-white/30">
            <Eye className="w-4 h-4" />
            <span>{formatNumber(prompt.viewCount)}</span>
          </div>

          {/* Copies */}
          <div className="flex items-center gap-1 text-xs text-white/30">
            <Copy className="w-4 h-4" />
            <span>{formatNumber(prompt.copyCount)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleBookmark}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              bookmarked
                ? "text-purple-400 bg-purple-500/10"
                : "text-white/30 hover:text-purple-400 hover:bg-purple-500/10"
            )}
            aria-label="Bookmark prompt"
          >
            <Bookmark className={cn("w-4 h-4", bookmarked && "fill-purple-400")} />
          </motion.button>

          {/* Share */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleShare}
            className="p-1.5 rounded-lg text-white/30 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
            aria-label="Share prompt"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
