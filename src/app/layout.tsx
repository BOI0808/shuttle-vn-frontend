import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
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
      className={`${inter.variable} ${beVietnamPro.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0..1&display=swap"
        />
      </head>
      <body className="font-sans bg-surface-bg text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
