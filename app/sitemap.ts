import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const staticPages = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "daily" as const },
    { url: `${baseUrl}/explore`, priority: 0.9, changeFrequency: "hourly" as const },
    { url: `${baseUrl}/generate`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/leaderboard`, priority: 0.7, changeFrequency: "daily" as const },
    { url: `${baseUrl}/battles`, priority: 0.7, changeFrequency: "daily" as const },
    { url: `${baseUrl}/contests`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: "daily" as const },
    { url: `${baseUrl}/news`, priority: 0.6, changeFrequency: "daily" as const },
    { url: `${baseUrl}/tools`, priority: 0.6, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/login`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/register`, priority: 0.5, changeFrequency: "monthly" as const },
  ];

  // AI model pages
  const aiModels = [
    "CHATGPT", "GEMINI", "CLAUDE", "GROK", "MIDJOURNEY",
    "FLUX", "STABLE_DIFFUSION", "DALLE", "LEONARDO", "IDEOGRAM",
    "RUNWAY", "KLING", "SORA",
  ];

  const modelPages = aiModels.map((model) => ({
    url: `${baseUrl}/explore?aiModel=${model}`,
    priority: 0.8,
    changeFrequency: "daily" as const,
  }));

  // Category pages
  const categories = [
    "PORTRAIT", "CINEMATIC", "FASHION", "ANIME", "REALISTIC",
    "BUSINESS", "CODING", "MARKETING", "EDUCATION", "PRODUCTIVITY",
    "PHOTOGRAPHY", "ARCHITECTURE", "LOGO", "SOCIAL_MEDIA",
    "VIDEO_CREATION", "ART", "DESIGN",
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/explore?category=${cat}`,
    priority: 0.7,
    changeFrequency: "daily" as const,
  }));

  return [...staticPages, ...modelPages, ...categoryPages];
}
