import { auth } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Painting from "@/models/Painting";
import ContactMessage from "@/models/ContactMessage";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  
  if (!session?.user) {
    return <div>Access Denied</div>;
  }

  await connectToDatabase();
  
  const paintings = await Painting.find().sort({ createdAt: -1 });
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center bg-[#0c0a09] p-6 rounded-xl border border-[var(--color-gold-900)]">
        <div>
          <h1 className="text-3xl font-serif text-[var(--color-gold-100)] mb-2">Dashboard</h1>
          <p className="text-[var(--color-gold-500)] text-sm">Manage your artworks and incoming inquiries.</p>
        </div>
        <Link 
          href="/admin/paintings/new" 
          className="flex items-center gap-2 bg-[var(--color-gold-400)] text-[#000] px-6 py-3 rounded-md text-sm font-bold tracking-widest uppercase hover:bg-[var(--color-gold-300)] transition-colors"
        >
          <Plus size={18} />
          Add Artwork
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Artworks List */}
        <section>
          <h2 className="text-xl font-serif text-[var(--color-gold-200)] mb-6 border-b border-[var(--color-gold-900)] pb-4">
            Recent Artworks
          </h2>
          <div className="space-y-4">
            {paintings.length === 0 ? (
              <p className="text-[var(--color-gold-600)]">No artworks found. Create one above.</p>
            ) : (
              paintings.map((painting) => (
                <div key={painting._id.toString()} className="flex justify-between items-center bg-[#0c0a09] p-4 rounded-lg border border-[var(--color-gold-900)]/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--color-gold-900)] rounded overflow-hidden">
                      {/* Normally an image here */}
                    </div>
                    <div>
                      <h3 className="text-[var(--color-gold-100)] font-semibold">{painting.title}</h3>
                      <p className="text-xs text-[var(--color-gold-500)] mt-1">{painting.category} • {painting.year}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/paintings/${painting._id}/edit`} className="p-2 text-[var(--color-gold-400)] hover:bg-[var(--color-gold-900)]/30 rounded transition-colors">
                      <Edit2 size={16} />
                    </Link>
                    <button className="p-2 text-red-400 hover:bg-red-900/20 rounded transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Messages */}
        <section>
          <h2 className="text-xl font-serif text-[var(--color-gold-200)] mb-6 border-b border-[var(--color-gold-900)] pb-4">
            Recent Messages
          </h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-[var(--color-gold-600)]">No messages yet.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg._id.toString()} className="bg-[#0c0a09] p-4 rounded-lg border border-[var(--color-gold-900)]/50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[var(--color-gold-100)] font-semibold">{msg.name}</h3>
                    <span className="text-xs text-[var(--color-gold-600)]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <a href={`mailto:${msg.email}`} className="text-xs text-[var(--color-gold-400)] block mb-3">{msg.email}</a>
                  <p className="text-sm text-[var(--color-gold-300)] line-clamp-3">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

    </div>
  );
}
