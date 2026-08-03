"use client";

import { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending, error, refetch } = useSession();

  const value = {
    user: session?.user || null,
    role: session?.user?.role || "user",
    writerVerified: session?.user?.writerVerified || false, // NEW
    isLoading: isPending,
    error,
    refetchSession: refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}