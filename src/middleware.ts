import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next/image|favicon.ico).*)",
    "/api/(.*)",
  ],
};
