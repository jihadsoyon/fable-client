
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import FormField from "@/components/ui/FormField";
import PasswordStrength from "@/components/auth/PasswordStrength";
import GoogleAuth from "@/components/auth/GoogleAuth";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/apiClient.client";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Full name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        if (form.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        if (form.password !== form.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const { error } = await authClient.signUp.email({
                name: form.name,
                email: form.email,
                password: form.password,
            });

            if (error) {
                toast.error(error.message || "Registration failed!");
                return;
            }

            // Set chosen role (user/writer) — writer role starts unverified
            // until the verification payment is completed (see writer-verification flow).
            try {
                await apiClient.post("/users/set-initial-role", { role: form.role });
            } catch (roleErr) {
                console.error("Role assignment failed:", roleErr);
                // Non-fatal — user account still created with default "user" role
            }

            toast.success(
                form.role === "writer"
                    ? "Account created! Complete writer verification to start publishing."
                    : "Account created successfully!"
            );
            router.push("/");
            router.refresh();
        } catch (err) {
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-parchment-100">
                Create your account
            </h1>
            <p className="mt-1 text-sm text-ink-700/60 dark:text-parchment-300/60">
                Join Fable to read and share original ebooks
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <FormField label="Full Name" error={errors.name}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-parchment-300 bg-parchment-50 px-3 py-2.5 text-sm text-ink-800 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
                        placeholder="John Doe"
                    />
                </FormField>

                <FormField label="Email" error={errors.email}>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-parchment-300 bg-parchment-50 px-3 py-2.5 text-sm text-ink-800 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
                        placeholder="you@example.com"
                    />
                </FormField>

                <FormField label="Password" error={errors.password}>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-parchment-300 bg-parchment-50 px-3 py-2.5 text-sm text-ink-800 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
                        placeholder="••••••••"
                    />
                    <PasswordStrength password={form.password} />
                </FormField>

                <FormField label="Confirm Password" error={errors.confirmPassword}>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-parchment-300 bg-parchment-50 px-3 py-2.5 text-sm text-ink-800 focus:border-gold-500 focus:outline-none dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
                        placeholder="••••••••"
                    />
                </FormField>

                <FormField label="I want to join as">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, role: "user" })}
                            className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${form.role === "user"
                                ? "border-gold-600 bg-parchment-100 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400"
                                : "border-parchment-300 text-ink-700/70 dark:border-ink-700 dark:text-parchment-300/70"
                                }`}
                        >
                            Reader
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, role: "writer" })}
                            className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${form.role === "writer"
                                ? "border-gold-600 bg-parchment-100 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400"
                                : "border-parchment-300 text-ink-700/70 dark:border-ink-700 dark:text-parchment-300/70"
                                }`}
                        >
                            Writer
                        </button>
                    </div>
                    {form.role === "writer" && (
                        <p className="mt-2 text-xs text-ink-700/60 dark:text-parchment-300/60">
                            Writers need to complete a one-time verification payment before
                            publishing ebooks.
                        </p>
                    )}
                </FormField>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-parchment-50 transition-colors hover:bg-gold-600 disabled:opacity-60"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>
            </form>

            <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-parchment-300 dark:bg-ink-700" />
                <span className="font-body text-xs tracking-wide text-ink-700/50 dark:text-parchment-300/50">
                    OR
                </span>
                <div className="h-px flex-1 bg-parchment-300 dark:bg-ink-700" />
            </div>

            <GoogleAuth label="Sign up with Google" />

            <p className="mt-6 text-center text-sm text-ink-700/60 dark:text-parchment-300/60">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-gold-600 hover:underline dark:text-gold-400">
                    Login
                </Link>
            </p>
        </div>
    );
}