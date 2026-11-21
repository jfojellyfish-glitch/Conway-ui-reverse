import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zen Trading — Research Built to Be Verified",
  description: "Zen Trading research systems, transparent workflows and quant tools.",
  icons: {
    icon: [{ url: "/brand/zen-trading-tab-20261121.png", type: "image/png", sizes: "64x64" }],
    shortcut: "/brand/zen-trading-tab-20261121.png",
  },
};
export const viewport: Viewport = { themeColor: "#f7f6f5" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
