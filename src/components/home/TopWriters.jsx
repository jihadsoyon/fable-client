import { apiServer } from "@/lib/apiClient.server";

export default async function TopWriters() {
  let writers = [];
  try {
    writers = await apiServer.get("/ebooks/top-writers");
  } catch (err) {
    console.error("Failed to load top writers:", err);
  }

  if (writers.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Top Writers
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {writers.map((writer) => (
            <div
              key={writer._id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-400">
                {writer.writerName?.charAt(0)?.toUpperCase() || "W"}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {writer.writerName}
                </p>
                <p className="text-sm text-gray-500">{writer.totalSales} sales</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}