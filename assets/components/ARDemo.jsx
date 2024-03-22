"use client";

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs/lib/ar/";
import dynamic from "next/dynamic";
import { useIsClient } from ".";
// import { useWindowDimensions } from "@assets/functions";

// const ARMarker = dynamic(import("./ARMarker"), { ssr: false });
// const ARCanvas = dynamic(import("./ARCanvas"), { ssr: false });

const useWindowDimensions = dynamic(
  import("@assets/functions/useWindowDimensions"),
  { ssr: false }
);

const ARDemo = () => {
  const isClient = useIsClient();
  const { width, height } = useWindowDimensions();
  const hasWindow = typeof window !== "undefined";
  if (true) {
    return (
      <ARCanvas
        camera={{ position: [0, 0, 0] }}
        onCreated={({ gl }) => {
          gl.setSize(1000, 1000);
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 0]} />
        <ARMarker
          params={{ smooth: true }}
          type={"pattern"}
          patternUrl={"data/patt.hiro"}
          onMarkerFound={() => {
            console.log("Marker Found");
          }}
        >
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh>
        </ARMarker>
      </ARCanvas>
    );
  } else {
    return <></>;
  }
};

// ARDemo.name = "ARDemo";

export default ARDemo;
