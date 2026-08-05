
"use client";

import { Lock, BookOpen } from "lucide-react";

function parseContent(content) {
  if (!content) return { heading: "", body: "", note: "" };

  // Split off the trailing "[Preview ends here...]" note if present
  const noteMatch = content.match(/\[(.*?)\]\s*$/s);
  const note = noteMatch ? noteMatch[1] : "";
  const withoutNote = noteMatch ? content.slice(0, noteMatch.index).trim() : content.trim();

  // First line is treated as the chapter heading if it looks like one
  const lines = withoutNote.split("\n").filter(Boolean);
  const firstLine = lines[0] || "";
  const isHeading = /chapter|part|prologue/i.test(firstLine);

  return {
    heading: isHeading ? firstLine : "",
    body: isHeading ? lines.slice(1).join("\n\n").trim() : withoutNote,
    note,
  };
}

export default function ContentGate({ hasAccess, content, description }) {
  if (hasAccess) {
    const { heading, body, note } = parseContent(content);

    return (
      <div className="overflow-hidden rounded-xl border border-gold-600/20 bg-white dark:border-gold-600/20 dark:bg-ink-800">
        <div className="flex items-center gap-2 border-b border-gold-600/20 bg-parchment-100 px-6 py-3 dark:border-gold-600/20 dark:bg-ink-900/60">
          <BookOpen size={16} className="text-gold-600" />
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-gold-600">
            Unlocked Content
          </span>
        </div>

        <div className="px-6 py-8 sm:px-10">
          {heading && (
            <h3 className="mb-6 text-center font-display text-xl italic text-ink-900 dark:text-parchment-100">
              {heading}
            </h3>
          )}

          <p className="whitespace-pre-wrap font-body text-[15px] leading-8 text-ink-800 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:text-gold-600 dark:text-parchment-200">
            {body}
          </p>

          {note && (
            <div className="mt-8 flex items-center gap-3 border-t border-dashed border-parchment-200 pt-6 dark:border-ink-700">
              <div className="h-px flex-1 bg-parchment-200 dark:bg-ink-700" />
              <span className="shrink-0 font-body text-xs italic text-ink-700/50 dark:text-parchment-200/50">
                {note}
              </span>
              <div className="h-px flex-1 bg-parchment-200 dark:bg-ink-700" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-gold-600/20 dark:border-gold-600/20">
      <div className="whitespace-pre-wrap p-8 font-body text-sm leading-8 text-ink-700 blur-sm select-none dark:text-parchment-200">
        {description}
        {"\n\n"}
        {description}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-[2px] dark:bg-ink-900/80">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-50 dark:bg-gold-500/10">
          <Lock size={20} className="text-gold-600" />
        </div>
        <p className="font-body text-sm font-medium text-ink-700 dark:text-parchment-200">
          Purchase this ebook to unlock the full content
        </p>
      </div>
    </div>
  );
}