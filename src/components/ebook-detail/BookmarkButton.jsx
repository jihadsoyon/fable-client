"use client";

import { Heart } from "lucide-react";
import { useBookmark } from "@/hooks/useBookmark";
import { cn } from "@/lib/utils";

export default function BookmarkButton({ ebookId }) {
  const { bookmarked, toggleBookmark, loading, checking } = useBookmark(ebookId);

  if (checking) {
    return <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />;
  }

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      aria-label="Toggle bookmark"
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:opacity-60",
        bookmarked
          ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900 dark:bg-red-950/40"
          : "border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
      )}
    >
      <Heart size={18} fill={bookmarked ? "currentColor" : "none"} />
    </button>
  );
}