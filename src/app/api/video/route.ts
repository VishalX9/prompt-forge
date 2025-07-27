// src/app/api/video/route.ts

import { NextRequest, NextResponse } from "next/server";
import RunwayML, { TaskFailedError } from "@runwayml/sdk";

// Define a type for the exact ratio strings expected by RunwayML.
// This union type comes directly from the TypeScript error message.
type RunwayMLRatio =
  | "1280:720"
  | "720:1280"
  | "1104:832"
  | "832:1104"
  | "960:960"
  | "1584:672"
  | "1280:768"
  | "768:1280";

// Initialize RunwayML client with API key from environment variables.
// The '!' asserts that the environment variable will be defined,
// but robust error handling for its absence is also included below.
const client = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET!,
});

// A default image URL to be used as the promptImage for RunwayML.
// This is required by RunwayML's imageToVideo model.
// Updated to use a more reliable placeholder image service.

const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/640px-Hopetoun_falls.jpg";

// Map user-friendly aspect ratio strings to RunwayML's required pixel dimensions.
// Updated to include all ratios from the error message.
const ratioMap: Record<string, RunwayMLRatio> = {
  "16:9": "1280:720", // Landscape (Standard HD)
  "9:16": "720:1280", // Portrait (Standard HD Vertical)
  "1:1": "960:960",   // Square (Common for social media)
  "4:3": "1104:832",  // Traditional TV/Monitor (approx)
  "3:4": "832:1104",  // Traditional TV/Monitor Vertical (approx)
  "21:9": "1584:672", // Ultrawide (approx)
  "5:3": "1280:768",  // Wider than 16:9 (approx)
  "3:5": "768:1280",  // Taller than 9:16 (approx)
};

/**
 * Handles POST requests to generate a video using RunwayML.
 * Expects a JSON body with:
 * - promptText: string (description of the video)
 * - aspectRatio: string (e.g., "16:9", "9:16", "1:1", "4:3", etc.)
 * - duration: number (video length in seconds, 1-10)
 */
export async function POST(request: NextRequest) {
  console.log('API route hit - generate-video');

  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Destructure and provide default values for incoming parameters.
    const {
      promptText,
      aspectRatio = '16:9', // Default to 16:9 if not provided
      duration = 5,       // Default to 5 seconds if not provided
    } = body;

    // --- Input Validation ---

    if (!promptText || typeof promptText !== 'string' || promptText.trim().length === 0) {
      return NextResponse.json(
        { error: 'promptText is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Resolve the aspect ratio using the map.
    // Explicitly cast to RunwayMLRatio to satisfy TypeScript, as we know the map
    // only contains valid RunwayMLRatio values.
    const resolvedRatio: RunwayMLRatio | undefined = ratioMap[aspectRatio];

    if (!resolvedRatio) {
      const supportedRatios = Object.keys(ratioMap).join(', ');
      return NextResponse.json(
        { error: `Unsupported aspect ratio. Must be one of: ${supportedRatios}` },
        { status: 400 }
      );
    }

    if (!Number.isInteger(duration) || duration < 1 || duration > 10) {
      return NextResponse.json(
        { error: 'Duration must be an integer between 1 and 10 seconds' },
        { status: 400 }
      );
    }

    // Check for RunwayML API key presence.
    if (!process.env.RUNWAYML_API_SECRET) {
      console.error('RUNWAYML_API_SECRET not found in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error: RunwayML API key missing' },
        { status: 500 }
      );
    }

    console.log('Creating RunwayML task with:', {
      promptText: promptText.trim(),
      resolvedRatio,
      duration,
      promptImage: DEFAULT_IMAGE,
    });

    // --- Call RunwayML API ---
    const task = await client.imageToVideo.create({
      model: 'gen4_turbo',
      promptImage: DEFAULT_IMAGE, // Using a default image as per your previous code
      promptText: promptText.trim(),
      ratio: resolvedRatio, // Use the resolved pixel dimensions, now correctly typed
      duration,
    });

    console.log('Task created, waiting for output...');
    const result = await (task as any).waitForTaskOutput(); // Cast to 'any' for waitForTaskOutput

    console.log('RunwayML Task result status:', result.status);

    // Check if the task succeeded.
    if (result.status !== 'SUCCEEDED' && result.status !== 'succeeded') {
      console.error('RunwayML video generation failed:', result);
      return NextResponse.json(
        {
          error: 'Video generation failed on RunwayML side',
          status: result.status,
          details: result,
        },
        { status: 500 }
      );
    }

    // --- Extract Video URL ---
    // Robustly try to find the video URL from various possible paths in the result object.
    const videoUrl =
      result?.output?.videoUrl ||
      result?.output?.video ||
      result?.output?.url ||
      result?.videoUrl ||
      result?.video ||
      result?.url ||
      result?.outputs?.[0]?.url ||
      result?.outputs?.[0]?.videoUrl;

    if (!videoUrl) {
      console.error('No video URL found in RunwayML result:', result);
      return NextResponse.json(
        { error: 'No video URL found in RunwayML response', output: result },
        { status: 500 }
      );
    }

    console.log('Video generated successfully:', videoUrl);
    return NextResponse.json({
      success: true,
      videoUrl,
      taskId: result.id, // Optionally return task ID for debugging/tracking
    });

  } catch (error) {
    console.error('API Error during video generation:', error);

    // Provide more specific error messages if it's a known RunwayML error type.
    let errorMessage = 'Unknown error during video generation.';
    if (error instanceof TaskFailedError) {
      errorMessage = `RunwayML task failed: ${error.message}`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        error: 'Failed to generate video',
        message: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? (error as Error)?.stack : undefined,
      },
      { status: 500 }
    );
  }
}
