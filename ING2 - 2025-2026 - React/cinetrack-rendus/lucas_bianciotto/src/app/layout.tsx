import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineTrack",
  description: "Suivez vos films et séries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#141414] text-[#e5e5e5]">
        <header className="sticky top-0 z-50 bg-gradient-to-b from-black to-transparent px-8 py-4 flex items-center gap-8">
          <span className="text-[#E50914] text-3xl font-extrabold tracking-tight">
            CINETRACK
          </span>
        </header>
        <main className="px-8 pb-12">{children}</main>
      </body>
    </html>
  );
}
