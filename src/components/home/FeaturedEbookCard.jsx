

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";

export default function FeaturedEbookCard({ ebook, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-sm border border-gold-600/30 bg-ink-800 shadow-sm transition-shadow hover:shadow-lg hover:shadow-gold-900/20"
    >
      <Link href={`/ebooks/${ebook._id}`}>
        <ImageWithSkeleton
          src={ebook.coverImage}
          alt={ebook.title}
          title={ebook.title}
          className="h-64 w-full"
        />
        <div className="border-t border-gold-600/20 p-4">
          <span className="font-body text-xs font-medium tracking-wide text-gold-400 uppercase">
            {ebook.genre}
          </span>
          <h3 className="mt-1 line-clamp-1 font-display font-semibold text-parchment-100">
            {ebook.title}
          </h3>
          <p className="mt-1 font-body text-sm text-parchment-200/60">by {ebook.writerName}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-display font-bold text-gold-400">
              ${ebook.price}
            </span>
            {ebook.sold && (
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 font-body text-xs font-medium text-red-400">
                Sold
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}