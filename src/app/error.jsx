
"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-parchment-50 px-4 text-center dark:bg-ink-900">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
        <AlertTriangle size={28} />
      </div>
      <h1 className="mt-5 font-display text-xl font-bold text-ink-900 dark:text-parchment-100">
        Something went wrong.
      </h1>
      <p className="mt-2 max-w-sm font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
        An unexpected error occurred. Please try reloading the page.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 flex cursor-pointer items-center gap-2 rounded-lg bg-gold-600 px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-gold-700"
      >
        <RefreshCcw size={16} />
        Reload
      </button>
    </div>
  );
}