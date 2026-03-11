import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./style.css";
import "./fonts.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

import localFont from "next/font/local";

export const aeonik = localFont({
  src: [
    { path: "../public/fonts/aeonik-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/aeonik-bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/aeonik-regularitalic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-aeonik"
});

export const packHard = localFont({
  src: "../public/fonts/Pack-Hard.woff2",
  variable: "--font-packhard"
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YES!26",
  description: "YES!26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={`${aeonik.variable} ${packHard.variable}`}>
      <body
        className={`ff-aeonik antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
