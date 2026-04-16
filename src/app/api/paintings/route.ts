import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Painting from "@/models/Painting";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    // Use the URL parameters to allow sorting/filtering (e.g., ?featured=true)
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    const query = featured === "true" ? { isFeatured: true } : {};
    const paintings = await Painting.find(query).sort({ order: 1, year: -1 });

    return NextResponse.json({ paintings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching paintings", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();

    const newPainting = await Painting.create(body);

    return NextResponse.json({ painting: newPainting }, { status: 201 });
  } catch (error) {
    console.error("Error creating painting", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
