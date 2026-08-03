"use client";

import { useEffect, useState } from "react";
import { Users, PenSquare, BookCheck, DollarSign } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";
import StatCard from "@/components/dashboard/StatCard";
import MonthlySalesChart from "@/components/dashboard/MonthlySalesChart";
import GenrePieChart from "@/components/dashboard/GenrePieChart";

export default function AdminOverviewPage() {
  const [summary, setSummary] = useState(null);
  const [genreData, setGenreData] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get("/analytics/summary"),
      apiClient.get("/analytics/genre-distribution"),
      apiClient.get("/transactions/stats/monthly-sales"),
    ])
      .then(([summaryData, genre, sales]) => {
        setSummary(summaryData);
        setGenreData(genre);
        setMonthlySales(sales);
      })
      .catch((error) => toast.error(error.message || "Failed to load dashboard analytics!"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-72 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={summary?.totalUsers ?? 0}
          accent="bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        />
        <StatCard
          icon={PenSquare}
          label="Total Writers"
          value={summary?.totalWriters ?? 0}
          accent="bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
        />
        <StatCard
          icon={BookCheck}
          label="Ebooks Sold"
          value={summary?.totalEbooksSold ?? 0}
          accent="bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`$${(summary?.totalRevenue ?? 0).toFixed(2)}`}
          accent="bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Monthly Sales
          </h2>
          <MonthlySalesChart data={monthlySales} />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
            Ebooks by Genre
          </h2>
          <GenrePieChart data={genreData} />
        </div>
      </div>
    </div>
  );
}