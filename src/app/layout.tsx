import type { Metadata } from "next";
import "./globals.css";
import RouteAtmosphere from "./components/RouteAtmosphere";

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
      <body className="antialiased" suppressHydrationWarning>
        <RouteAtmosphere />
        {children}
      </body>
    </html>
  );
}
