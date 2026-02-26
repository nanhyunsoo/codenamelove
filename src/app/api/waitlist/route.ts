import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/waitlist
 * - Waitlist 등록
 * - email (required), source (default: landing)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, relationship_intent, source = "landing" } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "email is required" },
        { status: 400 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.error("Supabase env not configured");
      return NextResponse.json(
        { error: "Service not configured" },
        { status: 503 }
      );
    }

    const supabase = createClient(url, key);

    const { error } = await supabase.from("waitlist_users").insert({
      email: email.trim(),
      relationship_intent: relationship_intent || null,
      source: typeof source === "string" && source === "moltbook" ? "moltbook" : "landing",
    });

    if (error) {
      console.error("Supabase waitlist error:", error);
      return NextResponse.json(
        { error: "Failed to register" },
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
