import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acme Dashboard",
  description: "Sample dashboard app for Triaige visual regression testing",
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
      >
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main
            style={{
              marginLeft: "var(--sidebar-width)",
              flex: 1,
              minHeight: "100vh",
              backgroundColor: "var(--color-bg-secondary)",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
