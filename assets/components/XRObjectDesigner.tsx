"use client";

import { useRef, forwardRef } from "react";
// import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
// import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Stage,
  DragControls,
  PivotControls,
  useGLTF,
} from "@react-three/drei";
import { Vector3, Euler } from "three";
import { PrimitiveProps } from "@react-three/fiber";
import { XRObjectDesignerProps } from "./types";
import { useTraverseGLTF } from "@assets/functions";

const Model = forwardRef<any, PrimitiveProps>((props, ref) => {
  const { modelURL, onClick } = props;

  // useGLTF.preload(modelurl);
  // //@ts-ignore
  // const { scene } = useGLTF(modelurl);
  const { geometry, material } = useTraverseGLTF(modelURL);

  // useLayoutEffect(() => {
  //   convertOpacityToTransmission(scene);
  // }, []);

  // return <primitive {...props} object={scene} ref={ref} />;
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={geometry} material={material} onClick={onClick} />
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
      ...props
    },
    ref
  ) => {
    const cameraControlRef = useRef<CameraControls | null>(null);
    if (modelURL === "") {
      return (
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
      );
    } else {
      return (
        //@ts-ignore
        // <PivotControls enabled={rotateEnabled}>
        //   <DragControls
        //     onDragStart={onDragStart}
        //     onDragEnd={onDragEnd}
        //     onDrag={() => console.log("drag!")}
        //     enabled={dragEnabled}
        //   >
        <Model
          ref={ref}
          modelURL={modelURL}
          scale={scale || 1}
          position={position}
          rotation={rotation}
          onClick={onClick}
        />
        //   </DragControls>
        // </PivotControls>
      );
    }
  }
);

XRObjectDesigner.displayName = "XRObjectDesigner";

export default XRObjectDesigner;
