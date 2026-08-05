
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { GENRES } from "@/lib/genreConstants";

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 400);

  const genre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "newest";
  const availability = searchParams.get("availability") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // reset to page 1 on any filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  // Push debounced search text into the URL
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearch !== currentSearch) {
      updateParam("search", debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-600/60"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or writer name..."
          className="w-full rounded-sm border border-gold-600/30 bg-parchment-50 py-2.5 pl-10 pr-4 font-body text-sm text-ink-800 placeholder:text-ink-700/40 focus:border-gold-500 focus:outline-none dark:bg-ink-800 dark:text-parchment-100"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={genre}
          onChange={(e) => updateParam("genre", e.target.value)}
          className="rounded-sm border border-gold-600/30 bg-parchment-50 px-3 py-2 font-body text-sm text-ink-800 dark:bg-ink-800 dark:text-parchment-100"
        >
          <option value="">All Genres</option>
          {GENRES.map((g) => (
            <option key={g.name} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={availability}
          onChange={(e) => updateParam("availability", e.target.value)}
          className="rounded-sm border border-gold-600/30 bg-parchment-50 px-3 py-2 font-body text-sm text-ink-800 dark:bg-ink-800 dark:text-parchment-100"
        >
          <option value="">All Availability</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>

        <input
          type="number"
          value={minPrice}
          onChange={(e) => updateParam("minPrice", e.target.value)}
          placeholder="Min $"
          className="w-24 rounded-sm border border-gold-600/30 bg-parchment-50 px-3 py-2 font-body text-sm text-ink-800 placeholder:text-ink-700/40 dark:bg-ink-800 dark:text-parchment-100"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
          placeholder="Max $"
          className="w-24 rounded-sm border border-gold-600/30 bg-parchment-50 px-3 py-2 font-body text-sm text-ink-800 placeholder:text-ink-700/40 dark:bg-ink-800 dark:text-parchment-100"
        />

        <select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="ml-auto rounded-sm border border-gold-600/30 bg-parchment-50 px-3 py-2 font-body text-sm text-ink-800 dark:bg-ink-800 dark:text-parchment-100"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}