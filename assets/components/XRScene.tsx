"use client";

import { useRef } from "react";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Stage,
  DragControls,
  PivotControls,
} from "@react-three/drei";
import XRObject from "./XRObject";
import { XRObjectProps, XRSceneProps } from "./types";

export default function XRScene({ XRObjectPropsArray, ...rest }: XRSceneProps) {
  const { children, onSessionEnd, onSessionStart } = rest;
  const cameraControlRef = useRef<CameraControls | null>(null);
  return (
    <>
      <VRButton />
      <Canvas>
        <CameraControls ref={cameraControlRef} enabled />
        <XR onSessionStart={onSessionStart} onSessionEnd={onSessionEnd}>
          {children}
          <Stage>
            <Controllers />
            {XRObjectPropsArray &&
              XRObjectPropsArray.map((props, index) => {
                return <XRObject key={index} {...props} />;
              })}
            <Hands />
          </Stage>
        </XR>
      </Canvas>
    </>
  );
}
