import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-brand-600">Fable</h3>
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
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-brand-600">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-brand-600">
                <Instagram size={18} />
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