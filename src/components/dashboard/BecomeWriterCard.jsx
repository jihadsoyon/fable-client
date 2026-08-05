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
    <div className="rounded-2xl border border-gold-600/30 bg-gold-50 p-6 dark:border-gold-500/20 dark:bg-gold-500/5">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700 dark:bg-gold-500/20 dark:text-gold-400">
          <Sparkles size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-ink-900 dark:text-parchment-100">
            {title}
          </h3>
          <p className="mt-1 font-body text-sm text-ink-700 dark:text-parchment-300">
            {description}
          </p>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="mt-4 cursor-pointer rounded-lg bg-gold-600 px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-gold-700 disabled:opacity-60"
          >
            {loading ? "Redirecting to checkout..." : buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}