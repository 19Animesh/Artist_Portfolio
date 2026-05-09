import cloudinary from "./cloudinary";
import { Painting } from "@/types/painting";

const FOLDER = process.env.CLOUDINARY_FOLDER || "artist_portfolio";

function safeDecode(val: string | undefined): string {
  if (!val) return "";
  try {
    return decodeURIComponent(val);
  } catch {
    return val;
  }
}

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
    slug: safeDecode(context.slug) || res.public_id.split("/").pop() || "",
    title: safeDecode(context.title) || "Untitled",
    shortDescription: safeDecode(context.shortDescription) || "",
    medium: safeDecode(context.medium) || "",
    size: safeDecode(context.size) || "",
    year: context.year ? parseInt(context.year, 10) : new Date(res.created_at).getFullYear(),
    category: safeDecode(context.category) || "Uncategorized",
    status: safeDecode(context.status) || "",
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
    // Debug: log env var presence (not values) to help diagnose production issues
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      console.error(
        `[paintings] Missing Cloudinary env vars — CLOUDINARY_CLOUD_NAME=${!!cloudName} CLOUDINARY_API_KEY=${!!apiKey} CLOUDINARY_API_SECRET=${!!apiSecret}`
      );
      return [];
    }

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
    console.error("[paintings] Error fetching paintings from Cloudinary:", error);
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
