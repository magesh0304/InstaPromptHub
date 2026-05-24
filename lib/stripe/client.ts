import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2026-04-22.dahlia" as any,
  typescript: true,
});

export const PLANS = {
  FREE: {
    id: "free",
    name: "Free",
    description: "Get started with AI prompts",
    price: { monthly: 0, yearly: 0 },
    priceId: { monthly: "", yearly: "" },
    features: [
      "Browse all public prompts",
      "Save up to 20 prompts",
      "Basic search & filters",
      "Copy 10 prompts/day",
      "Community access",
    ],
  },
  PRO: {
    id: "pro",
    name: "Pro",
    description: "Unlock premium prompts & features",
    price: { monthly: 9, yearly: 79 },
    priceId: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "",
      yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID || "",
    },
    features: [
      "Unlimited prompt saves",
      "All premium prompts",
      "Advanced search & filters",
      "Unlimited collections",
      "Priority support",
      "No ads",
      "Early access to new features",
    ],
    highlighted: true,
    badge: "Most Popular",
  },
  CREATOR: {
    id: "creator",
    name: "Creator",
    description: "Sell your prompts & earn",
    price: { monthly: 19, yearly: 159 },
    priceId: {
      monthly: process.env.STRIPE_CREATOR_MONTHLY_PRICE_ID || "",
      yearly: process.env.STRIPE_CREATOR_YEARLY_PRICE_ID || "",
    },
    features: [
      "Everything in Pro",
      "Sell unlimited prompts",
      "Creator analytics dashboard",
      "Revenue sharing (80/20)",
      "Verification badge",
      "Creator storefront",
      "Affiliate program access",
      "Priority prompt review",
    ],
    badge: "Best Value",
  },
};

export async function createOrRetrieveCustomer(
  userId: string,
  email: string
): Promise<string> {
  const existing = await stripe.customers.search({
    query: `metadata['userId']:'${userId}'`,
    limit: 1,
  });

  if (existing.data.length > 0) return existing.data[0].id;

  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  return customer.id;
}
