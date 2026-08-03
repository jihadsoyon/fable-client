"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";
import { Mail, ShieldCheck, CalendarDays } from "lucide-react";

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/users/me")
      .then((data) => setProfile(data))
      .catch((error) => toast.error(error.message || "Failed to load profile!"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    );
  }

  if (!profile) {
    return (
      <p className="text-sm text-gray-500">
        Couldn&apos;t load your profile. Please refresh the page.
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-400">
          {profile.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {profile.name}
          </h1>
          <span className="mt-1 inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            {profile.role}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-gray-100 pt-6 dark:border-gray-800">
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <Mail size={16} className="text-gray-400" />
          {profile.email}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <ShieldCheck size={16} className="text-gray-400" />
          {profile.role === "writer" && profile.writerVerified
            ? "Verified Writer"
            : profile.role === "admin"
            ? "Administrator"
            : "Reader Account"}
        </div>
        {profile.createdAt && (
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <CalendarDays size={16} className="text-gray-400" />
            Joined {new Date(profile.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}