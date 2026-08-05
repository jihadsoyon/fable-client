
import { BookX } from "lucide-react";

export default function EbooksEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <BookX size={48} className="text-gold-600/40" />
      <h3 className="mt-4 font-display text-lg font-semibold text-ink-800 dark:text-parchment-100">
        No ebooks found
      </h3>
      <p className="mt-1 font-body text-sm text-ink-700/60 dark:text-parchment-200/60">
        Try adjusting your search or filters to find what you're looking for.
      </p>
    </div>
  );
}