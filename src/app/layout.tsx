import { JetBrains_Mono, Share_Tech_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "NGUYEN-OS | Fullstack Engineer Portfolio",
  description:
    "Fullstack Software Engineer specializing in FastAPI (Python) & React/Next.js. Explore my cyberpunk-themed portfolio showcasing landing pages, WordPress platforms, React projects, Python backend systems, and automation tools.",
  keywords:
    "fullstack developer, software engineer, FastAPI, React, Next.js, Python, portfolio, cyberpunk",
  authors: [{ name: "Nguyen" }],
  openGraph: {
    title: "NGUYEN-OS | Fullstack Engineer Portfolio",
    description:
      "Explore the systems of a Fullstack Software Engineer — cyberpunk command center portfolio.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <head>
        {/* Orbitron loaded via link tag since next/font/google may not support all display fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Noise overlay */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
