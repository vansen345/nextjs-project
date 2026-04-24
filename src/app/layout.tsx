import "@/assets/fonts/piepme/style.css";
import Header from "@/lib/ui/header/header_home";
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
        <Providers>
          <Header />
          <section className="flex flex-col gap-6 place-content-center place-items-center grow relative max-lg:px-5 max-lg:py-8 max-lg:gap-4">
            <div className="bg-layer bg-layer-1" />
            <div className="bg-layer bg-layer-4" />
            <div className="bg-layer bg-layer-5" />
            <div className="bg-layer bg-layer-2" />
            <div className="bg-layer bg-layer-3" />
            {children}
          </section>
        </Providers>
      </body>
    </html>
  );
}
