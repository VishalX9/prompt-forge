import { NextResponse, NextRequest } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { promptText } = await req.json();

    if (!promptText) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    
    const emojiPrompt = `
You are an AI that generates custom emoji-style images based on creative prompts. 
Always output the subject in a clean, colourful, high-quality *emoji art style*, not realistic. 
Make the design simple, visually expressive, and fit in a square emoji format.

Prompt: "${promptText}"
    `.trim();

    const imageResponse = await genAI.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        {
          role: "user",
          parts: [{ text: emojiPrompt }],
        },
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const imageCandidate = imageResponse?.candidates?.[0];
    const imageParts = imageCandidate?.content?.parts;

    if (!imageParts || !Array.isArray(imageParts)) {
      throw new Error("No image content parts found in the response.");
    }

    const imagePart = imageParts.find((part) => part.inlineData?.data);

    if (!imagePart || !imagePart.inlineData?.data) {
      throw new Error("Image generation failed: no image data found.");
    }

    const imageUrl = `data:image/png;base64,${imagePart.inlineData.data}`;

 
    const descriptionPrompt = `Provide a concise, creative description of an emoji based on the following prompt: "${promptText}". The description should be 1-2 sentences, capturing the essence and style of the emoji.`;

    const descriptionResponse = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
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

    const descriptionCandidate = descriptionResponse?.candidates?.[0];
    const descriptionParts = descriptionCandidate?.content?.parts;

    if (!descriptionParts || !Array.isArray(descriptionParts)) {
      throw new Error("No description content parts found.");
    }

    const descriptionPart = descriptionParts.find((part) => part.text);

    if (!descriptionPart || !descriptionPart.text) {
      throw new Error("Description generation failed: no text returned.");
    }

    const description = descriptionPart.text;

    return NextResponse.json(
      {
        success: true,
        image: imageUrl,
        description,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate emoji",
        details: error?.message || "Unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
