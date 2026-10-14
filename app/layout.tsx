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
  title: "My Hire Roads | Strategic Career Services",
  description:
    "Professional resume writing, LinkedIn optimization, interview coaching, career transition support and salary negotiation for experienced professionals.",
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
