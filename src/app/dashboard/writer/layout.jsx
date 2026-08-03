"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PenSquare, PlusCircle, BarChart3, Bookmark } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import BecomeWriterCard from "@/components/dashboard/BecomeWriterCard";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

const links = [
  { href: "/dashboard/writer", label: "Manage Ebooks", icon: PenSquare },
  { href: "/dashboard/writer/add", label: "Add Ebook", icon: PlusCircle },
  { href: "/dashboard/writer/sales", label: "Sales History", icon: BarChart3 },
  { href: "/dashboard/writer/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export default function WriterDashboardLayout({ children }) {
  const { role, writerVerified, isLoading } = useAuth();
  const router = useRouter();

  // Non-writer/non-admin users shouldn't land here at all
  useEffect(() => {
    if (isLoading) return;
    if (role !== "writer" && role !== "admin") {
      router.replace("/dashboard/user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, role]);

  if (isLoading) return <DashboardLoader />;
  if (role !== "writer" && role !== "admin") return <DashboardLoader />;

  // Writer role chosen but hasn't paid verification fee yet — gate the dashboard
  const isUnverifiedWriter = role === "writer" && !writerVerified;

  if (isUnverifiedWriter) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <BecomeWriterCard
          title="Complete Writer Verification"
          description="You're almost there! Complete the one-time verification payment to unlock your writer dashboard and start publishing ebooks."
          buttonLabel="Complete Verification"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <DashboardSidebar links={links} title="Writer Dashboard" />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}