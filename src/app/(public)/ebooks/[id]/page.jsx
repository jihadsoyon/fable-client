import { notFound } from "next/navigation";
import Image from "next/image";
import { apiServer } from "@/lib/apiClient.server";
import EbookDetailClient from "@/components/ebook-detail/EbookDetailClient";

export default async function EbookDetailPage({ params }) {
  const { id } = await params;

  const ebook = await apiServer.get(`/ebooks/${id}`);

  if (!ebook || ebook.message === "Ebook not found!") {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <Image
            src={ebook.coverImage}
            alt={ebook.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
            {ebook.genre}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {ebook.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">by {ebook.writerName}</p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-brand-600">${ebook.price}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                ebook.sold
                  ? "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  : "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
              }`}
            >
              {ebook.sold ? "Sold" : "Available"}
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {ebook.description}
          </p>

          <p className="mt-4 text-xs text-gray-400">
            Uploaded on {new Date(ebook.createdAt).toLocaleDateString()}
          </p>

          <EbookDetailClient ebook={ebook} />
        </div>
      </div>
    </div>
  );
}