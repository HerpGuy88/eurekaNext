import { Suspense, useRef, useLayoutEffect } from "react";

import { Button, Segment } from "semantic-ui-react";

import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { CameraControls, OrbitControls, Stage } from "@react-three/drei";
import { MapStoryProps } from "./types";
import Model from "./Model";

export default function XROverlay({ selected, onClose, mapItems }) {
  const orbitControlRef = useRef(null);
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: selected > -1 ? 1001 : 0,
        backgroundColor: `rgba(0,0,0,0.5)`,
        visibility: selected > -1 ? "visible" : "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          height: "90vh",
        }}
      >
        <div style={{ top: 40, display: "flex", justifyContent: "center" }}>
          <Button onClick={onClose}>Close</Button>
        </div>
        <VRButton />
        <Canvas>
          {/* @ts-ignore */}
          <OrbitControls
            ref={orbitControlRef}
            enabled
            maxPolarAngle={Math.PI * 0.6}
          />
          <XR>
            <Stage>
              {selected > -1 && mapItems[selected]?.media?.mediaURL && (
                <Model
                  rotation={[-1.6, 0, 0]}
                  modelURL={mapItems[selected]?.media?.mediaURL}
                />
              )}
            </Stage>
            <Hands />
          </XR>
        </Canvas>
      </div>
    </div>
  );
}
