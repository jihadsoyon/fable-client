"use client";

import { useEbookStatus } from "@/lib/ebookHooks";
import PurchaseButton from "./PurchaseButton";
import BookmarkButton from "./BookmarkButton";
import ContentGate from "./ContentGate";

export default function EbookDetailClient({ ebook }) {
  const { purchased, bookmarked, content, loading, isLoggedIn, refresh } = useEbookStatus(ebook._id);

  // Server-rendered ebook.content is null unless the owner/admin was
  // authenticated at request time. For a purchasing reader, the real
  // content only arrives via the authenticated client-side re-fetch above.
  const hasAccess = ebook.isOwner || purchased || ebook.fullContentAccess;
  const resolvedContent = ebook.content ?? content;

  return (
    <>
      <div className="mt-6 flex gap-3">
        {loading ? (
          <div className="h-12 flex-1 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        ) : (
          <>
            <PurchaseButton
              ebookId={ebook._id}
              isLoggedIn={isLoggedIn}
              isOwner={ebook.isOwner}
              purchased={purchased}
            />
            <BookmarkButton
              ebookId={ebook._id}
              isLoggedIn={isLoggedIn}
              initialBookmarked={bookmarked}
              onChange={refresh}
            />
          </>
        )}
      </div>

      <div className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Content
        </h2>
        {hasAccess && !resolvedContent && !loading ? (
          <div className="h-24 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-900" />
        ) : (
          <ContentGate hasAccess={hasAccess} content={resolvedContent} description={ebook.description} />
        )}
      </div>
    </>
  );
}