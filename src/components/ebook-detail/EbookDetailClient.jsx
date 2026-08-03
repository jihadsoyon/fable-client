"use client";

import { useEbookStatus } from "@/lib/ebookHooks";
import PurchaseButton from "./PurchaseButton";
import BookmarkButton from "./BookmarkButton";
import ContentGate from "./ContentGate";

export default function EbookDetailClient({ ebook }) {
  const { purchased, bookmarked, loading, isLoggedIn, refresh } = useEbookStatus(ebook._id);

  // Server already knows if the viewer is the owner (from JWT, if logged in
  // at request time). We re-derive access here for the client-rendered gate
  // in case the session state changes after initial load.
  const hasAccess = ebook.isOwner || purchased || ebook.fullContentAccess;

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
        <ContentGate hasAccess={hasAccess} content={ebook.content} description={ebook.description} />
      </div>
    </>
  );
}