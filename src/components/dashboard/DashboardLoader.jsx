export default function DashboardLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-parchment-200 border-t-gold-600 dark:border-ink-700 dark:border-t-gold-500" />
      <p className="font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
        Loading dashboard...
      </p>
    </div>
  );
}