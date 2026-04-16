import Link from "next/link";
import { LayoutDashboard, LogOut, Paintbrush } from "lucide-react";

export const metadata = {
  title: "Admin Panel | Artist Portfolio",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050403] text-[var(--color-gold-50)]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c0a09] border-r border-[var(--color-gold-900)] flex flex-col">
        <div className="p-6 border-b border-[var(--color-gold-900)]">
          <Link href="/admin" className="text-xl font-bold tracking-widest text-[var(--color-gold-400)] uppercase">
            Admin Panel
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-gold-200)] hover:bg-[var(--color-gold-900)]/30 rounded-md transition-colors">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin/paintings/new" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-gold-200)] hover:bg-[var(--color-gold-900)]/30 rounded-md transition-colors">
            <Paintbrush size={18} />
            New Artwork
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--color-gold-900)]">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 rounded-md transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 font-sans">
        {children}
      </main>
    </div>
  );
}
