import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Awnon Bhowmik - Portfolio, Version 2.0",
  description: "Welcome to Awnon Bhowmik's portfolio showcasing projects, skills, and achievements.",
};

<Head>
  <link rel="icon" href="/favicon.ico" />
</Head>

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
