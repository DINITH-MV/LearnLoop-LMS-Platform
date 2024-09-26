import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAssistant } from "./conversationModel";

export async function POST(req: Request) {
  const { userId } = auth();
  const { question } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Add instructions to the question
  const instructions = "Please follow these guidelines: Do not add '*' or '**' marks to the response.";
  const modifiedQuestion = `${instructions} Question: ${question}`;

  try {
    const response = await getAssistant(modifiedQuestion);
    return NextResponse.json(response);
  } catch (error) {
    console.log("[CodeAssistant]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
