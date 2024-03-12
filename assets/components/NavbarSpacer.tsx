"use client";
import Image from "next/image";
import { Menu, MenuItem, Segment } from "semantic-ui-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const NavbarSpacer: React.FunctionComponent = () => {
  const searchParams = useSearchParams();
  const xrMode = searchParams.get("xrMode");
  const pathName = usePathname();
  const router = useRouter();

  if (xrMode) {
    return <></>;
  }
  return (
    // <Segment inverted fixed="top" size="mini">
    <Menu stackable inverted style={{ marginTop: 0 }}>
      {/* <MenuItem>
        <Image
          alt="logo"
          src="https://react.semantic-ui.com/logo.png"
          width="30"
          height="30"
        />
      </MenuItem> */}
    </Menu>
    // </Segment>
  );
};

export default NavbarSpacer;
