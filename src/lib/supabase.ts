import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase 클라이언트 (브라우저용)
 * - Waitlist, Feedback 등 저장에 사용
 * - env 미설정 시 null 반환
 */
let supabase: SupabaseClient | null = null;

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export { supabase };
