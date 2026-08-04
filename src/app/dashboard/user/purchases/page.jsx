"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";
// import TableSkeleton from "@/components/dashboard/TableSkeleton";
import EmptyDashboardState from "../../EmptyDashboardState";
import TableSkeleton from "../../TableSkeleton";
// import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";

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
        <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
          Purchase History
        </h1>
        <TableSkeleton rows={4} cols={4} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
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
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:bg-gray-900/60">
              <tr>
                <th className="px-4 py-3 font-medium">Ebook</th>
                <th className="px-4 py-3 font-medium">Writer</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Purchase Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {purchases.map((purchase) => (
                <tr
                  key={purchase.ebookId}
                  className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/ebooks/${purchase.ebookId}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                        <Image
                          src={purchase.coverImage}
                          alt={purchase.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="line-clamp-1 font-medium text-gray-900 hover:text-brand-600 dark:text-gray-100">
                        {purchase.title}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {purchase.writerName}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    ${purchase.amount}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
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