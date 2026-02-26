import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/feedback
 * - message (string)
 * - emotion (string): excited | curious | skeptical
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, emotion } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("feedback").insert({
      message: message.trim(),
      emotion: emotion || "curious",
    });

    if (error) {
      console.error("Supabase feedback error:", error);
      return NextResponse.json(
        { error: "Failed to submit feedback" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
