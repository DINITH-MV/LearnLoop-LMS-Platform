import OpenAI from "openai";


export async function generateCode(prompt: string) {
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
          content: "generate a good quality code based on the {prompt} given by the user. The code should have proper indentation, be well-structured, and not use unnecessary characters. Ensure to use proper comments. Do not add any special characters (e.g: ```, ```html, ```python etc) at the beginning and end of the code block. prompt:" + prompt + "do not include ``` in the code block.",
        },
      ],
      temperature: 0.8, // Lower temperature for more deterministic responses
    });
        
    const response = completion.choices[0].message.content; // Ensure the response structure is correct
    console.log(response);
    return (response.text());

  } catch (error) {
    console.error("[CodeTranslator]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
