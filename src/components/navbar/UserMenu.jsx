// "use client";

// import Link from "next/link";
// import { useAuth } from "@/providers/AuthProvider";

// export default function UserMenu() {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />;
//   }

//   if (!user) {
//     return (
//       <div className="flex items-center gap-3">
//         <Link
//           href="/login"
//           className="text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-300"
//         >
//           Login
//         </Link>
//         <Link
//           href="/register"
//           className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
//         >
//           Register
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <Link
//       href="/dashboard"
//       className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-400"
//     >
//       {user.name?.charAt(0)?.toUpperCase() || "U"}
//     </Link>
//   );
// }


"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { signOut } from "@/lib/auth-client";

export default function UserMenu() {
  const { user, isLoading, refetchSession } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (isLoading) return <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />;

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-brand-600 dark:text-gray-300">Login</Link>
        <Link href="/register" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Register</Link>
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
        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-400"
      >
        {user.name?.charAt(0)?.toUpperCase() || "U"}
      </button>
      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
          <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}