import localFont from "next/font/local";

// MONA's in-app fonts, used only where the site draws the app itself (the
// phone and feature cards in "What is MONA?"). Poppins is the app's body
// font and Stack Sans Text its display font. Self-hosted, so the build
// never has to reach Google Fonts for them.
export const appSans = localFont({
  src: [
    { path: "./poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-app-sans",
  display: "swap",
});

export const appDisplay = localFont({
  src: [
    { path: "./stack-sans-text-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./stack-sans-text-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./stack-sans-text-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-app-display",
  display: "swap",
});
