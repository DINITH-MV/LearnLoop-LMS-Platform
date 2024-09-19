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
          content: "generate a good quality code based on the {prompt} given by the user. The code should have proper indentation, be well-structured, and not use unnecessary characters. Ensure to use proper comments. prompt:" + prompt + "do not include ``` in the code block.Do not add any special characters (e.g: ```, ```html, ```python etc) at the beginning and end of the code block. Do not include ``` in the code block. The code should be well-structured and properly indented. Ensure to use proper comments. Provide the code only",
        },
      ],
      temperature: 0.8, // Lower temperature for more deterministic responses
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
