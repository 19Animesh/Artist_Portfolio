import mongoose, { Schema, Document } from "mongoose";

export interface IPainting extends Document {
  title: string;
  slug: string;
  medium: string;
  year: number;
  category: string;
  imageSrc: string;
  dimensions: string;
  description: string;
  isFeatured: boolean;
  order: number;
}

const PaintingSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  medium: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  imageSrc: { type: String, required: true },
  dimensions: { type: String, required: true },
  description: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

// Use existing model or create a new one to prevent overwrite error in Next.js dev mode
export default mongoose.models.Painting || mongoose.model<IPainting>("Painting", PaintingSchema);
