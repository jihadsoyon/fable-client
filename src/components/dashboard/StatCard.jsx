export default function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${accent}`}
        >
          <Icon size={18} />
        </div>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}