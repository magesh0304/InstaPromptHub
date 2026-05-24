"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { createPromptSchema } from "@/lib/validations/schemas";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PromptFilters } from "@/types";

export async function getPrompts(filters: PromptFilters = {}) {
  const { aiModel, category, sort, search, isPremium, page = 1 } = filters;
  const pageSize = 20;

  const where: Record<string, unknown> = {
    status: "PUBLISHED",
    ...(aiModel && aiModel !== "ALL" && { aiModel }),
    ...(category && category !== "ALL" && { category }),
    ...(isPremium !== undefined && { isPremium }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: any = {
    latest: { createdAt: "desc" },
    popular: { viewCount: "desc" },
    trending: { copyCount: "desc" },
    mostCopied: { copyCount: "desc" },
    mostLiked: { likeCount: "desc" },
  }[sort || "latest"] || { createdAt: "desc" };

  try {
    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          creator: {
            include: {
              profile: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      }),
      prisma.prompt.count({ where }),
    ]);

    const mappedPrompts = prompts.map((prompt: any) => ({
      ...prompt,
      creator: (prompt.creator as any)?.profile || undefined,
      tags: prompt.tags.map((t: any) => t.tag),
    })) as any;

    return {
      data: mappedPrompts,
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total,
    };
  } catch {
    return { data: [], total: 0, page, pageSize, hasMore: false };
  }
}

export async function createPrompt(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    aiModel: formData.get("aiModel") as string,
    category: formData.get("category") as string,
    isPremium: formData.get("isPremium") === "true",
    price: formData.get("price") ? parseFloat(formData.get("price") as string) : undefined,
  };

  const validation = createPromptSchema.safeParse(rawData);
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } });
  if (!dbUser) return { error: "User not found" };

  const slug = `${slugify(rawData.title)}-${Date.now().toString(36)}`;

  try {
    const prompt = await prisma.prompt.create({
      data: {
        slug,
        title: rawData.title,
        description: rawData.description,
        content: rawData.content,
        aiModel: rawData.aiModel as never,
        category: rawData.category as never,
        isPremium: rawData.isPremium,
        price: rawData.price,
        creatorId: dbUser.id,
        status: "PENDING",
      },
    });

    revalidatePath("/explore");
    return { success: true, slug: prompt.slug };
  } catch {
    return { error: "Failed to create prompt" };
  }
}

export async function likePrompt(promptId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } });
  if (!dbUser) return { error: "User not found" };

  try {
    const existing = await prisma.like.findUnique({
      where: { userId_promptId: { userId: dbUser.id, promptId } },
    });

    if (existing) {
      await prisma.like.delete({ where: { userId_promptId: { userId: dbUser.id, promptId } } });
      await prisma.prompt.update({ where: { id: promptId }, data: { likeCount: { decrement: 1 } } });
      return { liked: false };
    } else {
      await prisma.like.create({ data: { userId: dbUser.id, promptId } });
      await prisma.prompt.update({ where: { id: promptId }, data: { likeCount: { increment: 1 } } });
      return { liked: true };
    }
  } catch {
    return { error: "Failed to like prompt" };
  }
}

export async function bookmarkPrompt(promptId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } });
  if (!dbUser) return { error: "User not found" };

  try {
    const existing = await prisma.bookmark.findUnique({
      where: { userId_promptId: { userId: dbUser.id, promptId } },
    });

    if (existing) {
      await prisma.bookmark.delete({ where: { userId_promptId: { userId: dbUser.id, promptId } } });
      await prisma.prompt.update({ where: { id: promptId }, data: { bookmarkCount: { decrement: 1 } } });
      return { bookmarked: false };
    } else {
      await prisma.bookmark.create({ data: { userId: dbUser.id, promptId } });
      await prisma.prompt.update({ where: { id: promptId }, data: { bookmarkCount: { increment: 1 } } });
      return { bookmarked: true };
    }
  } catch {
    return { error: "Failed to bookmark" };
  }
}

export async function recordCopy(promptId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  try {
    await prisma.prompt.update({ where: { id: promptId }, data: { copyCount: { increment: 1 } } });
    if (user) {
      const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } });
      if (dbUser) await prisma.copy.create({ data: { userId: dbUser.id, promptId } });
    }
    return { success: true };
  } catch {
    return { error: "Failed to record copy" };
  }
}

export async function followUser(targetUserId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } });
  if (!dbUser) return { error: "User not found" };
  if (dbUser.id === targetUserId) return { error: "Cannot follow yourself" };

  try {
    const existing = await prisma.follower.findUnique({
      where: { followerId_followingId: { followerId: dbUser.id, followingId: targetUserId } },
    });

    if (existing) {
      await prisma.follower.delete({ where: { followerId_followingId: { followerId: dbUser.id, followingId: targetUserId } } });
      return { following: false };
    } else {
      await prisma.follower.create({ data: { followerId: dbUser.id, followingId: targetUserId } });
      return { following: true };
    }
  } catch {
    return { error: "Failed to follow user" };
  }
}
