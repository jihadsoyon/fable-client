export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="aspect-[3/4] animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-4">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-24 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}