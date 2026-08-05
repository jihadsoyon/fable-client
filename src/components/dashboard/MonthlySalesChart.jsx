"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function MonthlySalesChart({ data }) {
  const chartData = data.map((d) => ({
    label: `${monthNames[d._id.month - 1]} ${d._id.year}`,
    revenue: d.totalSales,
  }));

  if (chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center font-body text-sm text-ink-700/50 dark:text-parchment-200/50">
        No sales data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-parchment-200 dark:text-ink-700" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="currentColor" className="text-ink-700/60 dark:text-parchment-200/60" />
        <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-ink-700/60 dark:text-parchment-200/60" />
        <Tooltip
          contentStyle={{ borderRadius: 8, fontSize: 13, border: "1px solid #efe4cc" }}
          formatter={(value) => [`$${value}`, "Revenue"]}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#b8863a"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#b8863a" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}