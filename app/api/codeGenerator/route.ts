import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { generateCode } from "./codeGeneratorModel";

export async function POST(req: Request) {
  const userId = "user_2iyMqRH11q6x04llS91O6mvdPDV";
  const { prompt } = await req.json();

  console.log(userId)

  console.log(prompt);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const generatedCodeBlock = await generateCode(prompt);

    const generatedCode = await db.generatedCode.create({
      data: {
        userId,
        prompt,
        generatedCode: generatedCodeBlock,
      },
    });

    return NextResponse.json(generatedCode);
  } catch (error) {
    console.log("[CodeGenerator]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
