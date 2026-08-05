
"use client";

import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import EmptyDashboardState from "../../EmptyDashboardState";
import TableSkeleton from "../../TableSkeleton";

export default function SalesHistoryPage() {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    apiClient
      .get(`/purchases/writer/${user.id}`)
      .then((data) => setSales(data))
      .catch((error) => toast.error(error.message || "Failed to load sales history!"))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 font-display text-xl font-bold text-ink-900 dark:text-parchment-100">
          Sales History
        </h1>
        <TableSkeleton rows={4} cols={3} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-xl font-bold text-ink-900 dark:text-parchment-100">
          Sales History
        </h1>
        {sales.length > 0 && (
          <div className="rounded-lg bg-gold-100 px-4 py-2 font-body text-sm font-semibold text-gold-700 dark:bg-gold-500/10 dark:text-gold-400">
            Total Revenue: ${totalRevenue.toFixed(2)}
          </div>
        )}
      </div>

      {sales.length === 0 ? (
        <EmptyDashboardState
          icon={BarChart3}
          title="No sales yet"
          description="Once readers purchase your ebooks, their sales will appear here."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gold-600/20 dark:border-gold-600/20">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gold-600/20 bg-parchment-100 font-body text-xs uppercase tracking-wide text-ink-700/70 dark:border-gold-600/20 dark:bg-ink-800">
              <tr>
                <th className="px-4 py-3 font-medium">Ebook Title</th>
                <th className="px-4 py-3 font-medium">Buyer</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-200 dark:divide-ink-700">
              {sales.map((sale, i) => (
                <tr
                  key={i}
                  className="bg-white transition-colors hover:bg-parchment-50 dark:bg-ink-900 dark:hover:bg-ink-800"
                >
                  <td className="px-4 py-3 font-body font-medium text-ink-900 dark:text-parchment-100">
                    {sale.ebookTitle}
                  </td>
                  <td className="px-4 py-3 font-body text-ink-700 dark:text-parchment-200">
                    {sale.buyerName}
                  </td>
                  <td className="px-4 py-3 font-body font-medium text-gold-600">
                    ${sale.amount}
                  </td>
                  <td className="px-4 py-3 font-body text-ink-700 dark:text-parchment-200">
                    {new Date(sale.purchasedAt).toLocaleDateString()}
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