

"use client";

import { useState } from "react";
import Image from "next/image";

const COLORS = [
  "bg-gold-600",
  "bg-ink-700",
  "bg-amber-700",
  "bg-stone-600",
  "bg-yellow-800",
];

function hashToIndex(str = "", mod) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % mod;
}

export default function WriterAvatar({ src, name }) {
  const [error, setError] = useState(false);
  const color = COLORS[hashToIndex(name, COLORS.length)];

  if (!src || error) {
    return (
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${color} font-display text-lg font-bold text-parchment-50`}
      >
        {name?.charAt(0)?.toUpperCase() || "W"}
      </div>
    );
  }

  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-gold-600/30">
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}