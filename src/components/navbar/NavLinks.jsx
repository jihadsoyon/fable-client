
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";

// const links = [
//   { href: "/", label: "Home" },
//   { href: "/ebooks", label: "Browse Ebooks" },
//   { href: "/dashboard", label: "Dashboard" },
// ];

// export default function NavLinks({ className }) {
//   const pathname = usePathname();

//   return (
//     <div className={cn("flex items-center gap-6", className)}>
//       {links.map((link) => {
//         const isActive =
//           link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

//         return (
//           <Link
//             key={link.href}
//             href={link.href}
//             className={cn(
//               "relative inline-block pb-1 text-[13px] font-medium tracking-wide uppercase transition-colors hover:text-brand-600",
//               isActive
//                 ? "text-brand-700 dark:text-brand-400"
//                 : "text-gray-600 dark:text-gray-300"
//             )}
//           >
//             {link.label}
//             <span
//               className={cn(
//                 "absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-brand-600 transition-transform duration-300",
//                 isActive ? "scale-x-100" : "scale-x-0"
//               )}
//             />
//           </Link>
//         );
//       })}
//     </div>
//   );
// }



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
              "relative inline-block pb-1 font-body text-[13px] font-medium tracking-wide uppercase transition-colors hover:text-gold-400",
              isActive ? "text-gold-400" : "text-parchment-200"
            )}
          >
            {link.label}
            <span
              className={cn(
                "absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gold-500 transition-transform duration-300",
                isActive ? "scale-x-100" : "scale-x-0"
              )}
            />
          </Link>
        );
      })}
    </div>
  );
}