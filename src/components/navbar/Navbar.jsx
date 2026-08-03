import Link from "next/link";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-brand-600">
          Fable
        </Link>

        <NavLinks className="hidden md:flex" />

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <UserMenu />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}