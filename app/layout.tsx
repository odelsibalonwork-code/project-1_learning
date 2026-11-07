import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vohn Studio — Make your next move impossible to ignore",
  description:
    "A creative studio building expressive digital experiences, bold brand visuals, and social-first video.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
