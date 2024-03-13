"use client";

import { useRef } from "react";
// import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
// import { Canvas } from "@react-three/fiber";
import { CameraControls, useGLTF } from "@react-three/drei";
import { Vector3, Euler } from "three";
import { PrimitiveProps } from "@react-three/fiber";
import { XRObjectProps } from "./types";
type LoaderType = "gltf" | "draco";
type x = number;
type y = number;
type z = number;

// type XRObjectProps = JSX.IntrinsicElements["mesh"] & {
//   modelURL: string;
//   loaderType: LoaderType;
//   scale: number | [x, y, z];
//   position: Vector3 | [x, y, z];
//   rotation: Euler | [x, y, z];
// };

function Model(props: PrimitiveProps) {
  const { modelurl } = props;

  useGLTF.preload(modelurl);
  //@ts-ignore
  const { scene } = useGLTF(modelurl);

  // useLayoutEffect(() => {
  //   convertOpacityToTransmission(scene);
  // }, []);

  return <primitive {...props} object={scene} />;
}

export default function XRObject({
  modelURL,
  loaderType,
  scale,
  position,
  rotation,
  children,
  ...rest
}: XRObjectProps) {
  const cameraControlRef = useRef<CameraControls | null>(null);
  if (modelURL === "") {
    return (
      <mesh scale={scale || 1} position={position} rotation={rotation}>
        <boxGeometry />
        <meshPhongMaterial color="blue" />
      </mesh>
    );
  } else {
    return (
      //@ts-ignore
      <Model
        modelurl={modelURL}
        scale={scale || 1}
        position={position}
        rotation={rotation}
      />
    );
  }
}
