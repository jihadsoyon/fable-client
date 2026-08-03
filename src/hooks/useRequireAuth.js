"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

// Guards any private route.
// While the session is still resolving (isLoading), we do NOT redirect —
// this is exactly what stops a logged-in user from bouncing to /login
// on a hard reload of a private route.
export function useRequireAuth({ allowedRoles } = {}) {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.replace("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user, role]);

  return { user, role, isLoading, ready: !isLoading && !!user };
}