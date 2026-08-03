"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function UserMenu() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-300"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/dashboard"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-400"
    >
      {user.name?.charAt(0)?.toUpperCase() || "U"}
    </Link>
  );
}