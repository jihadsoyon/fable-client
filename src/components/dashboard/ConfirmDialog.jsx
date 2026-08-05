"use client";

import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ open, title, description, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 dark:bg-ink-800">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
          <AlertTriangle size={20} />
        </div>
        <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-parchment-100">
          {title}
        </h3>
        <p className="mt-1 font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="cursor-pointer rounded-lg border border-parchment-300 px-4 py-2 font-body text-sm font-medium text-ink-700 transition-colors hover:bg-parchment-100 disabled:opacity-60 dark:border-ink-700 dark:text-parchment-200 dark:hover:bg-ink-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-body text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}