// export default function TableSkeleton({ rows = 5, cols = 4 }) {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
//       <div className="divide-y divide-gray-100 dark:divide-gray-800">
//         {Array.from({ length: rows }).map((_, r) => (
//           <div key={r} className="flex items-center gap-4 p-4">
//             {Array.from({ length: cols }).map((_, c) => (
//               <div
//                 key={c}
//                 className="h-4 flex-1 animate-pulse rounded bg-gray-200 dark:bg-gray-800"
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


export default function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold-600/20 dark:border-gold-600/20">
      <div className="divide-y divide-parchment-200 dark:divide-ink-700">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center gap-4 p-4">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                className="h-4 flex-1 animate-pulse rounded bg-parchment-200 dark:bg-ink-800"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}