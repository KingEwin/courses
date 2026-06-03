import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// The real Nintendo DS BIOS font drives both display and body — one
// pixel-accurate face is more authentic than mixing two pseudo-pixel
// Google Fonts.
const dsBios = localFont({
  src: "../public/Nintendo-DS-BIOS.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-ds",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CineTrack",
  description: "Ta cinémathèque personnelle, façon Nintendo DS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`h-full antialiased ${dsBios.variable}`}
    >
      <body className="ds-grid-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
