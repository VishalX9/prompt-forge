import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, type NextRequest } from "next/server";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { prompt, history = [] } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json({ error: "Valid prompt is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

  

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chatHistory = history.map((entry: { role: string; content: string }) => ({
      role: entry.role === "assistant" ? "model" : "user",
      parts: [{ text: entry.content }],
    }));

    const chat = model.startChat({ history: chatHistory });

    const result = await chat.sendMessage(prompt);
    const text = result.response.text();

   

    return NextResponse.json({ role: "assistant", content: text }, { status: 200 });
  } catch (error: any) {
    console.error("Conversation Route Error:", error.message || error);
    return NextResponse.json(
      { error: "Failed to get response", details: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
