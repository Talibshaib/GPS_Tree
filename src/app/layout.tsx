import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delhi Pollution Monitoring - Admin Panel",
  description: "Admin panel for Delhi pollution monitoring system and IoT devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 font-sans`}
      >
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 md:ml-64 transition-all duration-300 ease-in-out">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
