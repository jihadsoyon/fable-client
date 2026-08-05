"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-parchment-50 px-4 text-center">
          <h1 className="font-serif text-xl font-bold text-ink-900">Something went wrong.</h1>
          <p className="mt-2 max-w-sm font-serif text-sm text-ink-700/70">
            A critical error occurred. Please reload the page.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 cursor-pointer rounded-lg bg-gold-600 px-6 py-3 font-serif text-sm font-semibold text-white hover:bg-gold-700"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}