"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";
import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";
import BookmarkedEbookCard from "@/components/dashboard/BookmarkedEbookCard";

export default function WriterBookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/bookmarks")
      .then((data) => setBookmarks(data))
      .catch((error) => toast.error(error.message || "Failed to load bookmarks!"))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoved = (ebookId) => {
    setBookmarks((prev) => prev.filter((b) => b.ebookId !== ebookId));
  };

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
          Bookmarks
        </h1>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="aspect-[3/4] animate-pulse bg-gray-200 dark:bg-gray-800" />
              <div className="space-y-2 p-4">
                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
        Bookmarks
      </h1>

      {bookmarks.length === 0 ? (
        <EmptyDashboardState
          icon={Bookmark}
          title="No bookmarks yet"
          description="Save ebooks you're interested in and find them here later."
          ctaLabel="Browse Ebooks"
          ctaHref="/ebooks"
        />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {bookmarks.map((bookmark) => (
            <BookmarkedEbookCard
              key={bookmark.ebookId}
              bookmark={bookmark}
              onRemoved={handleRemoved}
            />
          ))}
        </div>
      )}
    </div>
  );
}