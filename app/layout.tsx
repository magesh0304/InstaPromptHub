import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "InstaPromptHub — World's Best AI Prompt Marketplace",
    template: "%s | InstaPromptHub",
  },
  description:
    "Discover, share, and sell AI prompts for ChatGPT, Gemini, Claude, Midjourney, Flux, DALL-E, and 10+ AI models. The world's premium AI prompt marketplace.",
  keywords: [
    "AI prompts", "ChatGPT prompts", "Midjourney prompts", "Gemini prompts",
    "Claude prompts", "prompt marketplace", "AI art prompts", "buy sell prompts",
    "prompt engineering", "AI tools",
  ],
  authors: [{ name: "InstaPromptHub" }],
  creator: "InstaPromptHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "InstaPromptHub",
    title: "InstaPromptHub — World's Best AI Prompt Marketplace",
    description: "Discover thousands of powerful AI prompts for every model and use case.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "InstaPromptHub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaPromptHub — AI Prompt Marketplace",
    description: "Discover, share & sell AI prompts for ChatGPT, Midjourney, Gemini & more.",
    images: ["/og-default.png"],
    creator: "@instapromhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(20, 20, 40, 0.95)",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                color: "#fff",
                backdropFilter: "blur(16px)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
