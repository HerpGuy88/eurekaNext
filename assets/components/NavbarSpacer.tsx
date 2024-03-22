"use client";
import { Menu } from "semantic-ui-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const NavbarSpacer: React.FunctionComponent = () => {
  const searchParams = useSearchParams();
  const xrMode = searchParams.get("xrMode");

  if (xrMode) {
    return <></>;
  }
  return (
    <Suspense fallback={<></>}>
      <Menu inverted style={{ marginTop: 0, marginBottom: 0 }}></Menu>
    </Suspense>
  );
};

export default NavbarSpacer;
