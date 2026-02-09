import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Footer from "../components/layout/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
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
        className={`${nunito.variable} font-sans antialiased min-h-screen flex flex-col bg-gray-950`}
      >
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
