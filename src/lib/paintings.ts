import cloudinary from "./cloudinary";
import { Painting } from "@/types/painting";

const FOLDER = process.env.CLOUDINARY_FOLDER || "artist_portfolio";

/**
 * Normalizes a Cloudinary resource into a Painting object.
 */
function normalizePainting(resource: unknown): Painting {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res = resource as any;
  const context = res.context?.custom || {};
  
  return {
    id: res.asset_id || res.public_id,
    publicId: res.public_id,
    slug: context.slug || res.public_id.split("/").pop() || "",
    title: context.title || "Untitled",
    shortDescription: context.shortDescription || "",
    medium: context.medium || "",
    size: context.size || "",
    year: context.year ? parseInt(context.year, 10) : new Date(res.created_at).getFullYear(),
    category: context.category || "Uncategorized",
    status: context.status || "",
    featured: context.featured === "true",
    imageUrl: res.secure_url,
    width: res.width,
    height: res.height,
    createdAt: res.created_at,
    updatedAt: res.updated_at || res.created_at,
  };
}

/**
 * Fetches all paintings from Cloudinary.
 */
export async function getPaintings(): Promise<Painting[]> {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: `${FOLDER}/`,
      max_results: 500,
      context: true,
    });

    const paintings = result.resources.map(normalizePainting);
    
    // Sort by year descending by default, then by createdAt
    return paintings.sort((a: Painting, b: Painting) => {
      if (b.year !== a.year) return (b.year || 0) - (a.year || 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (error) {
    console.error("Error fetching paintings from Cloudinary:", error);
    return [];
  }
}

/**
 * Fetches featured paintings.
 */
export async function getFeaturedPaintings(): Promise<Painting[]> {
  const paintings = await getPaintings();
  return paintings.filter((p) => p.featured);
}

/**
 * Fetches a single painting by its slug.
 */
export async function getPaintingBySlug(slug: string): Promise<Painting | null> {
  const paintings = await getPaintings();
  return paintings.find((p) => p.slug === slug) || null;
}
