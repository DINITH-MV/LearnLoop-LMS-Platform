import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages, reply } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ensure both `messages` and `reply` are passed as strings
    const feedback = await db.feedback.create({
      data: {
        reply: reply || "",  // Set default empty string if not provided
        userId,
        messages: messages || "",  // Same here
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.log("[Feedback]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
