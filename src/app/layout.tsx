import bg from "../../assets/images/main_bg.jpg";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "semantic-ui-css/semantic.min.css";
import "./globals.css";
import { Navbar, NavbarSpacer } from "@assets/components";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
