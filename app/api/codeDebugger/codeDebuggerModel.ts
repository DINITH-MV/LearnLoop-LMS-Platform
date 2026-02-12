import OpenAI from "openai";

export async function debugCode(proLanguage: string, code: string): Promise<string> {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a code debugging expert. Analyze the provided code and identify any errors, bugs, or issues. Explain what's wrong and provide the corrected version with explanations. Be concise and focus on the specific problems.",
        },
        {
          role: "user", 
          content: `What is the problem with this ${proLanguage} code? Why is it not working as expected? How would you solve it?\n\nCode:\n${code}`,
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
    console.error("Code Debug Error:", error);
    return "Error: Unable to debug code. Please check your input and try again.";
  }
}
