
"use client";

import { useEffect, useState } from "react";
import { Receipt, ChevronLeft, ChevronRight } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";
// import TableSkeleton from "@/components/dashboard/TableSkeleton";
import EmptyDashboardState from "../../EmptyDashboardState";
import TableSkeleton from "../../TableSkeleton";
// import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/transactions?page=${page}&limit=10`)
      .then((data) => {
        setTransactions(data.transactions || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((error) => toast.error(error.message || "Failed to load transactions!"))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 font-display text-xl font-bold text-ink-800 dark:text-parchment-100">
          All Transactions
        </h1>
        <TableSkeleton rows={6} cols={5} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink-800 dark:text-parchment-100">
        All Transactions
      </h1>

      {transactions.length === 0 ? (
        <EmptyDashboardState
          icon={Receipt}
          title="No transactions yet"
          description="Ebook purchases and writer verification fees will appear here."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-parchment-300 dark:border-ink-700">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-parchment-300 bg-parchment-100 text-xs uppercase tracking-wide text-ink-700/60 dark:border-ink-700 dark:bg-ink-800/60 dark:text-parchment-300/60">
                <tr>
                  <th className="px-4 py-3 font-medium">Transaction ID</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">User Email</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-parchment-200 dark:divide-ink-700">
                {transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="bg-parchment-50 transition-colors hover:bg-parchment-100 dark:bg-ink-900 dark:hover:bg-ink-800"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-ink-700/60 dark:text-parchment-300/60">
                      {tx._id}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          tx.type === "purchase"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                            : "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                        }`}
                      >
                        {tx.type === "purchase" ? "Ebook Purchase" : "Publishing Fee"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-700/70 dark:text-parchment-300/70">
                      {tx.userEmail || "—"}
                    </td>
                    <td className="px-4 py-3 font-medium text-ink-800 dark:text-parchment-100">
                      ${tx.amount}
                    </td>
                    <td className="px-4 py-3 text-ink-700/70 dark:text-parchment-300/70">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-parchment-300 disabled:opacity-40 dark:border-ink-700"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-ink-700/70 dark:text-parchment-300/70">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-parchment-300 disabled:opacity-40 dark:border-ink-700"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}