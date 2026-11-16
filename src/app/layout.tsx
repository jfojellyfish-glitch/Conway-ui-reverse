import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Example — Application Model",
  description: "An independently implemented frontend reconstruction with neutral placeholder content and locally generated visuals.",
};
export const viewport: Viewport = { themeColor: "#f7f6f5" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
