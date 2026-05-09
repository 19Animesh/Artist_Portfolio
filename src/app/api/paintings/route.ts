import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getPaintings } from "@/lib/paintings";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    let paintings = await getPaintings();
    
    if (featured === "true") {
      paintings = paintings.filter(p => p.featured);
    }

    return NextResponse.json({ paintings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching paintings", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function extractPublicId(url: string) {
  // e.g. https://res.cloudinary.com/demo/image/upload/v12345/artist_portfolio/my-image.jpg
  // we want artist_portfolio/my-image
  try {
    const parts = url.split('/');
    const fileWithExt = parts.pop();
    const folder = parts.pop();
    if (!fileWithExt || !folder) return null;
    const filename = fileWithExt.split('.')[0];
    return `${folder}/${filename}`;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { imageSrc, title, slug, medium, category, year, dimensions, description, isFeatured, order } = body;

    if (!imageSrc) {
      return NextResponse.json({ error: "imageSrc is required" }, { status: 400 });
    }

    const publicId = extractPublicId(imageSrc);
    if (!publicId) {
      return NextResponse.json({ error: "Invalid Cloudinary URL" }, { status: 400 });
    }

    // Format context tags
    const contextMap = [
      title && `title=${encodeURIComponent(title)}`,
      slug && `slug=${encodeURIComponent(slug)}`,
      medium && `medium=${encodeURIComponent(medium)}`,
      category && `category=${encodeURIComponent(category)}`,
      year && `year=${year}`,
      dimensions && `size=${encodeURIComponent(dimensions)}`,
      description && `shortDescription=${encodeURIComponent(description)}`,
      typeof isFeatured === 'boolean' && `featured=${isFeatured}`,
      order && `order=${order}`
    ].filter(Boolean).join('|');

    // Update the Cloudinary asset with the context
    await cloudinary.uploader.explicit(publicId, {
      type: "upload",
      context: contextMap,
    });

    return NextResponse.json({ message: "Painting saved to Cloudinary" }, { status: 201 });
  } catch (error) {
    console.error("Error creating painting", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
