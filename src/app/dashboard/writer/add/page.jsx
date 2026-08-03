import EbookForm from "@/components/dashboard/EbookForm";

export const metadata = {
  title: "Add Ebook — Fable",
};

export default function AddEbookPage() {
  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-gray-900 dark:text-gray-100">
        Add New Ebook
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        Fill in the details below to publish a new ebook.
      </p>

      <div className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <EbookForm mode="add" />
      </div>
    </div>
  );
}