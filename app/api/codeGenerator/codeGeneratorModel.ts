import OpenAI from "openai";

export async function generateCode(prompt: string): Promise<string> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Use an environment variable instead of hardcoding
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Use a valid model name
      messages: [
        {
          role: "system",
          content: "You are a code generator. Generate ONLY the requested code with no explanations, comments about what the code does, or additional text. Do not include markdown code blocks (```). Do not include language indicators. Do not include any descriptive text before or after the code. Only return the raw, executable code with proper indentation and inline comments within the code itself.",
        },
        {
          role: "user", 
          content: prompt,
        },
      ],
      temperature: 0.3, // Lower temperature for more deterministic responses
    });

    const response = completion.choices[0].message.content; // Ensure the response structure is correct
    console.log(response);

    // Ensure the return is always a string, handle null case
    return response || ""; // Default to an empty string if response is null

  } catch (error) {
    console.error("[CodeTranslator]", error);
    // Handle error by returning a string
    return "Internal Error: Unable to generate code.";
  }
}
