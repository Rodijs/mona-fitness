import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mona.fitness"),
  title: "Mona — Your AI fitness coach",
  description:
    "Mona builds you a personalized training and nutrition plan, then adapts it as you go. Join the waitlist to get early access.",
  openGraph: {
    title: "Mona — Your AI fitness coach",
    description:
      "Mona builds you a personalized training and nutrition plan, then adapts it as you go. Join the waitlist to get early access.",
    url: "https://mona.fitness",
    siteName: "Mona",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mona — Your AI fitness coach",
    description:
      "Mona builds you a personalized training and nutrition plan, then adapts it as you go. Join the waitlist to get early access.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
