"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { refetchSession } = useAuth();

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [purchaseType, setPurchaseType] = useState(null); // "purchase" | "writer_verification"
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMessage("Missing checkout session. Please try the payment again.");
      return;
    }

    let cancelled = false;

    const verify = async () => {
      // Try ebook purchase first
      try {
        await apiClient.post("/purchases/verify", { sessionId });
        if (cancelled) return;
        setPurchaseType("purchase");
        setStatus("success");
        return;
      } catch (purchaseError) {
        // Wrong session type -> fall through to writer verification check
        if (purchaseError.message !== "Invalid session type!") {
          if (!cancelled) {
            setStatus("error");
            setErrorMessage(purchaseError.message || "Could not verify your payment.");
          }
          return;
        }
      }

      // Fall back to writer verification
      try {
        await apiClient.post("/writer-verification/verify", { sessionId });
        if (cancelled) return;
        await refetchSession(); // pull updated role into the session
        setPurchaseType("writer_verification");
        setStatus("success");
      } catch (writerError) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(writerError.message || "Could not verify your payment.");
        }
      }
    };

    verify();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (status === "verifying") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <Loader2 size={40} className="animate-spin text-gold-600" />
        <p className="mt-4 font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
          Verifying your payment...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <XCircle size={48} className="text-red-500" />
        <h1 className="mt-4 font-display text-xl font-bold text-ink-900 dark:text-parchment-100">
          Payment Verification Failed
        </h1>
        <p className="mt-2 max-w-sm font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
          {errorMessage}
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/"
            className="rounded-lg border border-parchment-300 px-5 py-2.5 font-body text-sm font-medium text-ink-700 transition-colors hover:bg-parchment-100 dark:border-ink-700 dark:text-parchment-200 dark:hover:bg-ink-800"
          >
            Go Home
          </Link>
          <Link
            href="/ebooks"
            className="rounded-lg bg-gold-600 px-5 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-gold-700"
          >
            Browse Ebooks
          </Link>
        </div>
      </div>
    );
  }

  const isWriterUpgrade = purchaseType === "writer_verification";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
    >
      <CheckCircle2 size={52} className="text-green-500" />
      <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
        {isWriterUpgrade ? "You're now a verified writer!" : "Payment Successful!"}
      </h1>
      <p className="mt-2 max-w-sm font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
        {isWriterUpgrade
          ? "Your writer verification payment went through. You can now publish ebooks on Fable."
          : "Your purchase is confirmed. The full ebook content is now unlocked."}
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href={isWriterUpgrade ? "/dashboard/writer" : "/dashboard/user"}
          className="rounded-lg bg-gold-600 px-5 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-gold-700"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/ebooks"
          className="rounded-lg border border-parchment-300 px-5 py-2.5 font-body text-sm font-medium text-ink-700 transition-colors hover:bg-parchment-100 dark:border-ink-700 dark:text-parchment-200 dark:hover:bg-ink-800"
        >
          Browse More Ebooks
        </Link>
      </div>
    </motion.div>
  );
}