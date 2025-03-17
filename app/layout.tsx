import "./globals.css";

import { Geist as FontSans, Geist_Mono as FontMono } from "next/font/google";
import Nuqs from "@/components/nuqs";
import NextThemes from "@/components/next-themes";
import ThemeToggle from "@/components/theme-toggle";

import type { Metadata } from "next";

const fontSans = FontSans({
  variable: "--font-sans",
  display: "swap",
  subsets: ["latin"],
});

const fontMono = FontMono({
  variable: "--font-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pushin-mongo-movies.vercel.app"),
  title: "Pushin Mongo Movies",
  description:
    "A personal movie database using MongoDB, Next.js, TypeScript, Nuqs, Tailwind CSS, & more!",
  applicationName: "Pushin Mongo Movies",
  referrer: "origin-when-cross-origin",
  creator: "https://egxo.dev.",
  keywords: [
    "nextjs, next, nuqs, mongo, mongodb, typescript, javascript, react, tailwind, tailwindcss, movies, database, moviedb, shadcnui",
  ],
  openGraph: {
    title: "Pushin Mongo Movies",
    description:
      "A personal movie database using MongoDB, Next.js, TypeScript, Nuqs, Tailwind CSS, & more!",
    url: "https://pushin-mongo-movies.vercel.app",
    siteName: "Pushin Mongo Movies",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "https://pushin-mongo-movies.vercel.app",
    description:
      "A personal movie database using MongoDB, Next.js, TypeScript, Nuqs, Tailwind CSS, & more!",
    creator: "@eg__xo",
    site: "@eg__xo",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#262323" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="scroll-smooth font-sans antialiased">
        <Nuqs>
          <NextThemes>
            <ThemeToggle />
            {children}
          </NextThemes>
        </Nuqs>
      </body>
    </html>
  );
}
