// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Heart } from "lucide-react";
// import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
// import { apiClient } from "@/lib/apiClient.client";
// import toast from "react-hot-toast";

// export default function BookmarkedEbookCard({ bookmark, onRemoved }) {
//   const [removing, setRemoving] = useState(false);

//   const handleRemove = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     setRemoving(true);
//     try {
//       await apiClient.delete(`/bookmarks/${bookmark.ebookId}`);
//       toast.success("Removed from bookmarks");
//       onRemoved(bookmark.ebookId);
//     } catch (error) {
//       toast.error(error.message || "Could not remove bookmark!");
//       setRemoving(false);
//     }
//   };

//   return (
//     <Link
//       href={`/ebooks/${bookmark.ebookId}`}
//       className="group relative block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
//     >
//       <div className="relative">
//         <ImageWithSkeleton
//           src={bookmark.coverImage}
//           alt={bookmark.title}
//           className="aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
//         />
//         {bookmark.sold && (
//           <span className="absolute left-2 top-2 rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-medium text-white">
//             Sold
//           </span>
//         )}
//         <button
//           onClick={handleRemove}
//           disabled={removing}
//           aria-label="Remove bookmark"
//           className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm transition-colors hover:bg-white disabled:opacity-60 dark:bg-gray-950/90"
//         >
//           <Heart size={15} fill="currentColor" />
//         </button>
//       </div>
//       <div className="p-4">
//         <p className="truncate text-xs font-medium uppercase tracking-wide text-brand-600">
//           {bookmark.genre}
//         </p>
//         <h3 className="mt-1 line-clamp-1 font-semibold text-gray-900 dark:text-gray-100">
//           {bookmark.title}
//         </h3>
//         <p className="mt-1 truncate text-sm text-gray-500">by {bookmark.writerName}</p>
//         <p className="mt-2 font-bold text-brand-600">${bookmark.price}</p>
//       </div>
//     </Link>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";

export default function BookmarkedEbookCard({ bookmark, onRemoved }) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setRemoving(true);
    try {
      await apiClient.delete(`/bookmarks/${bookmark.ebookId}`);
      toast.success("Removed from bookmarks");
      onRemoved(bookmark.ebookId);
    } catch (error) {
      toast.error(error.message || "Could not remove bookmark!");
      setRemoving(false);
    }
  };

  return (
    <Link
      href={`/ebooks/${bookmark.ebookId}`}
      className="group relative block overflow-hidden rounded-xl border border-gold-600/20 bg-white transition-shadow hover:shadow-lg dark:border-gold-600/20 dark:bg-ink-800"
    >
      <div className="relative">
        <ImageWithSkeleton
          src={bookmark.coverImage}
          alt={bookmark.title}
          className="aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
        />
        {bookmark.sold && (
          <span className="absolute left-2 top-2 rounded-full bg-ink-900/80 px-2.5 py-1 font-body text-xs font-medium text-parchment-50">
            Sold
          </span>
        )}
        <button
          onClick={handleRemove}
          disabled={removing}
          aria-label="Remove bookmark"
          className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm transition-colors hover:bg-white disabled:opacity-60 dark:bg-ink-900/90"
        >
          <Heart size={15} fill="currentColor" />
        </button>
      </div>
      <div className="p-4">
        <p className="truncate font-body text-xs font-medium uppercase tracking-wide text-gold-600">
          {bookmark.genre}
        </p>
        <h3 className="mt-1 line-clamp-1 font-display font-semibold text-ink-900 dark:text-parchment-100">
          {bookmark.title}
        </h3>
        <p className="mt-1 truncate font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
          by {bookmark.writerName}
        </p>
        <p className="mt-2 font-display font-bold text-gold-600">${bookmark.price}</p>
      </div>
    </Link>
  );
}