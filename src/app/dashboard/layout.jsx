

"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

export default function DashboardLayout({ children }) {
  const { ready } = useRequireAuth();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-parchment-50 dark:bg-ink-900">
        {ready ? children : <DashboardLoader />}
      </main>
      <Footer />
    </>
  );
}