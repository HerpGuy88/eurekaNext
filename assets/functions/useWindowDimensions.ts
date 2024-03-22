"use client";

import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    height: 1000,
    width: 1000,
  });
  useEffect(() => {
    const getWindowDimensions = () => {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    };
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}
