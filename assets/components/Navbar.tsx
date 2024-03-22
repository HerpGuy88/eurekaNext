"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { default as ResponsiveMenu } from "./DebugComp";

const Navbar: React.FunctionComponent = () => {
  const searchParams = useSearchParams();
  const xrMode = searchParams.get("xrMode");

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
      {xrMode ? <></> : <ResponsiveMenu menuItems={menuItems} />}
      {/* {xrMode ? <></> : <></>} */}
    </Suspense>
  );
};

export default Navbar;
