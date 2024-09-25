import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
// File structure: /api/feedback/[feedbackId]/route.ts

export async function PATCH(
  req: Request,
  { params }: { params: { codeId: string } }
) {
  try {
    // Log to verify that feedbackId is passed correctly
    console.log("Params:", params);

    const { codeId } = params;
    const body = await req.json();

    console.log("Feedback ID:", codeId);
    console.log("Request Body:", body);

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!codeId) {
      return new NextResponse("Bad Request: Feedback ID is missing", { status: 400 });
    }

    // Find feedback by ID and userId
    const feedback = await db.feedback.findUnique({
      where: {
        id: codeId,
       
      },
    });

    if (!feedback) {
      return new NextResponse("Unauthorized: Feedback not found or not owned by user", { status: 401 });
    }

    // Update feedback
    const updatedFeedback = await db.feedback.update({
      where: {
        id: codeId,
      },
      data: {
        messages: body.messages || feedback.messages,
        reply: body.reply || feedback.reply,
      },
    });

    return NextResponse.json(updatedFeedback);
  } catch (error) {
    console.log("[FEEDBACK_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}





export async function DELETE(
  req: Request,
  { params }: { params: { codeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { codeId } = params;

    // Check if feedbackId exists
    if (!codeId) {
      return new NextResponse("Bad Request: Feedback ID is missing", { status: 400 });
    }

    // Find the feedback item by ID and userId
    const feedback = await db.feedback.findUnique({
      where: {
        id: codeId,
        userId: userId,
      },
    });

    // If feedback not found or does not belong to the user
    if (!feedback) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete the feedback item
    const deleteFeedback = await db.feedback.delete({
      where: {
        id: codeId,
      },
    });

    return NextResponse.json(deleteFeedback);
  } catch (error) {
    console.log("[FEEDBACK_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}