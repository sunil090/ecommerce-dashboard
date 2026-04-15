import type React from "react";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";  // Keep global styles here

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen bg-background text-foreground">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
