"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const socialProviders = [
  { id: "google", label: "Continue with Google", icon: "🔵", color: "hover:bg-blue-500/10 hover:border-blue-500/30" },
  { id: "github", label: "Continue with GitHub", icon: "⚫", color: "hover:bg-white/10 hover:border-white/30" },
  { id: "discord", label: "Continue with Discord", icon: "🟣", color: "hover:bg-indigo-500/10 hover:border-indigo-500/30" },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [magicLink, setMagicLink] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    // TODO: supabase.auth.signInWithPassword({ email: data.email, password: data.password })
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  const onMagicLink = async (email: string) => {
    // TODO: supabase.auth.signInWithOtp({ email })
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };

  const onSocialLogin = async (provider: string) => {
    // TODO: supabase.auth.signInWithOAuth({ provider })
    console.log("Social login:", provider);
  };

  return (
    <div className="min-h-screen flex animated-gradient-bg">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex flex-col w-1/2 p-12 items-start justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />

        <Link href="/" className="flex items-center gap-2.5 z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">InstaPromptHub</span>
        </Link>

        <div className="z-10">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            The world&apos;s best<br />
            <span className="gradient-text">AI Prompt</span><br />
            Marketplace
          </h1>
          <p className="text-white/50 text-lg mb-8 leading-relaxed">
            Join 12,000+ creators discovering, sharing, and monetizing AI prompts.
          </p>
          <div className="flex flex-col gap-3">
            {["50K+ curated AI prompts", "14+ AI models supported", "Earn 80% on your prompt sales"].map((feat) => (
              <div key={feat} className="flex items-center gap-2.5 text-white/70">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3 h-3 text-purple-400" />
                </div>
                {feat}
              </div>
            ))}
          </div>
        </div>

        <div className="z-10 flex items-center gap-4 text-xs text-white/30">
          <span>© 2025 InstaPromptHub</span>
          <Link href="/privacy" className="hover:text-white/60">Privacy</Link>
          <Link href="/terms" className="hover:text-white/60">Terms</Link>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold gradient-text">InstaPromptHub</span>
          </Link>

          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-white/50 text-sm mb-8">Sign in to your account to continue</p>

          {/* Social Login */}
          <div className="space-y-2.5 mb-6">
            {socialProviders.map(({ id, label, icon, color }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSocialLogin(id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-white/10 text-white/80 hover:text-white text-sm font-medium transition-all",
                  color
                )}
              >
                <span className="text-lg">{icon}</span>
                {label}
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-white/30 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Toggle magic link */}
          <div className="flex items-center gap-2 mb-5">
            <button
              onClick={() => setMagicLink(false)}
              className={cn("text-sm font-medium transition-colors", !magicLink ? "text-white" : "text-white/40 hover:text-white/70")}
            >
              Password
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setMagicLink(true)}
              className={cn("text-sm font-medium transition-colors", magicLink ? "text-white" : "text-white/40 hover:text-white/70")}
            >
              Magic Link
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                />
              </div>
              {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email.message}</p>}
            </div>

            {!magicLink && (
              <div>
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3.5 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400 mt-1.5">{errors.password.message}</p>}
                <div className="flex justify-end mt-1.5">
                  <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={cn(
                "w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all mt-2",
                loading
                  ? "bg-white/10 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25"
              )}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {magicLink ? "Send Magic Link" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign up free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
