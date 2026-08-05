
export default function EbookGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-sm border border-gold-600/30 bg-ink-800"
        >
          <div className="aspect-[3/4] animate-pulse bg-ink-700" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/3 animate-pulse rounded bg-ink-700" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-ink-700" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-ink-700" />
          </div>
        </div>
      ))}
    </div>
  );
}