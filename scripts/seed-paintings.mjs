/**
 * Bulk Import Script — Anshika Agarwal Portfolio
 * ================================================
 * Uploads local image files to Cloudinary and inserts
 * painting records into MongoDB in one go.
 *
 * USAGE:
 *   1. Place all your art images in the `scripts/art/` folder.
 *   2. Fill in your details in the PAINTINGS array below.
 *   3. Run: node scripts/seed-paintings.mjs
 *
 * REQUIREMENTS:
 *   npm install dotenv cloudinary mongoose
 *   (these are already installed in this project)
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Cloudinary config ────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── MongoDB connection ───────────────────────────────────────────────────────
await mongoose.connect(process.env.MONGODB_URI);

const PaintingSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    slug:        { type: String, required: true, unique: true },
    medium:      { type: String, required: true },
    year:        { type: Number, required: true },
    category:    { type: String, required: true },
    imageSrc:    { type: String, required: true },
    dimensions:  { type: String, required: true },
    description: { type: String, required: true },
    isFeatured:  { type: Boolean, default: false },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Painting =
  mongoose.models.Painting || mongoose.model("Painting", PaintingSchema);

// ─── Helper: generate a URL-safe slug from a title ───────────────────────────
function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ─── YOUR PAINTINGS LIST ─────────────────────────────────────────────────────
// Each entry maps to one artwork.
//
// `file` → filename inside the scripts/art/ folder
//          Leave blank ("") if you are supplying an external URL in `imageSrc`.
// `imageSrc` → Optional: pre-existing Cloudinary URL (skip upload if provided)
//
// Categories: "Mixed Media" | "Oil" | "Acrylic" | "Charcoal" | "Watercolour" | "Digital"
//
const PAINTINGS = [
  {
    title: "Hues of Forgetting",
    file: "hues-of-forgetting.jpg",   // put this file in scripts/art/
    medium: "Mixed Media on Canvas",
    year: 2025,
    category: "Mixed Media",
    dimensions: "36x48 in",
    description: "Layers of muted gold and ash — a study in what memory leaves behind.",
    isFeatured: true,
    order: 1,
  },
  {
    title: "The Undone Hour",
    file: "the-undone-hour.jpg",
    medium: "Oil & Gold Leaf",
    year: 2026,
    category: "Oil",
    dimensions: "24x30 in",
    description: "A fleeting dusk, suspended between presence and absence.",
    isFeatured: true,
    order: 2,
  },
  // ── ADD YOUR OTHER 148 PAINTINGS HERE ─────────────────────────────────────
  // Just copy the block above and fill in your details.
  // Tip: if all your files are numbered (art001.jpg … art150.jpg),
  // you can generate entries programmatically — see the loop example below.
];

// ─── OPTIONAL: Auto-generate entries for numbered files ──────────────────────
// Uncomment and edit if your files are named consistently (e.g. art001.jpg…art150.jpg)
//
// for (let i = 1; i <= 150; i++) {
//   const num = String(i).padStart(3, "0");
//   PAINTINGS.push({
//     title: `Untitled ${i}`,
//     file: `art${num}.jpg`,
//     medium: "Mixed Media",
//     year: 2025,
//     category: "Mixed Media",
//     dimensions: "24x30 in",
//     description: "",
//     isFeatured: false,
//     order: i,
//   });
// }

// ─── Main upload loop ─────────────────────────────────────────────────────────
const ART_DIR = path.join(__dirname, "art");

let inserted = 0;
let skipped = 0;
let failed = 0;

for (const [i, p] of PAINTINGS.entries()) {
  const slug = toSlug(p.title);
  process.stdout.write(`[${i + 1}/${PAINTINGS.length}] ${p.title} … `);

  try {
    // Check if already in DB
    const exists = await Painting.findOne({ slug });
    if (exists) {
      console.log("already exists, skipping.");
      skipped++;
      continue;
    }

    // Upload to Cloudinary (skip if imageSrc already provided)
    let imageSrc = p.imageSrc || "";
    if (!imageSrc && p.file) {
      const filePath = path.join(ART_DIR, p.file);
      if (!fs.existsSync(filePath)) {
        console.log(`⚠  file not found: ${filePath}`);
        failed++;
        continue;
      }
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "artist_portfolio",
        public_id: slug,
        overwrite: true,
      });
      imageSrc = result.secure_url;
    }

    // Insert into MongoDB
    await Painting.create({
      title: p.title,
      slug,
      medium: p.medium,
      year: p.year,
      category: p.category,
      imageSrc,
      dimensions: p.dimensions || "",
      description: p.description || "",
      isFeatured: p.isFeatured || false,
      order: p.order || i,
    });

    console.log(`✓  uploaded → ${imageSrc.slice(0, 60)}…`);
    inserted++;
  } catch (err) {
    console.log(`✗  ${err.message}`);
    failed++;
  }
}

console.log(`\nDone! ${inserted} inserted · ${skipped} skipped · ${failed} failed`);
await mongoose.disconnect();
