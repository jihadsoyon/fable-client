
import Link from "next/link";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function EbookCard({ ebook }) {
  return (
    <Link
      href={`/ebooks/${ebook._id}`}
      className="group block overflow-hidden rounded-sm border border-gold-600/30 bg-ink-800 transition-shadow hover:shadow-lg hover:shadow-gold-900/20"
    >
      <div className="relative">
        <ImageWithSkeleton
          src={ebook.coverImage}
          alt={ebook.title}
          className="aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
        />
        {ebook.sold && (
          <span className="absolute right-2 top-2 rounded-full bg-ink-900/85 px-2.5 py-1 font-body text-xs font-medium text-parchment-100">
            Sold
          </span>
        )}
      </div>
      <div className="border-t border-gold-600/20 p-4">
        <p className="truncate font-body text-xs font-medium uppercase tracking-wide text-gold-400">
          {ebook.genre}
        </p>
        <h3 className="mt-1 truncate font-display font-semibold text-parchment-100">
          {ebook.title}
        </h3>
        <p className="mt-1 truncate font-body text-sm text-parchment-200/60">by {ebook.writerName}</p>
        <p className="mt-2 font-display font-bold text-gold-400">${ebook.price}</p>
      </div>
    </Link>
  );
}