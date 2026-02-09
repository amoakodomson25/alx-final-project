import type { Metadata } from "next";
import "./globals.css";
import Footer from "../components/layout/Footer";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`font-sans antialiased min-h-screen flex flex-col bg-gray-950`}
      >
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
