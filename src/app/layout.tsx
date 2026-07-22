import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import RouteAtmosphere from "./components/RouteAtmosphere";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Awnon Bhowmik — Doctoral Researcher & Software Engineer",
  description:
    "Awnon Bhowmik is a doctoral researcher, software engineer, and mathematics tutor working at the intersection of " +
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
