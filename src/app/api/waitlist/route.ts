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

    // .env.example placeholder 사용 시 연결 불가 → 503으로 안내
    if (
      url.includes("your-project.supabase.co") ||
      key.includes("your-") ||
      key === "your-anon-key" ||
      key === "your-service-role-key"
    ) {
      console.error(
        "[waitlist] Supabase placeholder env detected. Create a project at https://supabase.com and set real NEXT_PUBLIC_SUPABASE_URL and keys in .env.local (see .env.example)."
      );
      return NextResponse.json(
        { error: "Supabase not configured", code: "PLACEHOLDER_ENV" },
        { status: 503 }
      );
    }

    const supabase = createClient(url, key);

    let result: { error: { code?: string; message?: string; details?: unknown } | null };
    try {
      result = await supabase.from("waitlist_users").insert({
        email,
      });
    } catch (networkErr: unknown) {
      const msg = networkErr instanceof Error ? networkErr.message : String(networkErr);
      const cause = networkErr instanceof Error ? networkErr.cause : null;
      console.error(
        "[waitlist] Supabase connection failed (check URL/keys and network):",
        msg,
        cause ?? ""
      );
      return NextResponse.json(
        { error: "Could not reach database", code: "NETWORK_ERROR" },
        { status: 503 }
      );
    }

    const { error } = result;

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
