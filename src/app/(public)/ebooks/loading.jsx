import EbookGridSkeleton from "@/components/ebooks/EbookGridSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-2 h-8 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mb-6 h-4 w-80 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mb-8 h-11 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
      <EbookGridSkeleton />
    </div>
  );
}