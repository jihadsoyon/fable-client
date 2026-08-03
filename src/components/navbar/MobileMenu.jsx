"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center text-gray-700 dark:text-gray-200"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 z-40 border-b border-gray-200 bg-white px-6 py-4 shadow-lg dark:border-gray-800 dark:bg-gray-950">
          <NavLinks className="mb-4 flex-col items-start gap-4" />
          <UserMenu />
        </div>
      )}
    </div>
  );
}