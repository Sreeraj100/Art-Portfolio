import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sreeraj | Hyper-Realistic Pencil Portrait Artist",
  description: "Commission premium handmade pencil portraits by Sreeraj. Specializing in hyper-realistic sketches of single, couple, and family portraits. The perfect timeless gift.",
  keywords: [
    "pencil portrait",
    "art commission",
    "Sreeraj artist",
    "custom drawing",
    "portrait sketch",
    "handmade portrait",
    "realistic drawing",
    "artwork",
    "personalized gift",
    "sketching service",
    "graphite art",
    "charcoal drawing",
    "artist India",
    "portrait pricing",
    "kerala artist",
    "pencil portrait artist",
    "pencil portrait artist kerala",
    "realistic drawing"
  ],
  authors: [{ name: "Sreeraj" }],
  openGraph: {
    title: "Sreeraj | Premium Pencil Portraits",
    description: "Turn your favorite memories into timeless art. Commission a hyper-realistic handmade pencil portrait today.",
    url: "https://art.sreeraj.online", // Placeholder URL, best practice to include standard one
    siteName: "Sreeraj Art Portfolio",
    images: [
      {
        url: "/images/gallery/img-main.png", // Using a high-quality gallery image
        width: 1200,
        height: 630,
        alt: "Hyper-realistic pencil portrait by Sreeraj",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sreeraj | Pencil Portrait Artist",
    description: "Commission a masterpiece today.",
    images: ["/images/gallery/img-main.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
