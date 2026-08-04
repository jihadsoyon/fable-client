"use client";

import Image from "next/image";
import Link from "next/link";


export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>

                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src={"/images/logo.png"}
                                alt="Fable Logo"
                                width={32}
                                height={32}
                                className="rounded-md object-contain"
                                priority
                            />
                            <span className="text-xl font-bold text-brand-600">Fable</span>
                        </Link>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Discover & read original ebooks from talented writers around the
                            world.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Quick Links
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                <Link href="/about" className="hover:text-brand-600">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-brand-600">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="hover:text-brand-600">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Follow Us
                        </h4>
                        <div className="mt-3 flex gap-4">
                            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-brand-600">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-brand-600">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 5.92c-.74.33-1.53.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.47-1.68.82-2.62 1a4.1 4.1 0 0 0-7 3.74A11.65 11.65 0 0 1 3.39 4.6a4.1 4.1 0 0 0 1.27 5.48c-.67-.02-1.3-.21-1.85-.51v.05a4.1 4.1 0 0 0 3.29 4.02c-.6.17-1.24.19-1.84.07a4.11 4.11 0 0 0 3.83 2.85A8.24 8.24 0 0 1 2 18.57a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68l-.01-.53c.8-.58 1.5-1.3 2.04-2.12z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-brand-600">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Newsletter
                        </h4>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Get updates on new ebooks and writers.
                        </p>
                        <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-800">
                    © {new Date().getFullYear()} Fable. All rights reserved.
                </div>
            </div>
        </footer>
    );
}