"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ImageWithSkeleton({ src, alt, className, ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-gray-100 dark:bg-gray-800", className)}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" />}
      <Image
        src={src}
        alt={alt}
        fill
        onLoad={() => setLoaded(true)}
        className={cn("object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
        {...props}
      />
    </div>
  );
}