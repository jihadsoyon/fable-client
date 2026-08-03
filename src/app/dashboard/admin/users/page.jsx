"use client";

import { useEffect, useState } from "react";
import { Users, Trash2 } from "lucide-react";
import { apiClient } from "@/lib/apiClient.client";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import TableSkeleton from "@/components/dashboard/TableSkeleton";
import EmptyDashboardState from "@/components/dashboard/EmptyDashboardState";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import RoleSelect from "@/components/dashboard/RoleSelect";

export default function ManageUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    apiClient
      .get("/users")
      .then((data) => setUsers(data))
      .catch((error) => toast.error(error.message || "Failed to load users!"))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (targetUser, newRole) => {
    if (newRole === targetUser.role) return;

    setUpdatingId(targetUser._id);
    try {
      await apiClient.patch(`/users/${targetUser._id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === targetUser._id ? { ...u, role: newRole } : u))
      );
      toast.success(`Role updated to ${newRole}!`);
    } catch (error) {
      toast.error(error.message || "Could not update role!");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await apiClient.delete(`/users/${deleteTarget._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      toast.success("User deleted!");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error.message || "Could not delete user!");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
          Manage Users
        </h1>
        <TableSkeleton rows={5} cols={4} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
        Manage Users
      </h1>

      {users.length === 0 ? (
        <EmptyDashboardState
          icon={Users}
          title="No users found"
          description="Registered users will appear here."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:bg-gray-900/60">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.map((u) => {
                const isSelf = u._id === currentUser?.id;
                return (
                  <tr
                    key={u._id}
                    className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {u.name}
                      {isSelf && (
                        <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/10">
                          You
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {u.email}
                    </td>
                    <td className="px-4 py-3">
                      <RoleSelect
                        value={u.role}
                        onChange={(newRole) => handleRoleChange(u, newRole)}
                        disabled={updatingId === u._id || isSelf}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setDeleteTarget(u)}
                        disabled={isSelf}
                        title={isSelf ? "You can't delete your own account" : "Delete"}
                        className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-900 dark:hover:bg-red-950/40"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this user?"
        description={`"${deleteTarget?.name}" will be permanently removed. This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}