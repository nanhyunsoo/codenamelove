import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="font-display text-type-h2 font-bold text-headline mb-4">Terms of Service</h1>
      <p className="text-type-body-sm text-body-secondary">Content coming soon.</p>
      <Link href="/" className="text-type-body text-accent-primary hover:underline mt-6 inline-block">
        ← Back to Landing
      </Link>
    </main>
  );
}
