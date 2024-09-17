'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/app/GlobalProvider";
import { SessionProvider } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import FooterComponent from "@/components/FooterComponent";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <GlobalProvider>
          <SessionProvider>
          <Navbar />
          {children}
          <FooterComponent />
          <Toaster />
          </SessionProvider>
        </GlobalProvider>
        
      </body>
    </html>
  );

}
