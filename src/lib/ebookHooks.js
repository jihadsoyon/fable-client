"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";

export function useEbookStatus(ebookId) {
  const { user, isLoading: authLoading } = useAuth();
  const [purchased, setPurchased] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setPurchased(false);
      setBookmarked(false);
      setContent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [purchaseRes, bookmarkRes] = await Promise.all([
        apiClient.get(`/purchases/status?ebookId=${ebookId}`),
        apiClient.get(`/bookmarks/status?ebookId=${ebookId}`),
      ]);
      setPurchased(purchaseRes.purchased);
      setBookmarked(bookmarkRes.bookmarked);

      // If purchased (or owner/admin), re-fetch the ebook WITH the auth
      // token attached so the server can return the unlocked content —
      // the initial server-rendered fetch had no token to check against.
      if (purchaseRes.purchased) {
        const fullEbook = await apiClient.get(`/ebooks/${ebookId}`);
        setContent(fullEbook.content);
      }
    } catch (error) {
      console.error("Failed to fetch ebook status:", error);
    } finally {
      setLoading(false);
    }
  }, [ebookId, user]);

  useEffect(() => {
    if (!authLoading) refresh();
  }, [authLoading, refresh]);

  return {
    purchased,
    bookmarked,
    content,
    loading: authLoading || loading,
    refresh,
    isLoggedIn: !!user,
  };
}