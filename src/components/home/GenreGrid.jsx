import Link from "next/link";
import { GENRES } from "@/lib/genreConstants";

export default function GenreGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Browse by Genre
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {GENRES.map((genre) => (
          <Link
            key={genre.name}
            href={`/ebooks?genre=${encodeURIComponent(genre.name)}`}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-8 text-center transition-all hover:-translate-y-1 hover:border-brand-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <span className="text-3xl">{genre.emoji}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {genre.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}