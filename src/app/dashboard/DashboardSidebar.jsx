

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardSidebar({ links, title }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 md:block">
        <p className="mb-4 px-3 font-body text-xs font-semibold uppercase tracking-wide text-ink-700/50 dark:text-parchment-200/50">
          {title}
        </p>
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-body text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gold-100 text-gold-700 dark:bg-gold-500/10 dark:text-gold-400"
                    : "text-ink-700 hover:bg-parchment-100 dark:text-parchment-200 dark:hover:bg-ink-800"
                )}
              >
                <link.icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile horizontal tabs */}
      <nav className="mb-6 flex gap-2 overflow-x-auto border-b border-gold-600/20 pb-3 md:hidden dark:border-gold-600/20">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 font-body text-xs font-medium transition-colors",
                isActive
                  ? "bg-gold-600 text-white"
                  : "bg-parchment-100 text-ink-700 dark:bg-ink-800 dark:text-parchment-200"
              )}
            >
              <link.icon size={14} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}