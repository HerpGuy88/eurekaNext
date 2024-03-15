"use client";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { Menu, MenuItem } from "semantic-ui-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useWindowDimensions } from "@assets/functions";
import Link from "next/link";
import { ResponsiveMenu } from "./";

const Navbar: React.FunctionComponent = () => {
  const searchParams = useSearchParams();
  const xrMode = searchParams.get("xrMode");
  const pathName = usePathname();
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const menuItems = [
    { name: "homePage", label: "Home", path: "/" },
    { name: "writing", label: "Scientific Writing", path: "/writing" },
    { name: "software", label: "Software Development", path: "/software" },
    { name: "portfolio", label: "Portfolio", path: "/portfolio" },
    { name: "about", label: "About", path: "/about" },
    { name: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <Suspense fallback={<></>}>
      {xrMode ? (
        <></>
      ) : (
        <ResponsiveMenu menuItems={menuItems} />
        // <Menu stackable inverted fixed="top" style={{ marginTop: 0 }}>
        //   <MenuItem
        //     name="homePage"
        //     active={pathName === "/"}
        //     onClick={() => router.push("/")}
        //   >
        //     Home
        //   </MenuItem>
        //   <MenuItem
        //     name="writing"
        //     active={pathName === "/writing"}
        //     onClick={() => router.push("/writing")}
        //   >
        //     Scientific Writing
        //   </MenuItem>
        //   <MenuItem
        //     name="software"
        //     active={pathName === "/software"}
        //     onClick={() => router.push("/software")}
        //   >
        //     Software Development
        //   </MenuItem>
        //   <Link href="/portfolio">
        //     <MenuItem
        //       name="portfolio"
        //       active={pathName.startsWith("/portfolio")}
        //     >
        //       Portfolio
        //     </MenuItem>
        //   </Link>
        //   <MenuItem
        //     name="about"
        //     active={pathName === "/about"}
        //     onClick={() => router.push("/about")}
        //   >
        //     About
        //   </MenuItem>
        //   <MenuItem
        //     name="contact"
        //     active={pathName === "/contact"}
        //     onClick={() => router.push("/contact")}
        //   >
        //     Contact
        //   </MenuItem>
        // </Menu>
      )}
    </Suspense>
  );
  // </Segment>
};

export default Navbar;
