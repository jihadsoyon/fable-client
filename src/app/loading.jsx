export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600 dark:border-brand-500/20" />
    </div>
  );
}