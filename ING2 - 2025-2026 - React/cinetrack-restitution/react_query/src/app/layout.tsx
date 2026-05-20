import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import LogoutButton from "./components/LogoutButton";
import QueryProvider from "./components/QueryProvider";
import { auth } from "@/auth";
import { Film } from "lucide-react";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const displayName = session?.user?.name ?? session?.user?.email ?? null;
  const initials = displayName ? displayName.slice(0, 2).toUpperCase() : null;
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
        <ThemeProvider>
          {/* Material App Bar */}
          <header
            className="sticky top-0 z-40 flex items-center gap-3 px-6 h-16 shadow-md"
            style={{ background: "var(--md-primary)" }}
          >
            <Film size={26} className="text-white" />
            <span className="text-white text-xl font-semibold tracking-wide flex-1">
              CineTrack
            </span>
            <ThemeToggle />
            {session && initials && (
              <>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}
                  title={displayName ?? ""}
                >
                  {initials}
                </div>
                <LogoutButton />
              </>
            )}
          </header>

          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
            {children}
          </main>
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
