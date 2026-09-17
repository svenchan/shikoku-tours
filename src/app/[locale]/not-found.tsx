import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <p className="text-xs tracking-[0.22em] text-sage uppercase">404</p>
      <h1 className="font-display mt-3 text-4xl text-forest">Page not found</h1>
      <p className="mt-4 text-muted">That URL isn’t on this site.</p>
      <p className="mt-2 text-muted">Die URL staat niet op deze site.</p>
      <div className="mt-10 flex justify-center gap-6 text-sm">
        <Link href="/en" className="text-accent hover:text-accent-dark">
          Home (EN)
        </Link>
        <Link href="/nl" className="text-accent hover:text-accent-dark">
          Home (NL)
        </Link>
      </div>
    </div>
  );
}
