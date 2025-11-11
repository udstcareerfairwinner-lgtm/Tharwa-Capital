import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Barakah Invest",
  description: "Invest with Faith, Grow with Purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Belleza&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}
