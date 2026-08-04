"use client";

import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
// import TableSkeleton from "@/components/dashboard/TableSkeleton";
import EmptyDashboardState from "../../EmptyDashboardState";
import TableSkeleton from "../../TableSkeleton";
// import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";

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
        <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
          Sales History
        </h1>
        <TableSkeleton rows={4} cols={3} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Sales History
        </h1>
        {sales.length > 0 && (
          <div className="rounded-lg bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
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
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:bg-gray-900/60">
              <tr>
                <th className="px-4 py-3 font-medium">Ebook Title</th>
                <th className="px-4 py-3 font-medium">Buyer</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {sales.map((sale, i) => (
                <tr
                  key={i}
                  className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                    {sale.ebookTitle}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {sale.buyerName}
                  </td>
                  <td className="px-4 py-3 font-medium text-brand-600">
                    ${sale.amount}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
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