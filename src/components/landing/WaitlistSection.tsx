"use client";

import { FormEvent, useState } from "react";
import { Button, Input } from "@/components/ui";

/**
 * Landing page feedback 섹션
 */
export default function WaitlistSection() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    const trimmedEmail = email.trim();

    if (!trimmedMessage || !trimmedEmail) {
      setError("Please fill in both feedback and email.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          email: trimmedEmail,
          emotion: "curious",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Failed to send feedback. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setMessage("");
      setEmail("");
    } catch {
      setError("Failed to send feedback. Please try again.");
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <div className="max-w-2xl mx-auto px-6 text-center">
      <div className="bg-dark-base rounded-hero p-12 md:p-16">
        <h2 className="font-display text-type-h2 md:text-type-h1 font-bold text-headline mb-4">
          Share your thoughts on CodenameLove
        </h2>
        <p className="text-type-body-sm mb-8 text-body-secondary">
          Leave your feedback and we&apos;ll reply by email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-left max-w-xl mx-auto"
        >
          <div>
            <label className="block text-type-body-sm mb-2 text-body-secondary">
              Feedback
            </label>
            <textarea
              className="w-full rounded-card bg-content-frame/80 border border-white/10 px-4 py-3 text-type-body-sm text-input-card-text placeholder:text-body-secondary/70 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0 focus:border-transparent min-h-[120px] resize-vertical"
              placeholder="I think the pro price is too expensive"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-type-body-sm mb-2 text-body-secondary">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-type-body-xs text-red-400">
              {error}
            </p>
          )}
          {status === "success" && (
            <p className="text-type-body-xs text-emerald-400">
              Thank you for your feedback!
            </p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-card py-3"
            >
              {isSubmitting ? "Sending..." : "Submit Feedback"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
