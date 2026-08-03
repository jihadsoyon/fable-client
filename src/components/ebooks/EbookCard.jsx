import Link from "next/link";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function EbookCard({ ebook }) {
  return (
    <Link
      href={`/ebooks/${ebook._id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative">
        <ImageWithSkeleton
          src={ebook.coverImage}
          alt={ebook.title}
          className="aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
        />
        {ebook.sold && (
          <span className="absolute right-2 top-2 rounded-full bg-gray-900/80 px-2.5 py-1 text-xs font-medium text-white">
            Sold
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-brand-600">
          {ebook.genre}
        </p>
        <h3 className="mt-1 truncate font-semibold text-gray-900 dark:text-gray-100">
          {ebook.title}
        </h3>
        <p className="mt-1 truncate text-sm text-gray-500">by {ebook.writerName}</p>
        <p className="mt-2 font-bold text-brand-600">${ebook.price}</p>
      </div>
    </Link>
  );
}