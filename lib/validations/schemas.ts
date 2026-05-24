import { z } from "zod";

export const createPromptSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  description: z.string().max(500).optional(),
  content: z.string().min(10, "Prompt content must be at least 10 characters").max(10000),
  aiModel: z.enum([
    "CHATGPT", "GEMINI", "CLAUDE", "GROK", "MIDJOURNEY", "FLUX",
    "STABLE_DIFFUSION", "DALLE", "LEONARDO", "IDEOGRAM", "RUNWAY",
    "KLING", "SORA", "OTHER",
  ]),
  category: z.enum([
    "PORTRAIT", "CINEMATIC", "FASHION", "ANIME", "REALISTIC", "BUSINESS",
    "CODING", "MARKETING", "EDUCATION", "PRODUCTIVITY", "PHOTOGRAPHY",
    "ARCHITECTURE", "LOGO", "SOCIAL_MEDIA", "VIDEO_CREATION", "ART", "DESIGN", "OTHER",
  ]),
  tags: z.array(z.string()).max(10).optional(),
  isPremium: z.boolean(),
  price: z.number().min(0.99).max(999).optional(),
  previewImage: z.string().url().optional(),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(60),
  username: z.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and dashes"),
  bio: z.string().max(200).optional(),
  website: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  discordUrl: z.string().url().optional().or(z.literal("")),
  location: z.string().max(60).optional(),
});

export const createCollectionSchema = z.object({
  name: z.string().min(2).max(60),
  description: z.string().max(200).optional(),
  isPublic: z.boolean(),
});

export const commentSchema = z.object({
  content: z.string().min(2, "Comment must be at least 2 characters").max(1000),
  parentId: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().max(500).optional(),
});

export const reportSchema = z.object({
  reason: z.enum(["SPAM", "INAPPROPRIATE", "COPYRIGHT", "MISLEADING", "OTHER"]),
  details: z.string().max(500).optional(),
});

export const generatePromptSchema = z.object({
  idea: z.string().min(5, "Please describe your idea").max(500),
  aiModel: z.string().optional(),
  style: z.string().optional(),
  action: z.enum(["generate", "improve", "rewrite", "translate", "optimize", "expand"]),
  targetLanguage: z.string().optional(),
});
