
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

const roleRoutes = {
  user: "/dashboard/user",
  writer: "/dashboard/writer",
  admin: "/dashboard/admin",
};

export default function DashboardIndexPage() {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    router.replace(roleRoutes[role] || "/dashboard/user");
  }, [isLoading, role, router]);

  return <DashboardLoader />;
}