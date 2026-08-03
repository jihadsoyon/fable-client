import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-gray-950">
      <svg
        width="220"
        height="160"
        viewBox="0 0 220 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brand-200 dark:text-brand-500/20"
      >
        <rect x="40" y="30" width="140" height="100" rx="10" fill="currentColor" />
        <rect x="60" y="50" width="100" height="10" rx="5" className="fill-brand-400 dark:fill-brand-500/40" />
        <rect x="60" y="70" width="70" height="8" rx="4" className="fill-brand-300 dark:fill-brand-500/30" />
        <rect x="60" y="86" width="85" height="8" rx="4" className="fill-brand-300 dark:fill-brand-500/30" />
        <circle cx="110" cy="115" r="10" className="fill-brand-500 dark:fill-brand-400" />
        <text
          x="110"
          y="120"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          className="fill-white"
        >
          ?
        </text>
      </svg>

      <h1 className="mt-6 text-6xl font-bold text-brand-600">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        <Home size={16} />
        Back to Home
      </Link>
    </div>
  );
}