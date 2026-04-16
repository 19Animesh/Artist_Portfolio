import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newMessage = await ContactMessage.create(body);

    return NextResponse.json({ message: "Message sent successfully", data: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact message", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact messages", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
