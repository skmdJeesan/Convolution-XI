import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.convolutionjuee.com"),
  title: "Convolution 2026",
  description:
    "Convolution, the annual technical fest of JUEE, is a vibrant celebration of talent, creativity, and innovation, showcasing a diverse range of competitions, events, and activities.",
  keywords: [
    "Convolution 2026",
    "Convolution 26",
    "Convolution",
    "Convolution 11.0",
    "Convolution XI",
    "Convolution 11",
    "Convolutionxi",
    "Convolution-XI",
    "Convolution JUEE",
    "Convolution JU EE",
    "Convolution Jadavpur University",
    "Jadavpur University",
    "JUEE",
    "Jadavpur University Techfest",
    "JU EE Techfest",
    "fest",
    "technical fest",
    "electrical engineering",
  ],
  authors: [
    { name: "JUEE Student's Forum", url: "https://www.convolutionjuee.com" },
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.convolutionjuee.com",
  },
  publisher: "Jadavpur University Electrical Engineering Students' Forum",
  twitter: {
    card: "summary_large_image",
    title: "Convolution 11 | Annual Techno-Management Fest of JUEE",
    description:
      "Celebrate creativity and innovation at Convolution-11 , JUEE's annual technical fest.",
    images: ["/Convologo.png"],
  },
  other: {
    jsonLd: `
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://www.convolutionjuee.com",
      "logo": "https://www.convolutionjuee.com/favicon.ico",
    }
    `,
  },
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
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
