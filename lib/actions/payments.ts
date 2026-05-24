"use server";

import { stripe, createOrRetrieveCustomer, PLANS } from "@/lib/stripe/client";
import { prisma } from "@/lib/prisma/client";
import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function createCheckoutSession(
  planKey: "PRO" | "CREATOR",
  billing: "monthly" | "yearly"
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: { subscription: true },
  });
  if (!dbUser) redirect("/login");

  const plan = PLANS[planKey];
  const priceId = plan.priceId[billing];
  if (!priceId) throw new Error("Invalid plan or billing period");

  const customerId = await createOrRetrieveCustomer(dbUser.id, user.email!);

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${absoluteUrl("/dashboard")}?payment=success`,
    cancel_url: `${absoluteUrl("/pricing")}?payment=canceled`,
    metadata: {
      userId: dbUser.id,
      plan: planKey,
      billing,
    },
    subscription_data: {
      metadata: { userId: dbUser.id, plan: planKey },
    },
  });

  if (!session.url) throw new Error("Failed to create checkout session");
  redirect(session.url);
}

export async function createPortalSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { supabaseId: user.id },
    include: { subscription: true },
  });

  if (!dbUser?.subscription?.stripeCustomerId) {
    redirect("/pricing");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: dbUser.subscription.stripeCustomerId,
    return_url: absoluteUrl("/dashboard"),
  });

  redirect(session.url);
}

export async function createPromptPurchase(promptId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const prompt = await prisma.prompt.findUnique({ where: { id: promptId } });
  if (!prompt || !prompt.isPremium || !prompt.price) {
    throw new Error("Prompt not found or not premium");
  }

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } });
  if (!dbUser) redirect("/login");

  const customerId = await createOrRetrieveCustomer(dbUser.id, user.email!);

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        unit_amount: Math.round(prompt.price * 100),
        product_data: {
          name: prompt.title,
          description: `AI Prompt: ${prompt.title}`,
        },
      },
      quantity: 1,
    }],
    success_url: `${absoluteUrl(`/prompt/${prompt.slug}`)}?purchased=true`,
    cancel_url: absoluteUrl(`/prompt/${prompt.slug}`),
    metadata: {
      userId: dbUser.id,
      promptId: prompt.id,
      type: "prompt_purchase",
    },
  });

  if (!session.url) throw new Error("Failed to create payment session");
  redirect(session.url);
}
