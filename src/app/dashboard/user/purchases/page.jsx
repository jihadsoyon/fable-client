
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";

import EmptyDashboardState from "../../EmptyDashboardState";
import TableSkeleton from "../../TableSkeleton";

export default function PurchaseHistoryPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/purchases/me")
      .then((data) => setPurchases(data))
      .catch((error) => toast.error(error.message || "Failed to load purchase history!"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 font-display text-xl font-bold text-ink-800 dark:text-parchment-100">
          Purchase History
        </h1>
        <TableSkeleton rows={4} cols={4} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink-800 dark:text-parchment-100">
        Purchase History
      </h1>

      {purchases.length === 0 ? (
        <EmptyDashboardState
          icon={ShoppingBag}
          title="No purchases yet"
          description="Ebooks you buy will show up here with their purchase details."
          ctaLabel="Browse Ebooks"
          ctaHref="/ebooks"
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-parchment-300 dark:border-ink-700">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-parchment-300 bg-parchment-100 text-xs uppercase tracking-wide text-ink-700/60 dark:border-ink-700 dark:bg-ink-800/60 dark:text-parchment-300/60">
              <tr>
                <th className="px-4 py-3 font-medium">Ebook</th>
                <th className="px-4 py-3 font-medium">Writer</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Purchase Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-200 dark:divide-ink-700">
              {purchases.map((purchase) => (
                <tr
                  key={purchase.ebookId}
                  className="bg-parchment-50 transition-colors hover:bg-parchment-100 dark:bg-ink-900 dark:hover:bg-ink-800"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/ebooks/${purchase.ebookId}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-md border border-parchment-300 dark:border-ink-700">
                        <Image
                          src={purchase.coverImage}
                          alt={purchase.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="line-clamp-1 font-medium text-ink-800 hover:text-gold-600 dark:text-parchment-100 dark:hover:text-gold-400">
                        {purchase.title}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-700/70 dark:text-parchment-300/70">
                    {purchase.writerName}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink-800 dark:text-parchment-100">
                    ${purchase.amount}
                  </td>
                  <td className="px-4 py-3 text-ink-700/70 dark:text-parchment-300/70">
                    {new Date(purchase.purchasedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                      Purchased
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}