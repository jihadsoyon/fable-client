"use client";

const roles = ["user", "writer", "admin"];

export default function RoleSelect({ value, onChange, disabled }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="rounded-lg border border-parchment-300 px-2.5 py-1.5 font-body text-xs font-medium capitalize text-ink-900 disabled:opacity-60 dark:border-ink-700 dark:bg-ink-800 dark:text-parchment-100"
    >
      {roles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
}