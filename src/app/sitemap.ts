import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/mongodb';
import Painting from '@/models/Painting';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://artistportfolio.com';

  // Fetch dynamic routes
  let paintings = [];
  try {
    await connectToDatabase();
    paintings = await Painting.find({}, { slug: 1, updatedAt: 1 });
  } catch (error) {
    console.warn("Could not fetch database for sitemap generation.");
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
