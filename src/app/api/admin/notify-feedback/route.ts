import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

type FeedbackRow = {
  id: number;
  email: string;
  message: string | null;
  emotion: string | null;
  created_at: string;
  notified_at: string | null;
};

type WaitlistRow = {
  id: string;
  email: string;
  notified_at: string | null;
};

const adminSecret = process.env.ADMIN_NOTIFICATION_SECRET;
const appBaseUrl = process.env.APP_BASE_URL ?? "https://codename-love.example";

function createSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase env not configured");
  }

  return createClient(url, key);
}

function createResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

async function sendCampaignEmail(resend: Resend, email: string) {
  const campaignUrl = `${appBaseUrl}/?campaign=waitlist_open`;

  const subject = "CodenameLove is now open for you";

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; color: #111827;">
      <h1 style="font-size: 24px; margin-bottom: 16px;">Thank you for joining CodenameLove early</h1>
      <p style="margin: 0 0 12px 0;">
        You shared your interest in CodenameLove through our waitlist or feedback form.
        We&apos;re now getting ready to open the experience to early users.
      </p>
      <p style="margin: 0 0 24px 0;">
        Click the button below to visit the latest version of CodenameLove.
        When you share this link in messengers or social media, the page will show a rich Open Graph preview.
      </p>
      <p style="text-align: center; margin: 0 0 24px 0;">
        <a href="${campaignUrl}" style="display: inline-block; padding: 12px 24px; border-radius: 9999px; background: #111827; color: #F9FAFB; text-decoration: none; font-weight: 600;">
          Open CodenameLove
        </a>
      </p>
      <p style="font-size: 12px; color: #6B7280; margin-top: 24px;">
        If the button does not work, copy and paste this URL into your browser:<br/>
        <a href="${campaignUrl}" style="color: #111827;">${campaignUrl}</a>
      </p>
    </div>
  `;

  await resend.emails.send({
    from: "CodenameLove <notifications@codename-love.app>",
    to: email,
    subject,
    html,
  });
}

async function notifyTable<T extends { id: number | string; email: string | null; notified_at: string | null }>(
  table: "feedback" | "waitlist_users"
) {
  const supabase = createSupabaseServiceClient();
  const resend = createResendClient();

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .is("notified_at", null)
    .not("email", "is", null);

  if (error) {
    throw new Error(`Failed to load ${table}: ${error.message}`);
  }

  const rows = (data ?? []) as T[];

  if (!rows.length) {
    return { table, sent: 0, updated: 0, errors: [] as string[] };
  }

  const errors: string[] = [];
  const succeededIds: (number | string)[] = [];

  for (const row of rows) {
    if (!row.email) continue;
    try {
      await sendCampaignEmail(resend, row.email);
      succeededIds.push(row.id);
    } catch (err) {
      console.error(`Failed to send email to ${row.email} in ${table}:`, err);
      errors.push(row.email);
    }
  }

  let updated = 0;
  if (succeededIds.length) {
    const { error: updateError } = await supabase
      .from(table)
      .update({ notified_at: new Date().toISOString() })
      .in("id", succeededIds);

    if (updateError) {
      console.error(`Failed to update notified_at for ${table}:`, updateError);
    } else {
      updated = succeededIds.length;
    }
  }

  return { table, sent: succeededIds.length, updated, errors };
}

export async function POST(request: NextRequest) {
  try {
    if (!adminSecret) {
      return NextResponse.json(
        { error: "ADMIN_NOTIFICATION_SECRET is not configured" },
        { status: 503 }
      );
    }

    const headerSecret = request.headers.get("x-admin-notification-secret");
    if (!headerSecret || headerSecret !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [feedbackResult, waitlistResult] = await Promise.all([
      notifyTable<FeedbackRow>("feedback"),
      notifyTable<WaitlistRow>("waitlist_users"),
    ]);

    return NextResponse.json({
      feedback: feedbackResult,
      waitlist: waitlistResult,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

