import { NextResponse ,NextRequest} from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }


        
    // Step 1: Generate image
   const imageResponse = await genAI.models.generateContent({
  model: "gemini-2.0-flash-preview-image-generation",
  contents: [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ],
  config: {
    responseModalities: [Modality.TEXT, Modality.IMAGE], // ✅ Fix applied here
  },
});


    const imagePart = imageResponse.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData
    );

    if (!imagePart || !imagePart.inlineData?.data) {
      throw new Error("Image data not found");
    }

    const imageUrl = `data:image/png;base64,${imagePart.inlineData.data}`;

    // Step 2: Generate description
    const descriptionPrompt = `Provide a 1-2 sentence description for an emoji with this concept: "${prompt}"`;

    const descriptionResponse = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: descriptionPrompt }],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT],
      },
    });

    const descriptionText =
      descriptionResponse.candidates?.[0]?.content?.parts?.find(
        (p) => p.text
      )?.text || "No description generated";
     

    return NextResponse.json({
      success: true,
      image: imageUrl,
      description: descriptionText,
    });
  } catch (err: any) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
