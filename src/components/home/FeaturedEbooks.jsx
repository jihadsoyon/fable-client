import { apiServer } from "@/lib/apiClient.server";
import FeaturedEbookCard from "./FeaturedEbookCard";

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
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {ebooks.map((ebook, i) => (
          <FeaturedEbookCard key={ebook._id} ebook={ebook} index={i} />
        ))}
      </div>
    </section>
  );
}