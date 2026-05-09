import { MetadataRoute } from 'next';
import { getPaintings } from '@/lib/paintings';
import { Painting } from '@/types/painting';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://artistportfolio.com';

  // Fetch dynamic routes
  let paintings: Painting[] = [];
  try {
    paintings = await getPaintings();
  } catch {
    console.warn("Could not fetch cloudinary for sitemap generation.");
  }

  const paintingUrls = paintings.map((p) => ({
    url: `${baseUrl}/gallery/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    ...paintingUrls,
  ];
}
