import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  const { fromLanguage, toLanguage, code } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Use an environment variable instead of hardcoding
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Use a valid model name
      messages: [
        {
          role: "system",
          content:
            "You are a helpful, informative, and safe assistant. Please answer the following question without providing any harmful, offensive, or unsafe content.",
        },
        {
          role: "user",
          content: `Translate the following code from ${fromLanguage} to ${toLanguage}: ${code}`,
        },
      ],
      temperature: 0.3, // Lower temperature for more deterministic responses
    });

    const response = completion.choices[0].message.content; // Ensure the response structure is correct
    console.log(response);
    return NextResponse.json({ content: response });
  } catch (error) {
    console.error("[CodeTranslator]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
