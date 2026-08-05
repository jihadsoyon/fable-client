// "use client";

// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function EbooksPagination({ currentPage, totalPages }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   if (totalPages <= 1) return null;

//   const goToPage = (page) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", page);
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="mt-10 flex items-center justify-center gap-2">
//       <button
//         onClick={() => goToPage(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 disabled:opacity-40 dark:border-gray-700"
//       >
//         <ChevronLeft size={16} />
//       </button>

//       {pages.map((page) => (
//         <button
//           key={page}
//           onClick={() => goToPage(page)}
//           className={`h-9 w-9 rounded-lg text-sm font-medium ${
//             page === currentPage
//               ? "bg-brand-600 text-white"
//               : "border border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-300"
//           }`}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={() => goToPage(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 disabled:opacity-40 dark:border-gray-700"
//       >
//         <ChevronRight size={16} />
//       </button>
//     </div>
//   );
// }


"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EbooksPagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold-600/30 text-ink-800 disabled:opacity-40 dark:text-parchment-100"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`h-9 w-9 rounded-sm font-body text-sm font-medium ${
            page === currentPage
              ? "bg-gold-600 text-ink-900"
              : "border border-gold-600/30 text-ink-700/70 dark:text-parchment-200/70"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold-600/30 text-ink-800 disabled:opacity-40 dark:text-parchment-100"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}