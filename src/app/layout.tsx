import { JetBrains_Mono, Share_Tech_Mono } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
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

const themeInitScript = `
  (() => {
    try {
      const savedTheme = localStorage.getItem("nguyen-os-theme");
      const theme = savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
      document.documentElement.classList.toggle("light", theme === "light");
      document.documentElement.style.colorScheme = theme;
    } catch {
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

export const metadata: Metadata = {
  title: "NGUYEN-OS | Frontend Engineer Portfolio",
  description:
    "Frontend-focused software engineer building responsive product experiences with React, Next.js, and TypeScript.",
  keywords:
    "frontend developer, frontend engineer, React, Next.js, TypeScript, UI development, portfolio",
  authors: [{ name: "Nguyen" }],
  openGraph: {
    title: "NGUYEN-OS | Frontend Engineer Portfolio",
    description:
      "React, Next.js, and TypeScript work presented through the NGUYEN-OS command center.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NGUYEN-OS | Frontend Engineer Portfolio",
    description:
      "Frontend-focused engineering work with React, Next.js, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${shareTechMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
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
