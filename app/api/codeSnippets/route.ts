import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(req: Request) {
  try {
    const userId = "user_2iyMqRH11q6x04llS91O6mvdPDV";
    const { name: title, code } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const codeSnippet = await db.codeSnippet.create({
      data: {
        title,
        code,
        userId,
      },
    });

    return NextResponse.json(codeSnippet);
  } catch (error) {
    console.log("[CodeSnippets]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
