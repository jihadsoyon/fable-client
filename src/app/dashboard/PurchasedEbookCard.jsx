// import Link from "next/link";
// import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

// export default function PurchasedEbookCard({ purchase }) {
//   return (
//     <Link
//       href={`/ebooks/${purchase.ebookId}`}
//       className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
//     >
//       <ImageWithSkeleton
//         src={purchase.coverImage}
//         alt={purchase.title}
//         className="aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
//       />
//       <div className="p-4">
//         <h3 className="line-clamp-1 font-semibold text-gray-900 dark:text-gray-100">
//           {purchase.title}
//         </h3>
//         <p className="mt-1 truncate text-sm text-gray-500">by {purchase.writerName}</p>
//         <p className="mt-2 text-xs text-gray-400">
//           Purchased {new Date(purchase.purchasedAt).toLocaleDateString()}
//         </p>
//       </div>
//     </Link>
//   );
// }


import Link from "next/link";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function PurchasedEbookCard({ purchase }) {
  return (
    <Link
      href={`/ebooks/${purchase.ebookId}`}
      className="group block overflow-hidden rounded-xl border border-gold-600/20 bg-white transition-shadow hover:shadow-lg dark:border-gold-600/20 dark:bg-ink-800"
    >
      <ImageWithSkeleton
        src={purchase.coverImage}
        alt={purchase.title}
        className="aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-4">
        <h3 className="line-clamp-1 font-display font-semibold text-ink-900 dark:text-parchment-100">
          {purchase.title}
        </h3>
        <p className="mt-1 truncate font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
          by {purchase.writerName}
        </p>
        <p className="mt-2 font-body text-xs text-ink-700/50 dark:text-parchment-200/50">
          Purchased {new Date(purchase.purchasedAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}