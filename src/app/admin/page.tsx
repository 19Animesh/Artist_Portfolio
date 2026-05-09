import { auth } from "@/lib/auth";
import { getPaintings } from "@/lib/paintings";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Image as ImageIcon } from "lucide-react";
import { DeleteArtworkButton } from "@/components/admin/DeleteArtworkButton";

export default async function AdminDashboard() {
  const session = await auth();
  
  if (!session?.user) {
    return <div>Access Denied</div>;
  }

  const paintings = await getPaintings();

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-center gap-4 bg-[#0c0a09] p-6 rounded-xl border border-[var(--color-gold-900)]">
        <div>
          <h1 className="text-3xl font-serif text-[var(--color-gold-100)] mb-1">Dashboard</h1>
          <p className="text-[var(--color-gold-500)] text-sm">
            Welcome back, <span className="text-[var(--color-gold-300)]">{session.user.name}</span>
          </p>
        </div>
        <Link
          href="/admin/paintings/new"
          className="flex items-center gap-2 bg-[var(--color-gold-400)] text-[#000] px-6 py-3 rounded-md text-sm font-bold tracking-widest uppercase hover:bg-[var(--color-gold-300)] transition-colors"
        >
          <Plus size={18} />
          Upload Artwork
        </Link>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0c0a09] rounded-xl border border-[var(--color-gold-900)] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-gold-900)]/50 flex items-center justify-center">
            <ImageIcon size={18} className="text-[var(--color-gold-400)]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--color-gold-100)]">{paintings.length}</p>
            <p className="text-xs text-[var(--color-gold-500)] uppercase tracking-widest">Artworks</p>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Artworks List */}
        <section>
          <h2 className="text-lg font-serif text-[var(--color-gold-200)] mb-5 flex items-center gap-2 border-b border-[var(--color-gold-900)] pb-4">
            <ImageIcon size={16} className="text-[var(--color-gold-500)]" />
            Artworks
          </h2>
          <div className="space-y-3">
            {paintings.length === 0 ? (
              <div className="text-center py-12 text-[var(--color-gold-600)] border border-dashed border-[var(--color-gold-900)] rounded-xl">
                <ImageIcon size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">No artworks yet.</p>
                <Link href="/admin/paintings/new" className="text-xs text-[var(--color-gold-400)] hover:underline mt-2 inline-block">
                  Upload your first artwork →
                </Link>
              </div>
            ) : (
              paintings.map((painting) => (
                <div
                  key={painting.id}
                  className="flex justify-between items-center bg-[#0c0a09] p-3 rounded-xl border border-[var(--color-gold-900)]/50 hover:border-[var(--color-gold-900)] transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[var(--color-gold-950)] flex-shrink-0">
                      {painting.imageUrl ? (
                        <Image
                          src={painting.imageUrl}
                          alt={painting.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={18} className="text-[var(--color-gold-800)]" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[var(--color-gold-100)] font-semibold text-sm truncate">{painting.title}</h3>
                      <p className="text-xs text-[var(--color-gold-500)] mt-0.5">
                        {painting.category} &bull; {painting.year}
                      </p>
                      {painting.featured && (
                        <span className="inline-block mt-1 text-[10px] bg-[var(--color-gold-900)]/50 text-[var(--color-gold-400)] px-2 py-0.5 rounded-full uppercase tracking-widest">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Link
                      href={`/admin/paintings/${painting.slug}/edit`}
                      className="p-2 text-[var(--color-gold-400)] hover:bg-[var(--color-gold-900)]/30 rounded-lg transition-colors"
                      title="Edit artwork"
                    >
                      <Edit2 size={15} />
                    </Link>
                    <DeleteArtworkButton id={painting.slug} />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
