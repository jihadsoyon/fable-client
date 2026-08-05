
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import { Mail, ShieldCheck, CalendarDays, Pencil, X, Check } from "lucide-react";
import BecomeWriterCard from "@/components/dashboard/BecomeWriterCard";
import AvatarUpload from "@/components/dashboard/AvatarUpload";
import FormField from "@/components/ui/FormField";

export default function UserProfilePage() {
  const { refetchSession } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // form state (only used while editing)
  const [form, setForm] = useState({ name: "", bio: "", image: "" });

  useEffect(() => {
    apiClient
      .get("/users/me")
      .then((data) => setProfile(data))
      .catch((error) => toast.error(error.message || "Failed to load profile!"))
      .finally(() => setLoading(false));
  }, []);

  const startEditing = () => {
    setForm({
      name: profile.name || "",
      bio: profile.bio || "",
      image: profile.image || "",
    });
    setEditing(true);
  };

  const cancelEditing = () => setEditing(false);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }

    setSaving(true);
    try {
      await apiClient.patch("/users/me", {
        name: form.name.trim(),
        bio: form.bio,
        image: form.image,
      });

      setProfile((prev) => ({ ...prev, ...form }));
      await refetchSession(); // keeps navbar avatar/name in sync
      toast.success("Profile updated!");
      setEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-20 w-20 animate-pulse rounded-full bg-parchment-200 dark:bg-ink-800" />
        <div className="h-5 w-40 animate-pulse rounded bg-parchment-200 dark:bg-ink-800" />
        <div className="h-4 w-56 animate-pulse rounded bg-parchment-200 dark:bg-ink-800" />
      </div>
    );
  }

  if (!profile) {
    return (
      <p className="font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
        Couldn&apos;t load your profile. Please refresh the page.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gold-600/20 bg-white p-6 dark:border-gold-600/20 dark:bg-ink-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {editing ? (
              <AvatarUpload
                value={form.image}
                onChange={(url) => setForm((f) => ({ ...f, image: url }))}
                fallbackText={form.name?.charAt(0)?.toUpperCase() || "U"}
              />
            ) : profile.image ? (
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-gold-400/30">
                <Image src={profile.image} alt={profile.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-100 font-display text-2xl font-bold text-gold-700 dark:bg-gold-500/20 dark:text-gold-400">
                {profile.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <div>
              {editing ? (
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full max-w-xs rounded-lg border border-parchment-300 bg-white px-3 py-1.5 font-display text-lg font-bold text-ink-900 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-900 dark:text-parchment-100"
                  placeholder="Your name"
                />
              ) : (
                <h1 className="font-display text-xl font-bold text-ink-900 dark:text-parchment-100">
                  {profile.name}
                </h1>
              )}
              <span className="mt-1 inline-block rounded-full bg-parchment-100 px-2.5 py-0.5 font-body text-xs font-medium capitalize text-ink-700 dark:bg-ink-700 dark:text-parchment-200">
                {profile.role}
              </span>
            </div>
          </div>

          {!editing ? (
            <button
              onClick={startEditing}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-gold-600/40 px-3 py-1.5 font-body text-sm font-medium text-ink-700 transition-colors hover:bg-gold-600/10 dark:border-gold-600/40 dark:text-parchment-200 dark:hover:bg-gold-600/10"
            >
              <Pencil size={14} />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={cancelEditing}
                disabled={saving}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-parchment-300 px-3 py-1.5 font-body text-sm font-medium text-ink-700 transition-colors hover:bg-parchment-100 disabled:opacity-50 dark:border-ink-700 dark:text-parchment-200 dark:hover:bg-ink-700"
              >
                <X size={14} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-gold-600 px-3 py-1.5 font-body text-sm font-medium text-white transition-colors hover:bg-gold-700 disabled:opacity-60"
              >
                <Check size={14} />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="mt-6 border-t border-parchment-200 pt-6 dark:border-ink-700">
          {editing ? (
            <FormField label="Bio">
              <textarea
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                maxLength={300}
                rows={3}
                placeholder="A short bio visible on your public profile..."
                className="w-full resize-none rounded-lg border border-parchment-300 bg-white px-3 py-2 font-body text-sm text-ink-800 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-900 dark:text-parchment-100"
              />
              <p className="mt-1 text-right font-body text-xs text-ink-700/50 dark:text-parchment-200/50">
                {form.bio.length}/300
              </p>
            </FormField>
          ) : (
            profile.bio && (
              <p className="font-body text-sm text-ink-700 dark:text-parchment-200">{profile.bio}</p>
            )
          )}
        </div>

        <div className="mt-6 space-y-3 border-t border-parchment-200 pt-6 dark:border-ink-700">
          <div className="flex items-center gap-3 font-body text-sm text-ink-700 dark:text-parchment-200">
            <Mail size={16} className="text-gold-500" />
            {profile.email}
          </div>
          <div className="flex items-center gap-3 font-body text-sm text-ink-700 dark:text-parchment-200">
            <ShieldCheck size={16} className="text-gold-500" />
            {profile.role === "writer" && profile.writerVerified
              ? "Verified Writer"
              : profile.role === "admin"
              ? "Administrator"
              : "Reader Account"}
          </div>
          {profile.createdAt && (
            <div className="flex items-center gap-3 font-body text-sm text-ink-700 dark:text-parchment-200">
              <CalendarDays size={16} className="text-gold-500" />
              Joined {new Date(profile.createdAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {profile.role === "user" && (
        <BecomeWriterCard
          description="Want to publish your own ebooks? Pay a one-time verification fee to unlock the writer dashboard."
        />
      )}
    </div>
  );
}