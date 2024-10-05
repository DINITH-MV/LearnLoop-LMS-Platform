import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';


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
            "Do not include ``` in the code block.Do not add any special characters (e.g: ```, ```html, ```python etc) at the beginning and end of the code block. Do not include ``` in the code block. The code should be well-structured and properly indented. Ensure to use proper comments. Provide the code only. Generate a good quality code based on the {prompt} given by the user. The code should have proper indentation, be well-structured, and not use unnecessary characters. Ensure to use proper comments.",
        },
        {
          role: "user",
          content: `Translate the following code from ${fromLanguage} to ${toLanguage}: ${code}.`,
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
