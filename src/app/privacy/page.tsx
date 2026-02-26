import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-headline mb-4">Privacy Policy</h1>
      <p className="text-body-secondary text-sm">Content coming soon.</p>
      <Link href="/" className="text-accent-primary hover:underline mt-6 inline-block">
        ← Back to Landing
      </Link>
    </main>
  );
}
