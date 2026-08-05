
import { apiServer } from "@/lib/apiClient.server";
import FilterBar from "@/components/ebooks/FilterBar";
import EbookCard from "@/components/ebooks/EbookCard";
import EbooksEmptyState from "@/components/ebooks/EbooksEmptyState";
import EbooksPagination from "@/components/ebooks/EbooksPagination";

export const metadata = {
  title: "Browse Ebooks — Fable",
};

export default async function BrowseEbooksPage({ searchParams }) {
  const params = await searchParams;

  const query = new URLSearchParams({
    ...(params.search && { search: params.search }),
    ...(params.genre && { genre: params.genre }),
    ...(params.availability && { availability: params.availability }),
    ...(params.minPrice && { minPrice: params.minPrice }),
    ...(params.maxPrice && { maxPrice: params.maxPrice }),
    sort: params.sort || "newest",
    page: params.page || "1",
    limit: "8",
  });

  const data = await apiServer.get(`/ebooks?${query.toString()}`);
  const ebooks = data?.ebooks || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 font-display text-2xl font-bold text-ink-800 dark:text-parchment-100">
        Browse Ebooks
      </h1>
      <p className="mb-6 text-sm text-ink-700/60 dark:text-parchment-300/60">
        Discover original ebooks from writers around the world
      </p>

      <FilterBar />

      {ebooks.length === 0 ? (
        <EbooksEmptyState />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {ebooks.map((ebook) => (
              <EbookCard key={ebook._id} ebook={ebook} />
            ))}
          </div>
          <EbooksPagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}