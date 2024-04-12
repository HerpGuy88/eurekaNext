"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Loading3D() {
  const octRef = useRef<any>(null);
  useFrame(() => {
    octRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={octRef} rotation-y={Math.PI * 0.25}>
      <octahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial color={0xd00000} />
    </mesh>
  );
}
