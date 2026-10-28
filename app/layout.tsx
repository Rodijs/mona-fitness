import type { Metadata, Viewport } from "next";
import { DM_Mono, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Menu labels (uppercase, monospaced, with the scramble effect).
const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mona.fitness"),
  title: "MONA — Move & Build Consistency",
  description:
    "MONA turns everyday movement into a habit. Track your reps with AI, take on daily challenges, and see your progress — one workout at a time. Join the waitlist for early access.",
  openGraph: {
    title: "MONA — Move & Build Consistency",
    description:
      "MONA turns everyday movement into a habit. Track your reps with AI, take on daily challenges, and see your progress — one workout at a time. Join the waitlist for early access.",
    url: "https://mona.fitness",
    siteName: "MONA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MONA — Move & Build Consistency",
    description:
      "MONA turns everyday movement into a habit. Track your reps with AI, take on daily challenges, and see your progress — one workout at a time. Join the waitlist for early access.",
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
      className={`${manrope.variable} ${playfair.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
