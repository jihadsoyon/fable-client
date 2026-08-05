"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import FormField from "@/components/ui/FormField";
import GoogleAuth from "@/components/auth/GoogleAuth";
import toast from "react-hot-toast";

// NOTE: replace the email/password below with your real Reader and Writer
// account credentials. Admin must be created once manually (see chat notes),
// then its real password goes here too.
const DEMO_ACCOUNTS = [
  { label: "Login as User", email: "jsoyon@gmail.com", password: "0123456789ma" },
  { label: "Login as Writer", email: "tomhardy@gmail.com", password: "venom@2018" },
  { label: "Login as Admin", email: "admin@fable.com", password: "Admin@123" },
];

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const performLogin = async (email, password) => {
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
        return;
      }

      toast.success("Welcome back!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    performLogin(form.email, form.password);
  };

  const handleDemoLogin = (account) => {
    setForm({ email: account.email, password: account.password });
    performLogin(account.email, account.password);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-gray-500">Login to continue to Fable</p>

      {/* Quick demo login buttons */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.label}
            type="button"
            onClick={() => handleDemoLogin(account)}
            disabled={loading}
            className="rounded-lg border border-brand-200 bg-brand-50 px-2 py-2 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-100 disabled:opacity-60 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20 cursor-pointer"
          >
            {account.label}
          </button>
        ))}
      </div>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs text-gray-400">OR LOGIN MANUALLY</span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
            placeholder="you@example.com"
          />
        </FormField>

        <FormField label="Password">
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
            placeholder="••••••••"
          />
        </FormField>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>

        <GoogleAuth label="Continue with Google" />

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-brand-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}