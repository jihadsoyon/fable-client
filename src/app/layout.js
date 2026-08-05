// import "./globals.css";
// import { Providers } from "@/providers/Providers";

// export const metadata = {
//   title: "Fable — Discover & Read Original Ebooks",
//   description:
//     "Fable connects ebook lovers with talented writers. Browse, discover, and read original ebooks.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body>
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }




import "./globals.css";
import { Playfair_Display, Lora } from "next/font/google";
import { Providers } from "@/providers/Providers";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-display",
  weight: ["500", "600", "700", "800"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Fable — Discover & Read Original Ebooks",
  description:
    "Fable connects ebook lovers with talented writers. Browse, discover, and read original ebooks.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${lora.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}