import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getPaintingBySlug } from "@/lib/paintings";
import { auth } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const painting = await getPaintingBySlug(slug);

    if (!painting) {
      return NextResponse.json({ error: "Painting not found" }, { status: 404 });
    }

    return NextResponse.json({ painting }, { status: 200 });
  } catch (error) {
    console.error("Error fetching painting", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const existingPainting = await getPaintingBySlug(slug);

    if (!existingPainting) {
      return NextResponse.json({ error: "Painting not found" }, { status: 404 });
    }

    const body = await req.json();
    const { title, medium, category, year, dimensions, description, isFeatured, order } = body;

    // Use the existing slug so links don't break unless explicitly changed.
    // If we want to allow slug changes, we'd take body.slug.
    const updatedSlug = body.slug || slug;

    const contextMap = [
      title && `title=${encodeURIComponent(title)}`,
      updatedSlug && `slug=${encodeURIComponent(updatedSlug)}`,
      medium && `medium=${encodeURIComponent(medium)}`,
      category && `category=${encodeURIComponent(category)}`,
      year && `year=${year}`,
      dimensions && `size=${encodeURIComponent(dimensions)}`,
      description && `shortDescription=${encodeURIComponent(description)}`,
      typeof isFeatured === 'boolean' && `featured=${isFeatured}`,
      order !== undefined && `order=${order}`
    ].filter(Boolean).join('|');

    await cloudinary.uploader.explicit(existingPainting.publicId, {
      type: "upload",
      context: contextMap,
    });

    return NextResponse.json({ message: "Painting updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating painting", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const existingPainting = await getPaintingBySlug(slug);

    if (!existingPainting) {
      return NextResponse.json({ error: "Painting not found" }, { status: 404 });
    }

    await cloudinary.uploader.destroy(existingPainting.publicId);

    return NextResponse.json({ message: "Painting deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting painting", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
