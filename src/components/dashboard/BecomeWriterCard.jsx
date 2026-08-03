"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";

export default function BecomeWriterCard({
  title = "Become a Writer",
  description = "Pay a one-time verification fee to unlock ebook publishing on Fable.",
  buttonLabel = "Verify & Start Publishing",
}) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { url } = await apiClient.post("/writer-verification/checkout-session");
      window.location.href = url;
    } catch (error) {
      toast.error(error.message || "Could not start verification checkout!");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-500/20 dark:bg-brand-500/5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400">
          <Sparkles size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="mt-4 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? "Redirecting to checkout..." : buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}