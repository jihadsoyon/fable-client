"use client";

const roles = ["user", "writer", "admin"];

export default function RoleSelect({ value, onChange, disabled }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium capitalize disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800"
    >
      {roles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
}