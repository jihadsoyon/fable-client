"use client";

import { useEffect, useState } from "react";
import { Library } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";
// import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";
// import PurchasedEbookCard from "@/components/dashboard/PurchasedEbookCard";
import EmptyDashboardState from "../../EmptyDashboardState";
import PurchasedEbookCard from "../../PurchasedEbookCard";

export default function LibraryPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/purchases/me")
      .then((data) => setPurchases(data))
      .catch((error) => toast.error(error.message || "Failed to load your library!"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
          Purchased Ebooks
        </h1>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="aspect-[3/4] animate-pulse bg-gray-200 dark:bg-gray-800" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
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
        Purchased Ebooks
      </h1>

      {purchases.length === 0 ? (
        <EmptyDashboardState
          icon={Library}
          title="Your library is empty"
          description="Ebooks you purchase will appear here for easy access."
          ctaLabel="Browse Ebooks"
          ctaHref="/ebooks"
        />
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {purchases.map((purchase) => (
            <PurchasedEbookCard key={purchase.ebookId} purchase={purchase} />
          ))}
        </div>
      )}
    </div>
  );
}