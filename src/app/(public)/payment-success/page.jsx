
import { Suspense } from "react";
import PaymentSuccessClient from "@/components/payment/PaymentSuccessClient";

export const metadata = {
  title: "Payment Success — Fable",
};

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-200 border-t-gold-600 dark:border-ink-700 dark:border-t-gold-400" />
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}