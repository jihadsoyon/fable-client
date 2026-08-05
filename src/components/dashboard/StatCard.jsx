export default function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-2xl border border-gold-600/20 bg-white p-5 dark:border-gold-600/20 dark:bg-ink-800">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${accent}`}
        >
          <Icon size={18} />
        </div>
        <p className="font-body text-sm text-ink-700/70 dark:text-parchment-200/70">{label}</p>
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-ink-900 dark:text-parchment-100">
        {value}
      </p>
    </div>
  );
}