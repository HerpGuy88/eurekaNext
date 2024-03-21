"use client";

import { useEffect } from "react";
import WebXRPolyfill from "webxr-polyfill";

export default function PolyfillProvider({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  let polyfill;
  useEffect(() => {
    if (global.navigator?.language) {
      try {
        polyfill = new WebXRPolyfill();
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  return <>{children}</>;
}
