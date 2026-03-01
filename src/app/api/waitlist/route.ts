import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/waitlist
 * - Waitlist 등록 (email만 저장)
 */
export async function POST(request: NextRequest) {
  try {
    let body: { email?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const email =
      typeof body?.email === "string" ? body.email.trim() : "";
    if (!email) {
      return NextResponse.json(
        { error: "email is required" },
        { status: 400 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.error(
        "[waitlist] Supabase env not configured. Set NEXT_PUBLIC_SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY) in .env.local"
      );
      return NextResponse.json(
        { error: "Service not configured" },
        { status: 503 }
      );
    }

    const supabase = createClient(url, key);

    const { error } = await supabase.from("waitlist_users").insert({
      email,
    });

    if (error) {
      // 중복 이메일 (Postgres unique_violation)
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "duplicate", message: "Already registered" },
          { status: 409 }
        );
      }
      // 테이블/컬럼 없음 등 스키마 문제
      if (
        error.code === "42P01" ||
        error.message?.includes("does not exist")
      ) {
        console.error(
          "[waitlist] Supabase schema error. Run migrations:",
          error.message
        );
        return NextResponse.json(
          { error: "Database not ready" },
          { status: 503 }
        );
      }
      console.error(
        "[waitlist] Supabase error:",
        error.code,
        error.message,
        error.details
      );
      return NextResponse.json(
        { error: "Failed to register" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[waitlist] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
