

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { signOut } from "@/lib/auth-client";

export default function UserMenu() {
  const { user, isLoading, refetchSession } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (isLoading) return <div className="h-9 w-20 animate-pulse rounded-full bg-ink-700" />;

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/login" className="font-body text-sm font-medium text-parchment-200 hover:text-gold-400">Login</Link>
        <Link
          href="/register"
          className="rounded-full border border-gold-500 px-5 py-2 font-body text-sm font-medium text-gold-400 transition-colors hover:bg-gold-500 hover:text-ink-900"
        >
          Register
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    await refetchSession();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gold-600/20 font-body text-sm font-semibold text-gold-400 ring-2 ring-transparent transition-all hover:ring-gold-500/50"
      >
        {user.image ? (
          <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
        ) : (
          user.name?.charAt(0)?.toUpperCase() || "U"
        )}
      </button>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 mt-2 w-44 rounded-2xl border border-gold-600/30 bg-ink-800 py-1 shadow-lg"
        >
          <Link href="/dashboard" className="block px-4 py-2 font-body text-sm text-parchment-200 hover:bg-ink-700">
            Dashboard
          </Link>
          <Link href="/dashboard/user" className="block px-4 py-2 font-body text-sm text-parchment-200 hover:bg-ink-700">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left font-body text-sm text-red-400 hover:bg-ink-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}