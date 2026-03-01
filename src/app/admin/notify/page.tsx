"use client";

import { useState } from "react";

export default function AdminNotifyPage() {
  const [secret, setSecret] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/notify-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-notification-secret": secret,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Failed to trigger notification");
        return;
      }

      setResult(
        JSON.stringify(
          {
            feedback: data.feedback,
            waitlist: data.waitlist,
          },
          null,
          2
        )
      );
    } catch {
      setError("Failed to call notification API");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-xl bg-dark-base rounded-3xl border border-white/10 p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">
            Send campaign emails to waitlist &amp; feedback users
          </h1>
          <p className="text-sm text-white/70">
            Enter the admin notification secret and click the button below to
            send campaign emails. Only users who have not been notified yet
            (notified_at is null) will receive an email.
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-white/80">
            Admin notification secret
          </label>
          <input
            type="password"
            className="w-full rounded-lg bg-black border border-white/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <p className="text-xs text-white/50">
            Use the same value as <code>ADMIN_NOTIFICATION_SECRET</code> in your
            environment variables.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || !secret}
          className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending emails..." : "Send campaign emails"}
        </button>

        {error && (
          <p className="text-xs text-red-400 whitespace-pre-wrap break-all">
            {error}
          </p>
        )}

        {result && (
          <pre className="text-xs bg-black/60 border border-white/10 rounded-lg p-3 max-h-60 overflow-auto">
            {result}
          </pre>
        )}
      </div>
    </main>
  );
}

