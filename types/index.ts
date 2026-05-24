// TypeScript types for InstaPromptHub

export type AIModel =
  | "CHATGPT" | "GEMINI" | "CLAUDE" | "GROK"
  | "MIDJOURNEY" | "FLUX" | "STABLE_DIFFUSION" | "DALLE"
  | "LEONARDO" | "IDEOGRAM" | "RUNWAY" | "KLING" | "SORA" | "OTHER";

export type PromptCategory =
  | "PORTRAIT" | "CINEMATIC" | "FASHION" | "ANIME" | "REALISTIC"
  | "BUSINESS" | "CODING" | "MARKETING" | "EDUCATION" | "PRODUCTIVITY"
  | "PHOTOGRAPHY" | "ARCHITECTURE" | "LOGO" | "SOCIAL_MEDIA"
  | "VIDEO_CREATION" | "ART" | "DESIGN" | "OTHER";

export type PromptStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED" | "ARCHIVED";
export type UserRole = "USER" | "CREATOR" | "ADMIN";
export type SubscriptionPlan = "FREE" | "PRO" | "CREATOR";
export type SubscriptionStatus = "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile?: Profile;
  subscription?: Subscription;
  createdAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  coverBanner?: string;
  website?: string;
  twitterUrl?: string;
  githubUrl?: string;
  discordUrl?: string;
  location?: string;
  isVerified: boolean;
  totalViews: number;
  totalEarnings: number;
  _count?: {
    followers: number;
    following: number;
    prompts: number;
  };
}

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description?: string;
  content: string;
  aiModel: AIModel;
  category: PromptCategory;
  status: PromptStatus;
  previewImage?: string;
  isPremium: boolean;
  price?: number;
  creatorId: string;
  viewCount: number;
  likeCount: number;
  copyCount: number;
  bookmarkCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  creator?: Profile;
  tags?: Tag[];
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  userId: string;
  promptId: string;
  content: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: Profile;
  replies?: Comment[];
}

export interface Review {
  id: string;
  userId: string;
  promptId: string;
  rating: number;
  content?: string;
  createdAt: Date;
  user?: Profile;
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  coverImage?: string;
  createdAt: Date;
  _count?: { items: number };
  user?: Profile;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body?: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodEnd?: Date;
}

export interface Earning {
  id: string;
  userId: string;
  promptId?: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  paidOut: boolean;
  createdAt: Date;
}

// UI / Filter types
export interface PromptFilters {
  aiModel?: AIModel | "ALL";
  category?: PromptCategory | "ALL";
  sort?: "latest" | "popular" | "trending" | "mostCopied" | "mostLiked";
  search?: string;
  isPremium?: boolean;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Stripe
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: { monthly: number; yearly: number };
  priceId: { monthly: string; yearly: string };
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

// Blog
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  authorId: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
}

// AI Tool
export interface AITool {
  id: string;
  name: string;
  slug: string;
  description?: string;
  website: string;
  logoUrl?: string;
  category: string;
  isFeatured: boolean;
}

export const AI_MODEL_LABELS: Record<AIModel, string> = {
  CHATGPT: "ChatGPT",
  GEMINI: "Gemini",
  CLAUDE: "Claude",
  GROK: "Grok",
  MIDJOURNEY: "Midjourney",
  FLUX: "Flux",
  STABLE_DIFFUSION: "Stable Diffusion",
  DALLE: "DALL-E",
  LEONARDO: "Leonardo AI",
  IDEOGRAM: "Ideogram",
  RUNWAY: "Runway",
  KLING: "Kling",
  SORA: "Sora",
  OTHER: "Other",
};

export const AI_MODEL_COLORS: Record<AIModel, string> = {
  CHATGPT: "from-green-500 to-teal-600",
  GEMINI: "from-blue-500 to-indigo-600",
  CLAUDE: "from-orange-500 to-amber-600",
  GROK: "from-gray-500 to-zinc-600",
  MIDJOURNEY: "from-indigo-500 to-violet-600",
  FLUX: "from-fuchsia-500 to-pink-600",
  STABLE_DIFFUSION: "from-purple-500 to-violet-600",
  DALLE: "from-rose-500 to-pink-600",
  LEONARDO: "from-yellow-500 to-orange-600",
  IDEOGRAM: "from-sky-500 to-blue-600",
  RUNWAY: "from-lime-500 to-green-600",
  KLING: "from-red-500 to-rose-600",
  SORA: "from-cyan-500 to-sky-600",
  OTHER: "from-gray-500 to-slate-600",
};

export const CATEGORY_LABELS: Record<PromptCategory, string> = {
  PORTRAIT: "Portrait",
  CINEMATIC: "Cinematic",
  FASHION: "Fashion",
  ANIME: "Anime",
  REALISTIC: "Realistic",
  BUSINESS: "Business",
  CODING: "Coding",
  MARKETING: "Marketing",
  EDUCATION: "Education",
  PRODUCTIVITY: "Productivity",
  PHOTOGRAPHY: "Photography",
  ARCHITECTURE: "Architecture",
  LOGO: "Logo",
  SOCIAL_MEDIA: "Social Media",
  VIDEO_CREATION: "Video Creation",
  ART: "Art",
  DESIGN: "Design",
  OTHER: "Other",
};
