"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function NewPaintingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!data.imageSrc) {
      setError("Please upload an image or paste a Cloudinary URL before saving.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/paintings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          year: Number(data.year),
          isFeatured: data.isFeatured === "on",
        }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const json = await res.json();
        setError(json.error ?? "Failed to save artwork");
      }
    } catch (err) {
      console.error(err);
      setError("Network error — please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-[var(--color-gold-500)] hover:text-[var(--color-gold-300)] transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="bg-[#0c0a09] p-8 rounded-xl border border-[var(--color-gold-900)]">
        <h1 className="text-2xl font-serif text-[var(--color-gold-100)] mb-8">Add New Artwork</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Title</label>
              <input name="title" required className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Slug (URL friendly)</label>
              <input name="slug" required className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Medium</label>
              <input name="medium" required className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Category</label>
              <select name="category" required className="bg-[#050403] border border-[var(--color-gold-900)] p-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors rounded">
                <option value="Mixed Media">Mixed Media</option>
                <option value="Oil">Oil</option>
                <option value="Acrylic">Acrylic</option>
                <option value="Charcoal">Charcoal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col text-white">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Year</label>
              <input name="year" type="number" required defaultValue={new Date().getFullYear()} className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Dimensions</label>
              <input name="dimensions" placeholder="e.g. 48x60 in" className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
          </div>

          {/* ── Image upload / URL ── */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)]">
              Artwork Image
            </label>
            <ImageUploader name="imageSrc" required />
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Description</label>
            <textarea name="description" rows={5} className="bg-transparent border border-[var(--color-gold-900)] p-3 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors rounded" />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4 accent-[var(--color-gold-400)]" />
            <label htmlFor="isFeatured" className="text-sm text-[var(--color-gold-200)]">Feature on Home Page</label>
          </div>

          {error && (
            <p className="text-red-400 text-sm border border-red-800 rounded px-3 py-2">
              {error}
            </p>
          )}

          <div className="pt-4 border-t border-[var(--color-gold-900)] flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-gold-400)] text-[#000] px-8 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-[var(--color-gold-300)] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : "Save Artwork"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
