"use client";

import { useRef, forwardRef, Suspense } from "react";
// import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
// import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Stage,
  DragControls,
  PivotControls,
  useGLTF,
} from "@react-three/drei";
import { Vector3, Euler, MeshStandardMaterial, MeshBasicMaterial } from "three";
import { PrimitiveProps } from "@react-three/fiber";
import { XRObjectDesignerProps } from "./types";
import { useTraverseGLTF } from "@assets/functions";

const Model = forwardRef<any, PrimitiveProps>((props, ref) => {
  const { modelURL, onClick, highlighted, hidden } = props;

  // useGLTF.preload(modelurl);
  // //@ts-ignore
  // const { scene } = useGLTF(modelurl);
  const { geometry, material } = useTraverseGLTF(modelURL);

  const conditionalMaterial = (material: any): any => {
    if (hidden) {
      console.log("hidden");
      return new MeshBasicMaterial({ opacity: 0, transparent: true });
    }
    if (highlighted) {
      console.log("highlighted");
      return new MeshBasicMaterial({ color: 0xfff000 });
    }
    console.log(material.transparent, material.emissive);
    return material;
  };

  // useLayoutEffect(() => {
  //   convertOpacityToTransmission(scene);
  // }, []);

  // return <primitive {...props} object={scene} ref={ref} />;
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        geometry={geometry}
        material={conditionalMaterial(material)}
        onClick={onClick}
      />
    </group>
  );
});
Model.displayName = "Model";

const XRObjectDesigner = forwardRef<any, XRObjectDesignerProps>(
  (
    {
      modelURL,
      loaderType,
      scale,
      position,
      rotation,
      children,
      dragEnabled,
      rotateEnabled,
      onClick,
      highlighted,
      hidden,
      ...props
    },
    ref
  ) => {
    console.log("hidden", hidden);
    const cameraControlRef = useRef<CameraControls | null>(null);
    return (
      <Suspense fallback={null}>
        {modelURL === "" ? (
          <mesh
            scale={scale || 1}
            position={position}
            rotation={rotation}
            onClick={onClick}
            ref={ref}
          >
            <boxGeometry />
            <meshPhongMaterial color="blue" />
          </mesh>
        ) : (
          <Model
            ref={ref}
            modelURL={modelURL}
            scale={scale || 1}
            position={position}
            rotation={rotation}
            hidden={hidden}
            highlighted={highlighted}
            onClick={onClick}
          />
        )}
      </Suspense>
    );
  }
);

XRObjectDesigner.displayName = "XRObjectDesigner";

export default XRObjectDesigner;
