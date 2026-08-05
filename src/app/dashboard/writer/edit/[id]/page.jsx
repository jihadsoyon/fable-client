// "use client";

// import { useEffect, useState, use } from "react";
// import { useRouter } from "next/navigation";
// import { apiClient } from "@/lib/apiClient.client";
// import { useAuth } from "@/providers/AuthProvider";
// import toast from "react-hot-toast";
// import EbookForm from "@/components/dashboard/EbookForm";

// export default function EditEbookPage({ params }) {
//   const { id } = use(params);
//   const router = useRouter();
//   const { user } = useAuth();

//   const [ebook, setEbook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notAllowed, setNotAllowed] = useState(false);

//   useEffect(() => {
//     if (!user?.id) return;

//     apiClient
//       .get(`/ebooks/${id}`)
//       .then((data) => {
//         if (!data.isOwner) {
//           setNotAllowed(true);
//           return;
//         }
//         setEbook(data);
//       })
//       .catch((error) => {
//         toast.error(error.message || "Failed to load ebook!");
//         setNotAllowed(true);
//       })
//       .finally(() => setLoading(false));
//   }, [id, user?.id]);

//   useEffect(() => {
//     if (notAllowed) {
//       toast.error("You can only edit your own ebooks!");
//       router.replace("/dashboard/writer");
//     }
//   }, [notAllowed, router]);

//   if (loading || notAllowed) {
//     return (
//       <div className="max-w-2xl space-y-4">
//         <div className="h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
//         <div className="h-48 w-36 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
//         <div className="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
//         <div className="h-24 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="mb-1 text-xl font-bold text-gray-900 dark:text-gray-100">
//         Edit Ebook
//       </h1>
//       <p className="mb-6 text-sm text-gray-500">
//         Update the details of &quot;{ebook.title}&quot;.
//       </p>

//       <div className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//         <EbookForm
//           mode="edit"
//           ebookId={id}
//           initialValues={{
//             title: ebook.title,
//             description: ebook.description,
//             content: ebook.content || "",
//             genre: ebook.genre,
//             price: ebook.price,
//             coverImage: ebook.coverImage,
//           }}
//         />
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import EbookForm from "@/components/dashboard/EbookForm";

export default function EditEbookPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    apiClient
      .get(`/ebooks/${id}`)
      .then((data) => {
        if (!data.isOwner) {
          setNotAllowed(true);
          return;
        }
        setEbook(data);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to load ebook!");
        setNotAllowed(true);
      })
      .finally(() => setLoading(false));
  }, [id, user?.id]);

  useEffect(() => {
    if (notAllowed) {
      toast.error("You can only edit your own ebooks!");
      router.replace("/dashboard/writer");
    }
  }, [notAllowed, router]);

  if (loading || notAllowed) {
    return (
      <div className="max-w-2xl space-y-4">
        <div className="h-6 w-48 animate-pulse rounded bg-parchment-200 dark:bg-ink-800" />
        <div className="h-48 w-36 animate-pulse rounded-lg bg-parchment-200 dark:bg-ink-800" />
        <div className="h-10 w-full animate-pulse rounded bg-parchment-200 dark:bg-ink-800" />
        <div className="h-24 w-full animate-pulse rounded bg-parchment-200 dark:bg-ink-800" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 font-display text-xl font-bold text-ink-900 dark:text-parchment-100">
        Edit Ebook
      </h1>
      <p className="mb-6 font-body text-sm text-ink-700/70 dark:text-parchment-200/70">
        Update the details of &quot;{ebook.title}&quot;.
      </p>

      <div className="max-w-2xl rounded-2xl border border-gold-600/20 bg-white p-6 dark:border-gold-600/20 dark:bg-ink-800">
        <EbookForm
          mode="edit"
          ebookId={id}
          initialValues={{
            title: ebook.title,
            description: ebook.description,
            content: ebook.content || "",
            genre: ebook.genre,
            price: ebook.price,
            coverImage: ebook.coverImage,
          }}
        />
      </div>
    </div>
  );
}