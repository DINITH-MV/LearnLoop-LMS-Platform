import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAssistant } from "./conversationModel";

const RESPONSE_GUIDELINES = `
Please follow these response guidelines:

 FORMATTING RULES:
- Use clear numbered lists (1. 2. 3.) instead of bold headers
- Keep explanations concise but comprehensive
- Include practical examples when possible
- Use code blocks for code snippets
- Provide step-by-step instructions for complex topics
- NEVER use asterisks for bold formatting - use plain text with emojis instead

 FOCUS AREAS:
- Educational value and learning outcomes
- Practical application in real projects
- Best practices and industry standards
- Code quality and optimization tips
- Career development advice

 TEXT FORMATTING:
- Use emojis for section headers (🚀 📝 💡 ⚡ 🔧)
- Use clear line breaks between sections
- Keep paragraphs short and scannable
- Avoid markdown bold formatting completely
- Use CAPS for emphasis when needed
`;

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { question } = await req.json();

    if (!question || question.trim() === "") {
      return NextResponse.json(
        {
          error: "Please provide a valid question.",
          suggestions: [
            "Ask about programming concepts",
            "Request code examples",
            "Get debugging help",
            "Learn about our platform features",
          ],
        },
        { status: 400 },
      );
    }

    const enhancedQuestion = `${RESPONSE_GUIDELINES}\n\nUser Question: ${question}`;

    const response = await getAssistant(enhancedQuestion);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("[CodeAssistant Error]:", error);

    // Provide helpful error responses
    const errorResponse = {
      error: "I'm experiencing some technical difficulties. Please try again.",
      suggestions: [
        "Check your internet connection",
        "Try rephrasing your question",
        "Contact support if the issue persists",
      ],
      fallback:
        "You can also explore our other AI tools like Code Generator, Debugger, or Image to Code Analyzer while I recover.",
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
