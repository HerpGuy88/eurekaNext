"use client";
import Image from "next/image";
import { Menu, MenuItem, Segment } from "semantic-ui-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Navbar: React.FunctionComponent = () => {
  const searchParams = useSearchParams();
  const xrMode = searchParams.get("xrMode");
  const pathName = usePathname();
  const router = useRouter();

  if (xrMode) {
    return <></>;
  }
  return (
    // <Segment inverted fixed="top" size="mini">
    <Menu stackable inverted fixed="top" style={{ marginTop: 0 }}>
      {/* <MenuItem>
        <Image
          alt="logo"
          src="https://react.semantic-ui.com/logo.png"
          width="30"
          height="30"
        />
      </MenuItem> */}
      <MenuItem
        name="homePage"
        active={pathName === "/"}
        onClick={() => router.push("/")}
      >
        Home
      </MenuItem>
      <MenuItem
        name="writing"
        active={pathName === "/writing"}
        onClick={() => router.push("/writing")}
      >
        Scientific Writing
      </MenuItem>
      <MenuItem
        name="software"
        active={pathName === "/software"}
        onClick={() => router.push("/software")}
      >
        Software Development
      </MenuItem>
      <Link href="/portfolio">
        <MenuItem name="portfolio" active={pathName.startsWith("/portfolio")}>
          Portfolio
        </MenuItem>
      </Link>
      <MenuItem
        name="about"
        active={pathName === "/about"}
        onClick={() => router.push("/about")}
      >
        About
      </MenuItem>
      <MenuItem
        name="contact"
        active={pathName === "/contact"}
        onClick={() => router.push("/contact")}
      >
        Contact
      </MenuItem>
    </Menu>
    // </Segment>
  );
};

export default Navbar;
