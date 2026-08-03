"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/ebooks", label: "Browse Ebooks" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function NavLinks({ className }) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-6", className)}>
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-brand-600",
              isActive
                ? "text-brand-600"
                : "text-gray-600 dark:text-gray-300"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}