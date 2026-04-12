import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(request: Request) {
  const { password } = await request.json();
  const correctPassword = process.env.ASSESSMENT_PASSWORD;

  if (!correctPassword) {
    return NextResponse.json(
      { error: "Assessment not configured" },
      { status: 500 }
    );
  }

  // Timing-safe comparison
  const a = Buffer.from(password || "");
  const b = Buffer.from(correctPassword);

  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Generate a simple session token
  const token = crypto.randomBytes(32).toString("hex");

  const response = NextResponse.json({ success: true });
  response.cookies.set("assessment_auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return response;
}
