"use client";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { Dropdown, Icon, Menu, MenuItem } from "semantic-ui-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useWindowDimensions } from "@assets/functions";
import Link from "next/link";

type MenuItemProps = {
  name: string;
  label: string;
  path: string;
};

export default function ResponsiveMenu({
  menuItems,
}: {
  menuItems: Array<MenuItemProps>;
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  //       <MenuItem
  //     name="homePage"
  //     active={pathName === "/"}
  //     onClick={() => router.push("/")}
  //   >

  return (
    <Menu
      inverted
      fixed="top"
      style={{ marginTop: 0, justifyContent: "center" }}
    >
      {width > 789 ? (
        menuItems.map((item, index) => (
          <MenuItem
            key={`mi${index}`}
            name={item.name}
            active={pathName === item.path}
            onClick={() => router.push(item.path)}
          >
            {item.label}
          </MenuItem>
        ))
      ) : (
        <Dropdown text="Menu" pointing className="link item">
          <Dropdown.Menu>
            {menuItems.map((item, index) => (
              <Dropdown.Item
                key={`mi${index}`}
                value={item.path}
                text={item.label}
                active={pathName === item.path}
                onClick={() => router.push(item.path)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Menu>
  );
}
