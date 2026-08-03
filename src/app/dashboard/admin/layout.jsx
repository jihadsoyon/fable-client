"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, BookOpen, Receipt, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

const links = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
  { href: "/dashboard/admin/ebooks", label: "Manage Ebooks", icon: BookOpen },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: Receipt },
];

export default function AdminDashboardLayout({ children }) {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (role !== "admin") {
      router.replace("/dashboard/user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, role]);

  if (isLoading || role !== "admin") return <DashboardLoader />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <DashboardSidebar links={links} title="Admin Dashboard" />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}