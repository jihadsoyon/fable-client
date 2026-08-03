"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";

export function useEbookStatus(ebookId) {
  const { user, isLoading: authLoading } = useAuth();
  const [purchased, setPurchased] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setPurchased(false);
      setBookmarked(false);
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
    } catch (error) {
      console.error("Failed to fetch ebook status:", error);
    } finally {
      setLoading(false);
    }
  }, [ebookId, user]);

  useEffect(() => {
    if (!authLoading) refresh();
  }, [authLoading, refresh]);

  return { purchased, bookmarked, loading: authLoading || loading, refresh, isLoggedIn: !!user };
}