import "@/assets/fonts/piepme/style.css";
import { Providers } from "@/store/provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APP",
  description: "APP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}