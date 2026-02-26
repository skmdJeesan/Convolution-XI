import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani, Orbitron } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
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
  title: "Convolution 2026 | JUEE's Annual Techfest",
  description:
    "INNOVATE. INTEGRATE. INSPIRE. | Convolution, the annual technical fest of JUEE, is a vibrant celebration of talent, creativity, and innovation, showcasing a diverse range of competitions, events, and activities.",
  keywords: [
    "Convolution 2026",
    "Convolution 26",
    "Convolution",
    "Convolution juee",
    "Convolution ju ee",
    "Convolution Jadavpur",
    "Convolution electrical engineering",
    "Convolution 11.0",
    "Convolution XI",
    "Convolution 11",
    "Convolution-11",
    "Convolutionxi",
    "Convolution xi",
    "Convolution-xi",
    "Convolution-XI",
    "Convolution JUEE",
    "Convolution JU EE",
    "Convolution Jadavpur University",
    "Jadavpur University",
    "JUEE",
    "juee",
    "Kolkata",
    "Jadavpur latest Tech fest",
    "Event",
    "Coding",
    "Brainstorming",
    "Mind Boggling",
    "Skills",
    "Kolkata's biggest TechFest",
    "Jadavpur's biggest TechFest",
    "ju's biggest TechFest",
    "Kolkata techfest",
    "West Bengal techfest",
    "convolution kolkata",
    "Electrical Engineering",
    "Techfest",
    "Jadavpur University Techfest",
    "Jadavpur University techfest",
    "JU techfest",
    "ju techfest",
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
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  // for whatsapp, linkedin, twitter, discord preview
  openGraph: {
    title: "Convolution 2026 | JUEE's Annual Techfest",
    description: "Celebrate creativity and innovation at Convolution 11, JUEE's annual technical fest.",
    url: "https://www.convolutionjuee.com",
    siteName: "Convolution JUEE",
    images: [
      {
        url: "https://www.convolutionjuee.com/opengraph_img.png",
        width: 1200,
        height: 630,
        alt: "Convolution 2026 Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Convolution 11 | Annual Techno-Management Fest of JUEE",
    description: "Celebrate creativity and innovation at Convolution 11 , JUEE's annual technical fest.",
    images: ["https://www.convolutionjuee.com/opengraph_img.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Convolution JUEE",
    "url": "https://www.convolutionjuee.com",
    "logo": "https://www.convolutionjuee.com/favicon.ico",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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