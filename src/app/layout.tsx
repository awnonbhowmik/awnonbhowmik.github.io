import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingSplash from "./components/LoadingSplash";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awnon Bhowmik — Doctoral Researcher & Software Engineer | v3.0",
  description:
    "Awnon Bhowmik is a doctoral researcher and software engineer working at the intersection of " +
    "cybersecurity, privacy-preserving machine learning, and applied mathematical modeling. " +
    "Doctor of Computer Science candidate at Colorado Technical University.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LoadingSplash>{children}</LoadingSplash>
      </body>
    </html>
  );
}
