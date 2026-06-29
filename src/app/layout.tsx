import "@/assets/fonts/piepme/style.css";
import "@/i18n";
import Header from "@/lib/ui/header/header_home";
import { NotificationProvider } from "@/store/NotificationProvider";
import { Providers } from "@/store/provider";
import "antd/dist/reset.css";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: 'https://res.cloudinary.com/dcu47l2uc/image/upload/v1782701927/icon_vj49z7.png',
  },
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
          <NotificationProvider />
          <Header />
          <section className="flex flex-col gap-6 place-content-center bg-[#f2f2f6] grow relative max-lg:px-5 max-lg:gap-4 pt-20">
            {/* <div className="bg-layer bg-layer-1" />
            <div className="bg-layer bg-layer-4" />
            <div className="bg-layer bg-layer-5" />
            <div className="bg-layer bg-layer-2" />
            <div className="bg-layer bg-layer-3" /> */}
            {children}
          </section>
        </Providers>
      </body>
    </html>
  );
}
