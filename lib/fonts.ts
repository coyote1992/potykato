import { Bellefair, Montserrat, WindSong } from "next/font/google";

// Bellefair: the serif for headings and body (close to the reference's display face).
// WindSong: the long, thin signature script for section titles.
// Montserrat: small caps for navigation, labels and buttons.
export const serif = Bellefair({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-serif", display: "swap" });
export const script = WindSong({ weight: ["400", "500"], subsets: ["latin", "latin-ext"], variable: "--font-script", display: "swap" });
export const sans = Montserrat({ weight: ["400", "500"], subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
