

// import Link from "next/link";
// import Image from "next/image";
// import NavLinks from "./NavLinks";
// import UserMenu from "./UserMenu";
// import ThemeToggle from "./ThemeToggle";
// import MobileMenu from "./MobileMenu";

// export default function Navbar() {
//   return (
//     <header className="sticky top-0 z-50 border-b border-brand-100 bg-gray-50/90 backdrop-blur-md dark:border-brand-900/40 dark:bg-gray-950/90">
//       <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//         <Link href="/" className="flex items-center gap-2.5">
//           <Image
//             src={"/images/logo.png"}
//             alt="Fable Logo"
//             width={34}
//             height={34}
//             className="rounded-md object-contain"
//             priority
//           />
//           <span className="font-serif text-2xl font-semibold tracking-tight text-brand-700 dark:text-brand-400">
//             Fable
//           </span>
//         </Link>

//         <NavLinks className="hidden md:flex" />

//         <div className="hidden items-center gap-5 md:flex">
//           <ThemeToggle />
//           <UserMenu />
//         </div>

//         <div className="flex items-center gap-2 md:hidden">
//           <ThemeToggle />
//           <MobileMenu />
//         </div>
//       </nav>
//     </header>
//   );
// }



import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold-600/30 bg-ink-900/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={"/images/logo.png"}
            alt="Fable Logo"
            width={34}
            height={34}
            className="rounded-md object-contain"
            priority
          />
          <span className="font-display text-2xl font-semibold tracking-wide text-parchment-100">
            Fable
          </span>
        </Link>

        <NavLinks className="hidden md:flex" />

        <div className="hidden items-center gap-5 md:flex">
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