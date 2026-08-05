
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment-50 px-4 py-12 dark:bg-ink-900">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 block text-center font-display text-2xl font-bold text-gold-600 dark:text-gold-400"
        >
          Fable
        </Link>
        <div className="rounded-2xl border border-parchment-300 bg-parchment-100 p-8 shadow-sm dark:border-ink-700 dark:bg-ink-800">
          {children}
        </div>
      </div>
    </div>
  );
}