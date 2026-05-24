"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, FileText, Tag, Flag,
  BarChart3, TrendingUp, AlertTriangle, CheckCircle,
  XCircle, Search, MoreHorizontal, Shield
} from "lucide-react";
import { cn, formatNumber, formatRelativeTime } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const adminTabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "prompts", label: "Prompts", icon: FileText },
  { id: "reports", label: "Reports", icon: Flag },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const trafficData = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  users: Math.floor(Math.random() * 2000) + 500,
  prompts: Math.floor(Math.random() * 200) + 50,
  revenue: Math.floor(Math.random() * 500) + 100,
}));

const mockUsers = [
  { id: "1", email: "alice@example.com", username: "alice_prompt", role: "CREATOR", plan: "PRO", status: "active", prompts: 24, joined: new Date("2024-01-10"), earnings: 840 },
  { id: "2", email: "bob@example.com", username: "bob_ai", role: "USER", plan: "FREE", status: "active", prompts: 3, joined: new Date("2024-02-15"), earnings: 0 },
  { id: "3", email: "charlie@example.com", username: "charlie_dev", role: "CREATOR", plan: "CREATOR", status: "suspended", prompts: 87, joined: new Date("2023-11-20"), earnings: 4200 },
  { id: "4", email: "diana@example.com", username: "diana_art", role: "USER", plan: "PRO", status: "active", prompts: 0, joined: new Date("2024-03-01"), earnings: 0 },
  { id: "5", email: "eve@example.com", username: "eve_creates", role: "CREATOR", plan: "CREATOR", status: "active", prompts: 156, joined: new Date("2023-08-14"), earnings: 12600 },
];

const mockReports = [
  { id: "1", promptTitle: "Spam Marketing Prompt", reporter: "user123", reason: "SPAM", status: "PENDING", createdAt: new Date("2024-03-10") },
  { id: "2", promptTitle: "Inappropriate Content v2", reporter: "user456", reason: "INAPPROPRIATE", status: "PENDING", createdAt: new Date("2024-03-09") },
  { id: "3", promptTitle: "Copied Work", reporter: "user789", reason: "COPYRIGHT", status: "REVIEWED", createdAt: new Date("2024-03-08") },
];

const overviewStats = [
  { label: "Total Users", value: 12489, icon: Users, color: "from-blue-500 to-cyan-600", trend: "+12%" },
  { label: "Total Prompts", value: 49821, icon: FileText, color: "from-purple-500 to-violet-600", trend: "+8%" },
  { label: "Revenue (MTD)", value: 28400, icon: TrendingUp, color: "from-green-500 to-teal-600", trend: "+24%", isMonetary: true },
  { label: "Pending Reports", value: 12, icon: Flag, color: "from-red-500 to-rose-600", isAlert: true },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = mockUsers.filter(
    (u) => u.email.includes(userSearch) || u.username.includes(userSearch)
  );

  return (
    <div className="min-h-screen bg-[#050510]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen border-r border-white/5 p-4 flex-shrink-0 hidden md:flex flex-col gap-1 pt-8">
          <div className="flex items-center gap-2 px-3 mb-6">
            <Shield className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-white">Admin Panel</span>
          </div>
          {adminTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full",
                activeTab === tab.id
                  ? "bg-purple-500/20 text-purple-300"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Mobile tabs */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto md:hidden">
            {adminTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn("px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all", activeTab === tab.id ? "bg-purple-500/20 text-purple-300" : "text-white/40 hover:text-white")}
              >{tab.label}</button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
                <p className="text-white/40 text-sm">Platform metrics and management</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {overviewStats.map((stat) => (
                  <div key={stat.label} className={cn("glass-card rounded-2xl p-4", stat.isAlert && "border-red-500/20")}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {stat.isMonetary ? "$" : ""}{formatNumber(stat.value)}
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                    {stat.trend && <div className="text-xs text-green-400 mt-1">{stat.trend} this month</div>}
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-bold text-white mb-4">Platform Traffic (14 days)</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "rgba(20,20,40,0.95)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "12px", color: "#fff" }} />
                    <Area type="monotone" dataKey="users" stroke="#a855f7" fill="url(#userGrad)" strokeWidth={2} name="Users" />
                    <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="url(#revenueGrad)" strokeWidth={2} name="Revenue ($)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Users</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users..."
                    className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/40"
                  />
                </div>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/40 uppercase tracking-wider">User</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/40 uppercase tracking-wider hidden md:table-cell">Role</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/40 uppercase tracking-wider hidden lg:table-cell">Plan</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/40 uppercase tracking-wider hidden lg:table-cell">Earnings</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/40 uppercase tracking-wider">Status</th>
                      <th className="px-5 py-3.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/3 hover:bg-white/3 transition-colors">
                        <td className="px-5 py-4">
                          <div>
                            <p className="text-sm font-medium text-white">@{user.username}</p>
                            <p className="text-xs text-white/40">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className={cn("text-xs px-2 py-1 rounded-lg font-medium",
                            user.role === "CREATOR" ? "bg-purple-500/20 text-purple-300" :
                            user.role === "ADMIN" ? "bg-red-500/20 text-red-300" :
                            "bg-white/5 text-white/50"
                          )}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className={cn("text-xs px-2 py-1 rounded-lg font-medium",
                            user.plan === "CREATOR" ? "bg-amber-500/20 text-amber-300" :
                            user.plan === "PRO" ? "bg-blue-500/20 text-blue-300" :
                            "bg-white/5 text-white/50"
                          )}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-sm text-green-400">${formatNumber(user.earnings)}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={cn("flex items-center gap-1.5 text-xs font-medium",
                            user.status === "active" ? "text-green-400" : "text-red-400"
                          )}>
                            {user.status === "active" ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button className="text-xs px-2.5 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all">
                              {user.status === "active" ? "Suspend" : "Activate"}
                            </button>
                            <button className="text-xs px-2.5 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">
                              Ban
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h1 className="text-2xl font-bold text-white">Reports</h1>
              <div className="space-y-3">
                {mockReports.map((report) => (
                  <div key={report.id} className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center",
                        report.status === "PENDING" ? "bg-amber-500/20" : "bg-green-500/20"
                      )}>
                        {report.status === "PENDING"
                          ? <AlertTriangle className="w-5 h-5 text-amber-400" />
                          : <CheckCircle className="w-5 h-5 text-green-400" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">{report.promptTitle}</p>
                        <p className="text-xs text-white/40">
                          Reported by @{report.reporter} · {formatRelativeTime(report.createdAt)} · {report.reason}
                        </p>
                      </div>
                    </div>
                    {report.status === "PENDING" && (
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg text-xs bg-green-500/20 text-green-400 border border-green-500/20 hover:bg-green-500/30 transition-all">
                          Approve
                        </button>
                        <button className="px-3 py-1.5 rounded-lg text-xs bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition-all">
                          Remove
                        </button>
                        <button className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 transition-all">
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Placeholder for other tabs */}
          {!["overview", "users", "reports"].includes(activeTab) && (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const tab = adminTabs.find((t) => t.id === activeTab);
                  return tab ? <tab.icon className="w-6 h-6 text-purple-400" /> : null;
                })()}
              </div>
              <p className="text-white font-semibold">{adminTabs.find((t) => t.id === activeTab)?.label}</p>
              <p className="text-white/40 text-sm mt-1">Content will appear here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
