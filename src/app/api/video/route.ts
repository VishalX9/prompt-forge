
import { NextRequest, NextResponse } from "next/server";
import RunwayML, { TaskFailedError } from "@runwayml/sdk";

type RunwayMLRatio =
  | "1280:720"
  | "720:1280"
  | "1104:832"
  | "832:1104"
  | "960:960"
  | "1584:672"
  | "1280:768"
  | "768:1280";

const client = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET!,
});


const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Hopetoun_falls.jpg/640px-Hopetoun_falls.jpg";

const ratioMap: Record<string, RunwayMLRatio> = {
  "16:9": "1280:720",
  "9:16": "720:1280",
  "1:1": "960:960",
  "4:3": "1104:832",
  "3:4": "832:1104",
  "21:9": "1584:672",
  "5:3": "1280:768",
  "3:5": "768:1280",
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

    const {
      promptText,
      aspectRatio = '16:9',
      duration = 5,
    } = body;


    if (!promptText || typeof promptText !== 'string' || promptText.trim().length === 0) {
      return NextResponse.json(
        { error: 'promptText is required and must be a non-empty string' },
        { status: 400 }
      );
    }

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

    const task = await client.imageToVideo.create({
      model: 'gen4_turbo',
      promptImage: DEFAULT_IMAGE,
      promptText: promptText.trim(),
      ratio: resolvedRatio,
      duration,
    });

    console.log('Task created, waiting for output...');
    const result = await (task as any).waitForTaskOutput();

    console.log('RunwayML Task result status:', result.status);

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
      taskId: result.id,
    });

  } catch (error) {
    console.error('API Error during video generation:', error);

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
