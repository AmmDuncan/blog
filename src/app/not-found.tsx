import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-serif text-7xl font-bold text-[var(--color-primary)] md:text-9xl">
        404
      </h1>
      <p className="mt-4 text-lg text-grey-400 dark:text-grey-200">
        This page doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-[var(--color-primary)] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
