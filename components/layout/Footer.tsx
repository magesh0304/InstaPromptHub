"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, MessageCircle, Code, MessageSquare, Play,
  ArrowRight, Mail, Heart, ExternalLink
} from "lucide-react";

const footerLinks = {
  Platform: [
    { href: "/explore", label: "Explore Prompts" },
    { href: "/generate", label: "AI Generator" },
    { href: "/upload", label: "Upload Prompt" },
    { href: "/collections", label: "Collections" },
    { href: "/pricing", label: "Pricing" },
  ],
  Discover: [
    { href: "/explore?sort=trending", label: "Trending" },
    { href: "/explore?sort=mostCopied", label: "Most Copied" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/battles", label: "Prompt Battles" },
    { href: "/contests", label: "Contests" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/news", label: "AI News" },
    { href: "/tools", label: "AI Tools" },
    { href: "/referral", label: "Referral Program" },
    { href: "/affiliate", label: "Affiliate Dashboard" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact" },
  ],
};

const aiModels = [
  "ChatGPT", "Gemini", "Claude", "Grok", "Midjourney",
  "Flux", "DALL-E", "Stable Diffusion", "Leonardo AI",
  "Ideogram", "Runway", "Kling", "Sora",
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050510]">
      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay ahead of the AI curve 🚀
              </h3>
              <p className="text-white/50 text-sm">
                Get the best prompts, tutorials, and AI news delivered weekly.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold flex items-center gap-2 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">InstaPromptHub</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              The world&apos;s best AI prompt marketplace. Discover, share, and monetize prompts for every AI model.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: MessageCircle, href: "https://twitter.com/instapromhub", label: "Twitter" },
                { icon: Code, href: "https://github.com/instapromhub", label: "GitHub" },
                { icon: MessageSquare, href: "https://discord.gg/instapromhub", label: "Discord" },
                { icon: Play, href: "https://youtube.com/@instapromhub", label: "YouTube" },
                { icon: Mail, href: "mailto:hello@instapromhub.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AI Models */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs font-medium text-white/30 uppercase tracking-wider mb-4">Supported AI Models</p>
          <div className="flex flex-wrap gap-2">
            {aiModels.map((model) => (
              <Link
                key={model}
                href={`/explore?aiModel=${model.toUpperCase().replace(/\s/g, "_")}`}
                className="px-3 py-1 rounded-full text-xs text-white/40 border border-white/8 hover:text-white/70 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all"
              >
                {model}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} InstaPromptHub. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for the AI community
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
              Sitemap <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
