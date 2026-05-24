"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard, FileText, Heart, BookMarked, TrendingUp,
  Eye, Copy, Star, DollarSign, Plus, BarChart3, Settings
} from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from "recharts";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "prompts", label: "My Prompts", icon: FileText },
  { id: "saved", label: "Saved", icon: BookMarked },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "earnings", label: "Earnings", icon: DollarSign },
];

const analyticsData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  views: Math.floor(Math.random() * 500) + 100,
  copies: Math.floor(Math.random() * 200) + 20,
  earnings: Math.random() * 50,
}));

const statCards = [
  { label: "Total Views", value: 124000, icon: Eye, color: "from-blue-500 to-cyan-600", trend: "+12%" },
  { label: "Total Likes", value: 8400, icon: Heart, color: "from-pink-500 to-rose-600", trend: "+8%" },
  { label: "Total Copies", value: 31200, icon: Copy, color: "from-green-500 to-teal-600", trend: "+24%" },
  { label: "Total Saves", value: 5600, icon: Star, color: "from-amber-500 to-orange-600", trend: "+5%" },
  { label: "Revenue", value: 1240, icon: DollarSign, color: "from-purple-500 to-violet-600", trend: "+31%", isMonetary: true },
  { label: "Followers", value: 2890, icon: TrendingUp, color: "from-indigo-500 to-purple-600", trend: "+18%" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/50 text-sm mt-1">Welcome back! Here&apos;s your performance overview.</p>
          </div>
          <motion.a
            href="/upload"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
          >
            <Plus className="w-4 h-4" />
            New Prompt
          </motion.a>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white/3 border border-white/8 rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-4"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {card.isMonetary ? "$" : ""}{formatNumber(card.value)}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{card.label}</div>
                  <div className="text-xs text-green-400 mt-1 font-medium">{card.trend} this month</div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Views Chart */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" /> Daily Views (30 days)
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickLine={false} axisLine={false} interval={4} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "rgba(20,20,40,0.95)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "12px", color: "#fff" }} />
                    <Area type="monotone" dataKey="views" stroke="#a855f7" fill="url(#viewsGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Earnings Chart */}
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" /> Daily Earnings (30 days)
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickLine={false} axisLine={false} interval={4} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "rgba(20,20,40,0.95)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "12px", color: "#fff" }} formatter={(v: any) => [`$${(typeof v === 'number' ? v : Number(v) || 0).toFixed(2)}`, "Earnings"]} />
                    <Area type="monotone" dataKey="earnings" stroke="#22c55e" fill="url(#earningsGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Upload Prompt", icon: Plus, href: "/upload", color: "from-purple-600 to-pink-600" },
                { label: "View Analytics", icon: BarChart3, href: "#", color: "from-blue-600 to-cyan-600" },
                { label: "My Collections", icon: BookMarked, href: "/collections", color: "from-amber-600 to-orange-600" },
                { label: "Settings", icon: Settings, href: "/settings", color: "from-gray-600 to-zinc-600" },
              ].map(({ label, icon: Icon, href, color }) => (
                <a key={label} href={href}
                  className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${color} text-white font-medium text-sm hover:opacity-90 transition-all shadow-lg`}>
                  <Icon className="w-5 h-5" />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab !== "overview" && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
              {(() => {
                const tab = tabs.find(t => t.id === activeTab);
                return tab ? <tab.icon className="w-8 h-8 text-purple-400" /> : null;
              })()}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {tabs.find(t => t.id === activeTab)?.label}
            </h3>
            <p className="text-white/40 text-sm">Content for this section will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
