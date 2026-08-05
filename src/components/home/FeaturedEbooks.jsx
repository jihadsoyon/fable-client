import { apiServer } from "@/lib/apiClient.server";
import FeaturedEbookCard from "./FeaturedEbookCard";
import Link from "next/link";

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
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Featured Ebooks
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Freshly published stories worth discovering
          </p>
        </div>
        <Link
          href="/ebooks"
          className="mt-5 inline-block px-6 py-2.5 text-sm font-semibold text-brand-700 shadow-lg transition-transform hover:scale-105"
        >
          Browse Ebooks
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