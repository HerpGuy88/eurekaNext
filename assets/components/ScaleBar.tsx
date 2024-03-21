"use client";

import { useRef } from "react";
import { ScaleBarProps } from "./types";

export default function XRObject({
  units,
  numberOfUnits,
  ...rest
}: ScaleBarProps) {
  return (
    <mesh scale={1} position={[0, 0, 0]}>
      <boxGeometry />
      <meshNormalMaterial wireframe />
    </mesh>
  );
}
