import { NextResponse } from "next/server";
import axios from "axios";
import OpenAI from "openai";

export async function POST(req: Request) {
  const userId = "user_2iyMqRH11q6x04llS91O6mvdPDV";
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { imageUrl } = await req.json();

  try {
    // Initialize OpenAI SDK
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Use environment variable for the API key
    });

    // Send the image URL to OpenAI's image vision model for analysis
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Give me the code of the above image with proper indentation and do not give any explanation. Do not add any special characters (e.g: ```, ```html, ```python etc) at the beginning and end of the code block." },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    // Log and return the response from OpenAI
    console.log(response.choices[0]);

    return new Response(JSON.stringify(response.choices[0]), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("[ImageToCode]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
