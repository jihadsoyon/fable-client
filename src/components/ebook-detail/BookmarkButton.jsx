"use client";

import { Heart } from "lucide-react";
import { useBookmark } from "@/hooks/useBookmark";
import { cn } from "@/lib/utils";

export default function BookmarkButton({ ebookId }) {
  const { bookmarked, toggleBookmark, loading, checking } = useBookmark(ebookId);

  if (checking) {
    return <div className="h-11 w-11 animate-pulse rounded-full bg-parchment-200 dark:bg-ink-800" />;
  }

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      aria-label="Toggle bookmark"
      className={cn(
        "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:opacity-60",
        bookmarked
          ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900 dark:bg-red-950/40"
          : "border-parchment-300 text-ink-700 hover:bg-parchment-100 dark:border-ink-700 dark:text-parchment-200 dark:hover:bg-ink-800"
      )}
    >
      <Heart size={18} fill={bookmarked ? "currentColor" : "none"} />
    </button>
  );
}