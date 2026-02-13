import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PLATFORM_CONTEXT = `
You are an AI assistant for LearnLoop, an educational platform with the following features:

 PLATFORM FEATURES:

1. Interactive Learning
   - Social learning environment with peer collaboration
2. AI-Powered Tools:
   - Image to Code Analyzer: Convert images to readable code
   - Code Refactor: Java code optimization and improvement
   - Code Generator: AI-powered code creation
   - Code Debugger: Error detection and resolution
   - Code Compiler: Multi-language code compilation
   - Code Translator: Convert between programming languages

3. Career-Focused Learning
   - Portfolio building and employer visibility

4. Course Management
   - Interactive courses with progress tracking

 HOW TO USE THIS PLATFORM:

- Ask coding questions and get instant help
- Upload code for analysis and optimization
- Get career advice for software development
- Request code examples in any programming language
- Debug errors with detailed explanations
- Learn best practices and coding patterns

 RESPONSE FORMAT RULES:
- NEVER use asterisks (*) for formatting - they show as ugly symbols
- NEVER use markdown bold (**text**) - just use plain text
- Use clear line breaks between sections
- Keep paragraphs short and readable
- Use numbered lists for step-by-step instructions
- Add spacing between different topics
- Use emojis for emphasis instead of bold formatting
- Make responses scannable and easy to read
- Use CAPITAL LETTERS for important emphasis instead of asterisks
- Always format responses in plain text without any markdown symbols

CRITICAL: Do not use ** or * symbols anywhere in your response. Use plain text only.

Always provide helpful, educational responses that are easy to read and understand.
`;

export async function getAssistant(
  prompt: any,
  retryCount = 0,
): Promise<string> {
  const maxRetries = 3;
  const backoffDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: PLATFORM_CONTEXT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 0.9,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    return content;
  } catch (error: any) {
    console.error(`Attempt ${retryCount + 1} failed:`, error.message);

    if (retryCount < maxRetries) {
      console.log(`Retrying in ${backoffDelay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, backoffDelay));
      return getAssistant(prompt, retryCount + 1);
    }

    // Return a helpful fallback response instead of throwing
    return "I'm experiencing technical difficulties right now. Please try again in a moment, or explore our other AI features like Code Generator, Debugger, or Image to Code Analyzer.";
  }
}
