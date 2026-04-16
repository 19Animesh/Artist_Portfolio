import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Painting from "@/models/Painting";
import { auth } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await connectToDatabase();
    
    // Check if slug is a Mongo ID or a string slug
    const isObjectId = slug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: slug } : { slug };

    const painting = await Painting.findOne(query);

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
    await connectToDatabase();
    const body = await req.json();

    const isObjectId = slug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: slug } : { slug };

    const updatedPainting = await Painting.findOneAndUpdate(query, body, { new: true });

    if (!updatedPainting) {
      return NextResponse.json({ error: "Painting not found" }, { status: 404 });
    }

    return NextResponse.json({ painting: updatedPainting }, { status: 200 });
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
    await connectToDatabase();

    const isObjectId = slug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: slug } : { slug };

    const deletedPainting = await Painting.findOneAndDelete(query);

    if (!deletedPainting) {
      return NextResponse.json({ error: "Painting not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Painting deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting painting", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
