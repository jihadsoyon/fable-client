import Hero from "@/components/home/Hero";
import FeaturedEbooks from "@/components/home/FeaturedEbooks";
import TopWriters from "@/components/home/TopWriters";
import GenreGrid from "@/components/home/GenreGrid";

export default function HomePage() {
  return (
    <div className="bg-amber-50/30 dark:bg-gray-950">
      <Hero />
      <FeaturedEbooks />
      <TopWriters />
      <GenreGrid />
    </div>
  );
}