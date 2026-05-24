"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bell, Upload, Menu, X, Sparkles, ChevronDown,
  LogOut, Settings, User, LayoutDashboard, BookMarked, Zap,
  Trophy, Swords, BookOpen, Newspaper, Wrench, Gift, Star
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

const navLinks = [
  { href: "/explore", label: "Explore", icon: Sparkles },
  {
    label: "Discover",
    icon: Star,
    children: [
      { href: "/explore?sort=trending", label: "🔥 Trending", desc: "What's hot right now" },
      { href: "/explore?sort=mostCopied", label: "📋 Most Copied", desc: "Community favorites" },
      { href: "/explore?sort=popular", label: "⭐ Most Liked", desc: "Top rated prompts" },
      { href: "/leaderboard", label: "🏆 Leaderboard", desc: "Top creators" },
      { href: "/battles", label: "⚔️ Prompt Battles", desc: "Vote for the best" },
      { href: "/contests", label: "🎯 Contests", desc: "Win prizes" },
    ],
  },
  {
    label: "Create",
    icon: Zap,
    children: [
      { href: "/upload", label: "📤 Upload Prompt", desc: "Share your prompts" },
      { href: "/generate", label: "🤖 AI Generator", desc: "Generate with AI" },
      { href: "/collections", label: "📚 Collections", desc: "Organize prompts" },
    ],
  },
  {
    label: "More",
    icon: BookOpen,
    children: [
      { href: "/blog", label: "✍️ Blog", desc: "Tips & tutorials" },
      { href: "/news", label: "📰 AI News", desc: "Latest in AI" },
      { href: "/tools", label: "🛠️ AI Tools", desc: "Directory of AI tools" },
      { href: "/referral", label: "🎁 Referrals", desc: "Earn rewards" },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock user state — replace with real Supabase auth
  const user = null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "nav-blur shadow-lg shadow-black/20" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="font-bold text-lg gradient-text hidden sm:block">
                InstaPromptHub
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        "text-white/70 hover:text-white hover:bg-white/8",
                        openDropdown === link.label && "text-white bg-white/8"
                      )}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          openDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-56 glass-card rounded-xl overflow-hidden p-1.5 z-50"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all duration-150 group/item"
                            >
                              <span className="text-sm font-medium text-white group-hover/item:text-purple-300 transition-colors">
                                {child.label}
                              </span>
                              <span className="text-xs text-white/50 mt-0.5">{child.desc}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === link.href
                        ? "text-purple-400 bg-purple-500/10"
                        : "text-white/70 hover:text-white hover:bg-white/8"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <ThemeToggle />
              <LanguageSwitcher />

              {user ? (
                <>
                  {/* Notifications */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-background" />
                  </motion.button>

                  {/* User menu */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/8 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                        U
                      </div>
                    </button>
                    <div className="absolute right-0 top-full mt-2 w-52 glass-card rounded-xl p-1.5 hidden group-hover:block z-50">
                      <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all text-sm text-white/80 hover:text-white">
                        <LayoutDashboard className="w-4 h-4 text-purple-400" /> Dashboard
                      </Link>
                      <Link href="/collections" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all text-sm text-white/80 hover:text-white">
                        <BookMarked className="w-4 h-4 text-purple-400" /> Collections
                      </Link>
                      <Link href="/settings" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/8 transition-all text-sm text-white/80 hover:text-white">
                        <Settings className="w-4 h-4 text-purple-400" /> Settings
                      </Link>
                      <div className="h-px bg-white/8 my-1" />
                      <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-red-500/10 transition-all text-sm text-white/80 hover:text-red-400 w-full">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/8 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Upload CTA */}
              <Link
                href="/upload"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all"
              >
                <Upload className="w-4 h-4" />
                Upload
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden nav-blur border-t border-white/5"
            >
              <div className="px-4 py-4 space-y-1">
                <Link href="/explore" className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileOpen(false)}>
                  <Sparkles className="w-5 h-5 text-purple-400" /> Explore Prompts
                </Link>
                <Link href="/generate" className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileOpen(false)}>
                  <Zap className="w-5 h-5 text-purple-400" /> AI Generator
                </Link>
                <Link href="/leaderboard" className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileOpen(false)}>
                  <Trophy className="w-5 h-5 text-purple-400" /> Leaderboard
                </Link>
                <Link href="/battles" className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileOpen(false)}>
                  <Swords className="w-5 h-5 text-purple-400" /> Prompt Battles
                </Link>
                <Link href="/blog" className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileOpen(false)}>
                  <BookOpen className="w-5 h-5 text-purple-400" /> Blog
                </Link>
                <Link href="/news" className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileOpen(false)}>
                  <Newspaper className="w-5 h-5 text-purple-400" /> AI News
                </Link>
                <Link href="/tools" className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileOpen(false)}>
                  <Wrench className="w-5 h-5 text-purple-400" /> AI Tools
                </Link>
                <Link href="/referral" className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 transition-all" onClick={() => setMobileOpen(false)}>
                  <Gift className="w-5 h-5 text-purple-400" /> Referrals
                </Link>
                <div className="h-px bg-white/8 my-2" />
                {!user && (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1 py-3 text-center rounded-xl border border-white/10 text-white/80 hover:text-white hover:bg-white/8 transition-all text-sm font-medium" onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Link>
                    <Link href="/register" className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold" onClick={() => setMobileOpen(false)}>
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl glass-card rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                <Search className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search prompts, creators, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSearchOpen(false);
                    if (e.key === "Enter" && searchQuery) {
                      window.location.href = `/explore?search=${encodeURIComponent(searchQuery)}`;
                      setSearchOpen(false);
                    }
                  }}
                  className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-lg"
                />
                <button onClick={() => setSearchOpen(false)} className="p-1 rounded-lg hover:bg-white/8 transition-all">
                  <X className="w-4 h-4 text-white/50" />
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="px-5 py-4">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Trending Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Cinematic portrait", "Logo design", "Marketing copy", "Anime art", "ChatGPT business", "Midjourney fantasy"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        window.location.href = `/explore?search=${encodeURIComponent(s)}`;
                        setSearchOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 hover:border-purple-500/30 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-3">
                <p className="text-xs text-white/30">Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/50">Enter</kbd> to search · <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/50">Esc</kbd> to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
