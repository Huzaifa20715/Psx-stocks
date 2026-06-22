import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORTE — 3D Web Experiences",
  description: "Immersive, interactive 3D websites and digital experiences. WebGL, Three.js, and high-end web development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
