import { PenSquare } from "lucide-react";
import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";

export default function ManageEbooksPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
        Manage Ebooks
      </h1>

      <EmptyDashboardState
        icon={PenSquare}
        title="Manage Ebooks table coming next"
        description="Your published and draft ebooks will be listed here with edit, delete, and publish/unpublish controls."
      />
    </div>
  );
}