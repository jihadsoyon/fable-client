"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
          <h1 className="text-xl font-bold text-gray-900">Something went wrong.</h1>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            A critical error occurred. Please reload the page.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}   