"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <h1 className="font-display text-4xl text-forest">Er ging iets mis</h1>
      <p className="mt-4 text-muted">Probeer het opnieuw.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 min-h-12 rounded-full bg-accent px-6 text-sm font-medium tracking-wide text-paper uppercase hover:bg-accent-dark"
      >
        Opnieuw
      </button>
    </div>
  );
}
