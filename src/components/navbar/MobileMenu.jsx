

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
        className="flex h-9 w-9 items-center justify-center text-parchment-200"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 z-40 border-b border-gold-600/30 bg-ink-900 px-6 py-4 shadow-lg">
          <NavLinks className="mb-4 flex-col items-start gap-4" />
          <UserMenu />
        </div>
      )}
    </div>
  );
}