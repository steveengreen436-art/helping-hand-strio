import type { Metadata } from "next";
import "./globals.css";
import Logo from "@/components/Logo";
import AIChatbot from "@/components/AIChatbot";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Helping Hand Strio - Employment Directory",
  description: "Connecting talent directly with employment opportunities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-platinum flex flex-col min-h-screen">
        <header className="border-b border-white/10 bg-obsidian/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="hover:opacity-90 transition">
              <Logo size="sm" />
            </Link>
            <nav className="flex items-center gap-6 text-sm font-semibold">
              <Link href="/explore" className="text-platinum/80 hover:text-neonCyan transition">
                Browse Directory
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-neonCyan text-obsidian rounded-lg hover:opacity-90 transition">
                Post CV
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>

        <AIChatbot />

        <footer className="border-t border-white/10 py-6 text-center text-xs text-platinum/50 bg-obsidian">
          <p>© {new Date().getFullYear()} Helping Hand Strio. All user data protected and vetted for safety.</p>
        </footer>
      </body>
    </html>
  );
}
