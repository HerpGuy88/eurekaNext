"use client";

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
// import dynamic from "next/dynamic";
import { useIsClient } from ".";
import Model from "./Model";
import { useWindowDimensions } from "@assets/functions";

// const ARMarker = dynamic(import("./ARMarker"), { ssr: false });
// const ARCanvas = dynamic(import("./ARCanvas"), { ssr: false });

// const useWindowDimensions = dynamic(
//   import("@assets/functions/useWindowDimensions"),
//   { ssr: false }
// );

const ARDemo = () => {
  const { width, height } = useWindowDimensions();
  if (true) {
    return (
      <ARCanvas
        className="AR"
        style={{ width, height: "90vh" }}
        camera={{ position: [0, 0, 0] }}
        onCreated={({ gl }) => {
          gl.setSize(width, height);
        }}
        gl={{
          alpha: true,
          antialias: true,
          precision: "highp",
          logarithmicDepthBuffer: true,
        }}
        params={{
          sourceWidth: width,
          sourceHeight: height,
          displayWidth: width,
          displayHeight: height,
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 0]} />
        <ARMarker
          className="AR"
          params={{
            smooth: true,
            // "smooth-tolerance": 0.05,
            // "smooth-count": 10,
            // "smooth-threshold": 5,
          }}
          type={"barcode"}
          barcodeValue={6}
          patternUrl={"data/patt.hiro"}
          onMarkerFound={() => {
            console.log("Marker Found");
          }}
        >
          {/* <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh> */}
          <Model
            scale={0.25}
            modelURL="models/mortello.glb"
            rotation={[-Math.PI, 0, 0]}
          ></Model>
        </ARMarker>
      </ARCanvas>
    );
  } else {
    return <></>;
  }
};

// ARDemo.name = "ARDemo";

export default ARDemo;
