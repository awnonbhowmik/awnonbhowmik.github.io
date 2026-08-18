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
  applicationName: "Awnon Bhowmik — Academic Portfolio",
  authors: [{ name: "Awnon Bhowmik", url: SITE_URL }],
  creator: "Awnon Bhowmik",
  publisher: "Awnon Bhowmik",
  category: "Academic portfolio",
  keywords: [
    "Awnon Bhowmik",
    "cybersecurity researcher",
    "privacy-preserving machine learning",
    "applied cryptography",
    "differential privacy",
    "software engineer",
    "applied mathematics",
  ],
  openGraph: {
    title: "Awnon Bhowmik — Doctoral Researcher & Software Engineer",
    description:
      "Research and engineering across cybersecurity, privacy-preserving machine learning, cryptography, and applied mathematics.",
    url: SITE_URL,
    siteName: "Awnon Bhowmik",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awnon Bhowmik — Doctoral Researcher & Software Engineer",
    description:
      "Research and engineering across cybersecurity, privacy-preserving machine learning, cryptography, and applied mathematics.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="top" className="antialiased" suppressHydrationWarning>
        <RouteAtmosphere />
        {children}
      </body>
    </html>
  );
}
