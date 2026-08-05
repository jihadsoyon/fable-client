"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    title: "Discover & Read Original Ebooks",
    subtitle: "Explore stories from talented independent writers around the world.",
    image: "/images/hero-1.jpg",
  },
  {
    title: "Support Independent Writers",
    subtitle: "Every purchase directly supports the author who wrote it.",
    image: "/images/hero-2.jpg",
  },
  {
    title: "Become a Published Writer",
    subtitle: "Verify your writer account and start publishing your own ebooks today.",
    image: "/images/hero-3.jpg",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-[280px] overflow-hidden sm:h-[340px] md:h-[380px] lg:h-[720px]">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="100vw"
            quality={80}
            className="object-cover"
          />
          {/* readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 text-left sm:px-10">
        <motion.h1
          key={`title-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl text-2xl font-bold text-white sm:text-3xl md:text-4xl"
        >
          {slide.title}
        </motion.h1>

        <motion.p
          key={`subtitle-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-3 max-w-md text-sm text-white/85 sm:text-base"
        >
          {slide.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
        <Link
          href="/ebooks"
          className="group inline-flex items-center gap-2 rounded-full border border-brand-600/40 bg-brand-600/10 px-5 py-2.5 text-sm font-semibold text-brand-600 dark:text-brand-400 transition-all hover:bg-brand-600 hover:text-white dark:hover:text-white mt-5"
        >
          Browse Ebooks
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        </motion.div>

        {/* arrows */}
        {/* <button
          onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 text-white backdrop-blur hover:bg-white/30 sm:left-4 sm:p-2"
          aria-label="Previous slide"
        >
          ‹
        </button> */}
        {/* <button
          onClick={() => setIndex((index + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 text-white backdrop-blur hover:bg-white/30 sm:right-4 sm:p-2"
          aria-label="Next slide"
        >
          ›
        </button> */}

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}