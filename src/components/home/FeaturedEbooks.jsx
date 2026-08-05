

import { apiServer } from "@/lib/apiClient.server";
import FeaturedEbookCard from "./FeaturedEbookCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function FeaturedEbooks() {
  let ebooks = [];
  try {
    ebooks = await apiServer.get("/ebooks/featured");
  } catch (err) {
    console.error("Failed to load featured ebooks:", err);
  }

  if (ebooks.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-800 dark:text-parchment-100">
            Featured Ebooks
          </h2>
          <p className="mt-1 font-body text-sm text-ink-700/60 dark:text-parchment-200/60">
            Freshly published stories worth discovering
          </p>
        </div>

        <Link
          href="/ebooks"
          className="group inline-flex items-center gap-2 rounded-full border border-gold-500 bg-gold-500/10 px-5 py-2.5 font-body text-sm font-semibold text-gold-600 dark:text-gold-400 transition-all hover:bg-gold-500 hover:text-white dark:hover:text-ink-900"
        >
          Browse Ebooks
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ebooks.slice(0, 6).map((ebook, i) => (
          <FeaturedEbookCard key={ebook._id} ebook={ebook} index={i} />
        ))}
      </div>
    </section>
  );
}