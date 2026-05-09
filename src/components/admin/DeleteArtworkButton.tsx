"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteArtworkButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      // auto-reset confirm after 3s
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/paintings/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      title={confirming ? "Click again to confirm deletion" : "Delete artwork"}
      className={`p-2 rounded transition-all duration-200 text-sm font-medium flex items-center gap-1.5 ${
        confirming
          ? "bg-red-500/20 text-red-300 border border-red-500/40 px-3"
          : "text-red-400 hover:bg-red-900/20"
      } disabled:opacity-50`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
      ) : (
        <Trash2 size={15} />
      )}
      {confirming && <span className="text-xs">Confirm?</span>}
    </button>
  );
}
