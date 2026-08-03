import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getToken() {
  try {
    const { data } = await authClient.token();
    return data?.token || null;
  } catch {
    return null;
  }
}

async function request(path, options = {}) {
  const token = await getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export const apiClient = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path, body) =>
    request(path, { method: "DELETE", body: body ? JSON.stringify(body) : undefined }),
};