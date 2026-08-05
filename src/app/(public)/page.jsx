
import Hero from "@/components/home/Hero";
import FeaturedEbooks from "@/components/home/FeaturedEbooks";
import TopWriters from "@/components/home/TopWriters";
import GenreGrid from "@/components/home/GenreGrid";

export default function HomePage() {
  return (
    <div className="bg-parchment-50 dark:bg-ink-900">
      <Hero />
      <FeaturedEbooks />
      <TopWriters />
      <GenreGrid />
    </div>
  );
}