"use client";

import { Lock } from "lucide-react";

export default function ContentGate({ hasAccess, content, description }) {
  if (hasAccess) {
    return (
      <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700 dark:prose-invert dark:text-gray-300">
        {content}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="whitespace-pre-wrap p-6 text-sm text-gray-600 blur-sm select-none dark:text-gray-400">
        {description}
        {"\n\n"}
        {description}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/70 dark:bg-gray-950/70">
        <Lock size={28} className="text-gray-400" />
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Purchase this ebook to unlock the full content
        </p>
      </div>
    </div>
  );
}