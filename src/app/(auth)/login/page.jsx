
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
      <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-parchment-100">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-ink-700/60 dark:text-parchment-300/60">
        Login to continue to Fable
      </p>

      {/* Quick demo login buttons */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.label}
            type="button"
            onClick={() => handleDemoLogin(account)}
            disabled={loading}
            className="rounded-lg border border-gold-500/40 bg-parchment-100 px-2 py-2 text-xs font-medium text-gold-600 transition-colors hover:bg-parchment-200 disabled:opacity-60 dark:border-gold-500/30 dark:bg-gold-500/10 dark:text-gold-400 dark:hover:bg-gold-500/20 cursor-pointer"
          >
            {account.label}
          </button>
        ))}
      </div>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-parchment-300 dark:bg-ink-700" />
        <span className="font-body text-xs tracking-wide text-ink-700/50 dark:text-parchment-300/50">
          OR LOGIN MANUALLY
        </span>
        <div className="h-px flex-1 bg-parchment-300 dark:bg-ink-700" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-parchment-300 bg-parchment-50 px-3 py-2.5 text-sm text-ink-800 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
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
            className="w-full rounded-lg border border-parchment-300 bg-parchment-50 px-3 py-2.5 text-sm text-ink-800 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
            placeholder="••••••••"
          />
        </FormField>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-parchment-50 transition-colors hover:bg-gold-600 disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-parchment-300 dark:bg-ink-700" />
        <span className="font-body text-xs tracking-wide text-ink-700/50 dark:text-parchment-300/50">
          OR
        </span>
        <div className="h-px flex-1 bg-parchment-300 dark:bg-ink-700" />
      </div>

      <GoogleAuth label="Continue with Google" />

      <p className="mt-6 text-center text-sm text-ink-700/60 dark:text-parchment-300/60">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-gold-600 hover:underline dark:text-gold-400">
          Register
        </Link>
      </p>
    </div>
  );
}