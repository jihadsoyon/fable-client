const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function serverGet(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    cache: "no-store", // always fresh data; switch to revalidate if you want ISR later
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return res.json();
}

export const apiServer = {
  get: serverGet,
};