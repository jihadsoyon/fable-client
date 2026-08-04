"use client";

import { useState } from "react";
import Image from "next/image";

const GRADIENTS = [
  "from-purple-600 to-indigo-700",
  "from-rose-500 to-orange-500",
  "from-emerald-500 to-teal-700",
  "from-blue-600 to-cyan-600",
  "from-amber-500 to-pink-600",
];

function hashToIndex(str = "", mod) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % mod;
}

export default function ImageWithSkeleton({ src, alt, title, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showFallback = error || !src;
  const gradient = GRADIENTS[hashToIndex(title || alt, GRADIENTS.length)];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!showFallback && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}

      {!loaded && !showFallback && (
        <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700" />
      )}

      {showFallback && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradient} p-4 text-center`}
        >
          <span className="line-clamp-3 text-sm font-semibold text-white/90">
            {title || alt}
          </span>
        </div>
      )}
    </div>
  );
}