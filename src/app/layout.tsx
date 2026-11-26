import "./globals.css";
import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3, Caveat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "600", "700"] });
const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", weight: ["700"] });

export const metadata: Metadata = {
  title: "ModelLedger — the AI developer platform",
  description: "Build, evaluate and monitor AI agents, applications and models with confidence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${hand.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
