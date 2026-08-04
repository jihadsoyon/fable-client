

import Link from "next/link";

export default function EmptyDashboardState({ icon: Icon, title, description, ctaLabel, ctaHref }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
      <Icon size={40} className="text-gray-300 dark:text-gray-700" />
      <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-1 max-w-xs text-sm text-gray-500">{description}</p>
      {ctaHref && (
        <Link
          href={ctaHref}
          className="mt-5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}