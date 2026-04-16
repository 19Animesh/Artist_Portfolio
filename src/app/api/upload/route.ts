import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { data } = body; // Base64 encoded image string

    if (!data) {
      return NextResponse.json({ error: "Missing image data" }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(data, {
      folder: "artist_portfolio",
    });

    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
