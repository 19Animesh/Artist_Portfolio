import Link from "next/link";
import { LayoutDashboard, Paintbrush } from "lucide-react";
import { SignOutButton } from "@/components/admin/SignOutButton";

export const metadata = {
  title: "Admin Panel | Anshika Agarwal",
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
          <p className="text-xs text-[var(--color-gold-700)] mt-1">Artist Portfolio</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-gold-200)] hover:bg-[var(--color-gold-900)]/30 rounded-lg transition-colors"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>
          <Link
            href="/admin/paintings/new"
            className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-gold-200)] hover:bg-[var(--color-gold-900)]/30 rounded-lg transition-colors"
          >
            <Paintbrush size={17} />
            Upload Artwork
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--color-gold-900)]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-xs text-[var(--color-gold-600)] hover:text-[var(--color-gold-400)] transition-colors mb-1"
          >
            ← View Portfolio
          </Link>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 font-sans">
        {children}
      </main>
    </div>
  );
}
