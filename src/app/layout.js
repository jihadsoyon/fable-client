import "./globals.css";
import { Providers } from "@/providers/Providers";

export const metadata = {
  title: "Fable — Discover & Read Original Ebooks",
  description:
    "Fable connects ebook lovers with talented writers. Browse, discover, and read original ebooks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}