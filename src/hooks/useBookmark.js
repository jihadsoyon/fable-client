"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";

export function useBookmark(ebookId) {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user || !ebookId) {
      setChecking(false);
      return;
    }

    apiClient
      .get(`/bookmarks/status?ebookId=${ebookId}`)
      .then((res) => setBookmarked(res.bookmarked))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [user, ebookId]);

  const toggleBookmark = async () => {
    if (!user) {
      toast.error("Please login to bookmark ebooks!");
      return;
    }

    setLoading(true);
    try {
      if (bookmarked) {
        await apiClient.delete("/bookmarks", { ebookId });
        setBookmarked(false);
        toast.success("Removed from bookmarks");
      } else {
        await apiClient.post("/bookmarks", { ebookId });
        setBookmarked(true);
        toast.success("Added to bookmarks");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { bookmarked, toggleBookmark, loading, checking };
}