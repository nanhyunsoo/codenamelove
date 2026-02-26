import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="font-display text-type-h2 font-bold text-headline mb-4">Contact</h1>
      <p className="text-type-body-sm text-body-secondary">contact@codename love.io</p>
      <Link href="/" className="text-type-body text-accent-primary hover:underline mt-6 inline-block">
        ← Back to Landing
      </Link>
    </main>
  );
}
