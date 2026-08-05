// "use client";

// import { Lock } from "lucide-react";

// export default function ContentGate({ hasAccess, content, description }) {
//   if (hasAccess) {
//     return (
//       <div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700 dark:prose-invert dark:text-gray-300">
//         {content}
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
//       <div className="whitespace-pre-wrap p-6 text-sm text-gray-600 blur-sm select-none dark:text-gray-400">
//         {description}
//         {"\n\n"}
//         {description}
//       </div>
//       <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/70 dark:bg-gray-950/70">
//         <Lock size={28} className="text-gray-400" />
//         <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
//           Purchase this ebook to unlock the full content
//         </p>
//       </div>
//     </div>
//   );
// }



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
      <div className="overflow-hidden rounded-xl border border-amber-100 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2 border-b border-amber-100 bg-amber-50/60 px-6 py-3 dark:border-gray-800 dark:bg-gray-900/60">
          <BookOpen size={16} className="text-brand-600" />
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Unlocked Content
          </span>
        </div>

        <div className="px-6 py-8 sm:px-10">
          {heading && (
            <h3 className="mb-6 text-center font-serif text-xl italic text-gray-900 dark:text-gray-100">
              {heading}
            </h3>
          )}

          <p className="whitespace-pre-wrap font-serif text-[15px] leading-8 text-gray-700 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:text-brand-600 dark:text-gray-300">
            {body}
          </p>

          {note && (
            <div className="mt-8 flex items-center gap-3 border-t border-dashed border-gray-200 pt-6 dark:border-gray-800">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
              <span className="shrink-0 text-xs italic text-gray-400">{note}</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-amber-100 dark:border-gray-800">
      <div className="whitespace-pre-wrap p-8 font-serif text-sm leading-8 text-gray-600 blur-sm select-none dark:text-gray-400">
        {description}
        {"\n\n"}
        {description}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-[2px] dark:bg-gray-950/80">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/10">
          <Lock size={20} className="text-brand-600" />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Purchase this ebook to unlock the full content
        </p>
      </div>
    </div>
  );
}