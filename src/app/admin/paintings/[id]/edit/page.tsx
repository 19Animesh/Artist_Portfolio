"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditPaintingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [painting, setPainting] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/paintings/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.painting) setPainting(data.painting);
      })
      .catch(err => console.error(err));
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch(`/api/paintings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          year: Number(data.year),
          order: Number(data.order),
          isFeatured: data.isFeatured === "on",
        }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        console.error("Failed to default update");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!painting) return <div className="text-[var(--color-gold-500)] p-10">Loading artwork data...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link href="/admin" className="inline-flex items-center gap-2 text-[var(--color-gold-500)] hover:text-[var(--color-gold-300)] transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="bg-[#0c0a09] p-8 rounded-xl border border-[var(--color-gold-900)]">
        <h1 className="text-2xl font-serif text-[var(--color-gold-100)] mb-8">Edit Artwork: {painting.title}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Title</label>
              <input name="title" defaultValue={painting.title} required className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Slug</label>
              <input name="slug" defaultValue={painting.slug} required className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Medium</label>
              <input name="medium" defaultValue={painting.medium} required className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Category</label>
              <select name="category" defaultValue={painting.category} required className="bg-[#050403] border border-[var(--color-gold-900)] p-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors rounded">
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
              <input name="year" type="number" defaultValue={painting.year} required className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Dimensions</label>
              <input name="dimensions" defaultValue={painting.dimensions} className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Order priority</label>
              <input name="order" type="number" defaultValue={painting.order} className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Image URL (Cloudinary)</label>
            <input name="imageSrc" defaultValue={painting.imageSrc} required className="bg-transparent border-b border-[var(--color-gold-900)] py-2 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors" />
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest text-[var(--color-gold-500)] mb-2">Description</label>
            <textarea name="description" defaultValue={painting.description} rows={5} className="bg-transparent border border-[var(--color-gold-900)] p-3 text-[var(--color-gold-100)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors rounded" />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" name="isFeatured" id="isFeatured" defaultChecked={painting.isFeatured} className="w-4 h-4 accent-[var(--color-gold-400)]" />
            <label htmlFor="isFeatured" className="text-sm text-[var(--color-gold-200)]">Feature on Home Page</label>
          </div>

          <div className="pt-4 border-t border-[var(--color-gold-900)] flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-gold-400)] text-[#000] px-8 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-[var(--color-gold-300)] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Update Artwork"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
