import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.myhireroads.com"),
  title: {
    default: "My Hire Roads | Strategic Career Services in Florida",
    template: "%s | My Hire Roads",
  },
  description:
    "My Hire Roads helps professionals position themselves for better career opportunities through strategic resume writing, LinkedIn optimization, interview coaching, career transition support, and salary negotiation.",
  keywords: [
    "career services Florida",
    "resume writing",
    "LinkedIn optimization",
    "interview coaching",
    "career transition coaching",
    "salary negotiation",
    "ATS resume writing",
    "career coach Florida",
    "job search strategy",
    "Katherine Fasanella",
  ],
  authors: [{ name: "Katherine Fasanella" }],
  creator: "My Hire Roads",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.myhireroads.com",
    siteName: "My Hire Roads",
    title: "My Hire Roads | Strategic Career Services in Florida",
    description:
      "Strategic resume writing, LinkedIn optimization, interview coaching, and salary negotiation for professionals ready to advance their careers.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "My Hire Roads — Strategic Career Services in Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Hire Roads | Strategic Career Services in Florida",
    description:
      "Strategic resume writing, LinkedIn optimization, interview coaching, and salary negotiation for professionals ready to advance.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${poppins.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: 'var(--font-manrope), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
