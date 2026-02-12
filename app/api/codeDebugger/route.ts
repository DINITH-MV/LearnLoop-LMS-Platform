import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { debugCode } from "./codeDebuggerModel";
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { proLanguage, code } = await req.json();

    console.log("Request data:", { userId, proLanguage, codeLength: code?.length });

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!proLanguage || !code) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const debuggedCode = await debugCode(proLanguage, code);
    console.log("Debug successful, code length:", debuggedCode.length);

    const response = await db.codeDebugger.create({
      data: {
        userId,
        language: proLanguage,
        code,
        solution: debuggedCode,
      },
    });

    console.log("Database save successful:", response.id);
    return NextResponse.json(response);
  } catch (error) {
    console.error("[CodeDebug] Detailed Error:", error);
    return new NextResponse(`Internal Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
