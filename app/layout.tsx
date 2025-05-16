import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nuqs from "@/components/nuqs";
import NextThemes from "@/components/next-themes";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  icons: {
    icon: {
      url: "/icon.png",
      sizes: "192x192",
      type: "image/png",
    },
    apple: {
      url: "/apple-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: {
      rel: "icon",
      url: "/icon.svg",
      type: "image/svg+xml",
    },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} scroll-smooth font-sans antialiased`}
      >
        <Nuqs>
          <NextThemes>
            <Navbar />
            {children}
          </NextThemes>
        </Nuqs>
      </body>
    </html>
  );
}
