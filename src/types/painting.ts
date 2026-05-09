export interface Painting {
  id: string;
  publicId: string;
  slug: string;
  title: string;
  shortDescription?: string;
  medium?: string;
  size?: string;
  year?: number;
  category?: string;
  status?: string; // e.g., 'Available', 'Sold', 'priceLabel'
  featured: boolean;
  imageUrl: string;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
}
