import { auth } from "@clerk/nextjs/server";
import { NextResponse,NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // 2. Parse the request body
    const body = await req.json();
    if (!body || typeof body !== "object" || !("messages" in body)) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { messages } = body;
    if (!messages || messages.length === 0) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // 3. Check for API Key
    if (!process.env.GEMINI_KEY) {
      return new NextResponse("Gemini API Key not configured", { status: 500 });
    }

    // 4. Prepare the prompt with a system-level coding instruction
    const lastMessage = messages[messages.length - 1];
    const prompt = `You are a helpful programming assistant. ONLY provide coding solutions with code snippets or code comments. No extra explanation.\n\n${lastMessage.content}`;


    // 5. Generate response
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    // 6. Return model response

    return NextResponse.json({ content: text });
    

  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
