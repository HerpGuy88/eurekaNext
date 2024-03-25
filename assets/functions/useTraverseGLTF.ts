"use client";

import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

export default function useTraverseGLTF(modelURL: string) {
  useGLTF.preload(modelURL);
  const { scene } = useGLTF(modelURL);
  let geometry;
  let material;
  scene.traverse((child) => {
    const mesh = child as Mesh;
    if (mesh.isMesh) {
      geometry = mesh.geometry;
      material = mesh.material;
    }
  });
  return { geometry, material };
}
