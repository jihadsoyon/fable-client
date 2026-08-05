
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Trash2, Eye, EyeOff } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import toast from "react-hot-toast";
// import TableSkeleton from "@/components/dashboard/TableSkeleton";
// import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import EmptyDashboardState from "../../EmptyDashboardState";
import TableSkeleton from "../../TableSkeleton";

export default function AdminManageEbooksPage() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    apiClient
      .get("/ebooks/admin/all")
      .then((data) => setEbooks(data))
      .catch((error) => toast.error(error.message || "Failed to load ebooks!"))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleStatus = async (ebook) => {
    setTogglingId(ebook._id);
    try {
      const { status } = await apiClient.patch(`/ebooks/${ebook._id}/toggle-status`);
      setEbooks((prev) =>
        prev.map((e) => (e._id === ebook._id ? { ...e, status } : e))
      );
      toast.success(`Ebook ${status}!`);
    } catch (error) {
      toast.error(error.message || "Could not update status!");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiClient.delete(`/ebooks/${deleteTarget._id}`);
      setEbooks((prev) => prev.filter((e) => e._id !== deleteTarget._id));
      toast.success("Ebook deleted!");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error.message || "Could not delete ebook!");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 font-display text-xl font-bold text-ink-800 dark:text-parchment-100">
          Manage All Ebooks
        </h1>
        <TableSkeleton rows={5} cols={5} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-xl font-bold text-ink-800 dark:text-parchment-100">
        Manage All Ebooks
      </h1>

      {ebooks.length === 0 ? (
        <EmptyDashboardState
          icon={BookOpen}
          title="No ebooks found"
          description="Ebooks published by writers will appear here."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-parchment-300 dark:border-ink-700">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-parchment-300 bg-parchment-100 text-xs uppercase tracking-wide text-ink-700/60 dark:border-ink-700 dark:bg-ink-800/60 dark:text-parchment-300/60">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Writer</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-200 dark:divide-ink-700">
              {ebooks.map((ebook) => (
                <tr
                  key={ebook._id}
                  className="bg-parchment-50 transition-colors hover:bg-parchment-100 dark:bg-ink-900 dark:hover:bg-ink-800"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/ebooks/${ebook._id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-md border border-parchment-300 dark:border-ink-700">
                        <Image
                          src={ebook.coverImage}
                          alt={ebook.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="line-clamp-1 font-medium text-ink-800 hover:text-gold-600 dark:text-parchment-100 dark:hover:text-gold-400">
                        {ebook.title}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-700/70 dark:text-parchment-300/70">
                    {ebook.writerName}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink-800 dark:text-parchment-100">
                    ${ebook.price}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        ebook.status === "published"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-parchment-200 text-ink-700/70 dark:bg-ink-700 dark:text-parchment-300/70"
                      }`}
                    >
                      {ebook.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleStatus(ebook)}
                        disabled={togglingId === ebook._id}
                        title={ebook.status === "published" ? "Unpublish" : "Publish"}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-parchment-300 text-ink-700/70 hover:bg-parchment-200 disabled:opacity-60 dark:border-ink-700 dark:text-parchment-300/70 dark:hover:bg-ink-700"
                      >
                        {ebook.status === "published" ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteTarget(ebook)}
                        title="Delete"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this ebook?"
        description={`"${deleteTarget?.title}" will be permanently removed from the platform. This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}