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
      className="group overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <Link href={`/ebooks/${ebook._id}`}>
        <ImageWithSkeleton
          src={ebook.coverImage}
          alt={ebook.title}
          title={ebook.title}
          className="h-64 w-full"
        />
        <div className="p-4">
          <span className="text-xs font-medium text-brand-600">{ebook.genre}</span>
          <h3 className="mt-1 line-clamp-1 font-semibold text-gray-900 dark:text-gray-100">
            {ebook.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">by {ebook.writerName}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-gray-900 dark:text-gray-100">
              ${ebook.price}
            </span>
            {ebook.sold && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-500/10">
                Sold
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}