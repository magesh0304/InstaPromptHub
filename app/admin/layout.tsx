import { Shield } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050510]">
      {/* Admin top bar */}
      <div className="border-b border-white/5 bg-[#060618] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">← Back to site</Link>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-white">InstaPromptHub Admin</span>
          </div>
        </div>
        <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full font-medium">
          Admin Access
        </span>
      </div>
      {children}
    </div>
  );
}
