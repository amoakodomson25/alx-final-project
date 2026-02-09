import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "../components/layout/Footer";

const open_sans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieFlix - Discover Your Next Favorite Movie",
  description: "Get personalized movie recommendations, track what you've watched, and share your thoughts with the community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${open_sans.variable} antialiased min-h-screen flex flex-col bg-gray-950`}
      >
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
