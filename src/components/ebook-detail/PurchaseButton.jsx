"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";

export default function PurchaseButton({ ebookId, isLoggedIn, isOwner, purchased }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (isOwner) {
    return (
      <button
        disabled
        className="flex-1 cursor-not-allowed rounded-lg bg-gray-200 py-3 text-sm font-semibold text-gray-500 dark:bg-gray-800"
      >
        This is your ebook
      </button>
    );
  }

  if (purchased) {
    return (
      <button
        disabled
        className="flex-1 rounded-lg bg-green-100 py-3 text-sm font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400"
      >
        Already Purchased
      </button>
    );
  }

  const handleBuy = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const { url } = await apiClient.post("/purchases/checkout-session", { ebookId });
      window.location.href = url;
    } catch (error) {
      toast.error(error.message || "Could not start checkout!");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="flex-1 rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
    >
      {loading ? "Redirecting to checkout..." : "Buy Now"}
    </button>
  );
}