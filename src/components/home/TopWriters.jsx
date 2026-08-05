// import { apiServer } from "@/lib/apiClient.server";
// import WriterAvatar from "./WriterAvatar";

// export default async function TopWriters() {
//   let writers = [];
//   try {
//     writers = await apiServer.get("/ebooks/top-writers");
//   } catch (err) {
//     console.error("Failed to load top writers:", err);
//   }

//   if (writers.length === 0) return null;

//   return (
//     <section className="bg-amber-50/60 py-16 dark:bg-gray-900/40">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
//           Top Writers
//         </h2>
//         <p className="mb-8 text-sm text-gray-500">Ranked by total sales</p>

//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//           {writers.map((writer) => (
//             <div
//               key={writer._id}
//               className="flex items-center gap-4 rounded-xl border border-amber-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950"
//             >
//               {/* TODO: ekhane writer avatar image add koro — imgbb te host kore
//                   `user` collection er "image" field e URL boshale ei WriterAvatar
//                   component automatically seta dekhabe, na thakle initial-letter fallback dekhabe */}
//               <WriterAvatar src={writer.avatar} name={writer.writerName} />
//               <div>
//                 <p className="font-semibold text-gray-900 dark:text-gray-100">
//                   {writer.writerName}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {writer.totalSales} sales
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { apiServer } from "@/lib/apiClient.server";
import WriterAvatar from "./WriterAvatar";

export default async function TopWriters() {
  let writers = [];
  try {
    writers = await apiServer.get("/ebooks/top-writers");
  } catch (err) {
    console.error("Failed to load top writers:", err);
  }

  if (writers.length === 0) return null;

  return (
    <section className="bg-parchment-100 py-16 dark:bg-ink-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-1 font-display text-2xl font-bold text-ink-800 dark:text-parchment-100">
          Top Writers
        </h2>
        <p className="mb-8 font-body text-sm text-ink-700/60 dark:text-parchment-200/60">
          Ranked by total sales
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {writers.map((writer) => (
            <div
              key={writer._id}
              className="flex items-center gap-4 rounded-sm border border-gold-600/30 bg-parchment-50 p-5 dark:bg-ink-900"
            >
              {/* TODO: ekhane writer avatar image add koro — imgbb te host kore
                  `user` collection er "image" field e URL boshale ei WriterAvatar
                  component automatically seta dekhabe, na thakle initial-letter fallback dekhabe */}
              <WriterAvatar src={writer.avatar} name={writer.writerName} />
              <div>
                <p className="font-display font-semibold text-ink-800 dark:text-parchment-100">
                  {writer.writerName}
                </p>
                <p className="font-body text-sm text-ink-700/60 dark:text-parchment-200/60">
                  {writer.totalSales} sales
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}