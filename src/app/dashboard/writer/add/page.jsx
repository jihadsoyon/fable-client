
import EbookForm from "@/components/dashboard/EbookForm";

export const metadata = {
  title: "Add Ebook — Fable",
};

export default function AddEbookPage() {
  return (
    <div>
      <h1 className="mb-1 font-display text-xl font-bold text-ink-900 dark:text-parchment-100">
        Add New Ebook
      </h1>
      <p className="mb-6 font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
        Fill in the details below to publish a new ebook.
      </p>

      <div className="max-w-2xl rounded-2xl border border-gold-600/20 bg-white p-6 dark:border-gold-600/20 dark:bg-ink-800">
        <EbookForm mode="add" />
      </div>
    </div>
  );
}