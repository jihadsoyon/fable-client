"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-gray-950">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
        <AlertTriangle size={28} />
      </div>
      <h1 className="mt-5 text-xl font-bold text-gray-900 dark:text-gray-100">
        Something went wrong.
      </h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        An unexpected error occurred. Please try reloading the page.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        <RefreshCcw size={16} />
        Reload
      </button>
    </div>
  );
}