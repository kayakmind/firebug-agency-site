import type { Metadata } from "next";
import { Space_Mono, DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Firebug Agency — Your AI Person",
    template: "%s — Firebug Agency",
  },
  description:
    "AI moves fast. We make sure you keep up. Strategy, implementation, and ongoing guidance for organizations ready to use AI effectively.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://firebugagency.com"
  ),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
