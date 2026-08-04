import Link from "next/link";
import Image from "next/image";
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
            className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 sm:aspect-square"
          >
            <Image
              src={genre.image}
              alt={genre.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
              quality={75}
              className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="relative z-10 w-full p-3 text-center text-sm font-semibold text-white">
              {genre.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}