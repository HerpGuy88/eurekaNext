// @ts-nocheck

import bg from "../../assets/images/main_bg.jpg";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "semantic-ui-css/semantic.min.css";
import "./globals.css";
import { Navbar, NavbarSpacer } from "@assets/components";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

// const polyfill = new WebXRPolyfill();

export const metadata: Metadata = {
  title: "Eureka! Writing",
  description:
    "Contract software development, scientific writing, and clinical support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if (typeof global.navigator === "undefined") global.navigator = {};

  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <Suspense fallback={<></>}>
          <div>
            <Navbar />
            <NavbarSpacer />
          </div>
        </Suspense>

        <span className="mainContent">{children}</span>
      </body>
    </html>
  );
}
