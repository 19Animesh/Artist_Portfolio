"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, LogOut, LogIn, User, Paintbrush, ChevronDown } from "lucide-react";

export function ProfileMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full bg-[var(--color-gold-900)] animate-pulse" />
    );
  }

  if (!session?.user) {
    return (
      <button
        onClick={() => signIn()}
        className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#fafaf9] hover:text-[var(--color-gold-400)] transition-colors"
        aria-label="Admin Login"
      >
        <LogIn size={16} />
        <span className="hidden sm:inline">Login</span>
      </button>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* Avatar Trigger */}
      <button
        id="profile-menu-trigger"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 group"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-gold-400)] to-[var(--color-gold-700)] flex items-center justify-center shadow-lg ring-2 ring-[var(--color-gold-900)] group-hover:ring-[var(--color-gold-400)] transition-all duration-200">
          <User size={14} className="text-[#000]" />
        </div>
        <ChevronDown
          size={12}
          className={`text-[#fafaf9] transition-transform duration-200 hidden sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-3 w-56 bg-[#0c0a09] border border-[var(--color-gold-900)] rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-[100] animate-in">
          {/* User info */}
          <div className="px-4 py-3 border-b border-[var(--color-gold-900)]/60">
            <p className="text-xs text-[var(--color-gold-500)] uppercase tracking-widest">Signed in as</p>
            <p className="text-sm font-semibold text-[var(--color-gold-100)] mt-0.5 truncate">
              {session.user.name ?? "Artist Admin"}
            </p>
          </div>

          {/* Links */}
          <nav className="p-2 space-y-0.5">
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--color-gold-200)] hover:bg-[var(--color-gold-900)]/30 rounded-lg transition-colors"
            >
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
            <Link
              href="/admin/paintings/new"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--color-gold-200)] hover:bg-[var(--color-gold-900)]/30 rounded-lg transition-colors"
            >
              <Paintbrush size={15} />
              Upload Artwork
            </Link>
          </nav>

          {/* Sign Out */}
          <div className="p-2 border-t border-[var(--color-gold-900)]/60">
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
