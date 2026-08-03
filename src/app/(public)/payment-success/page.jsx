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
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}   