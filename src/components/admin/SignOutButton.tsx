"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
    >
      <LogOut size={16} />
      Sign Out
    </button>
  );
}
