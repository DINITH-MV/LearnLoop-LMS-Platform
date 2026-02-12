import OpenAI from "openai";

export async function translateCode(from: string, to: string, code: string): Promise<string> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert programmer capable of translating code between programming languages. Translate the provided code from one language to another while maintaining the same functionality. Ensure proper syntax, indentation, and language-specific best practices. Only return the translated code without explanations.",
        },
        {
          role: "user",
          content: `Translate this ${from} code to ${to}:\n\n${code}`,
        },
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0].message.content;
    
    if (!response) {
      throw new Error("No response generated from AI model");
    }
    
    return response;
  } catch (error) {
    console.error("Code Translation Error:", error);
    return "Error: Unable to translate code. Please check your input and try again.";
  }
}
