import type { Metadata } from "next";
import { Inter, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "ShuttleVN - Đặt sân cầu lông",
    template: "%s | ShuttleVN",
  },
  description: "Hệ thống đặt sân cầu lông trực tuyến - Nhanh chóng, tiện lợi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${inter.variable} ${hankenGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap"
        />
      </head>
      <body className="font-sans bg-slate-50 text-slate-800 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
