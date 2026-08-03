import { LayoutDashboard } from "lucide-react";
import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
        Dashboard Overview
      </h1>

      <EmptyDashboardState
        icon={LayoutDashboard}
        title="Analytics cards & charts coming next"
        description="Total users, writers, ebooks sold, revenue, and charts will appear here."
      />
    </div>
  );
}