import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const rajdhani = Rajdhani({
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});
const orbitron = Orbitron({
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Convolution-XI",
  description: "The official annual techno-management fest of the Department of Electrical Engineering, Jadavpur University. Where innovation meets circuitry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} ${orbitron.variable} antialiased bg-black`}
      > 
        <ClientProvider>
          {/* <Preloader/> */}
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
