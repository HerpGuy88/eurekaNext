"use client";

// import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import dynamic from "next/dynamic";
// import { useWindowDimensions } from "@assets/functions";
const ARMarker = dynamic(
  import("@artcom/react-three-arjs").then((c) => c.ARMarker)
);
const ARCanvas = dynamic(
  import("@artcom/react-three-arjs").then((c) => c.ARCanvas)
);

const ARDemo = () => {
  // const isClient = useIsClient();
  // const { width, height } = useWindowDimensions();
  if (1 === 0) {
    return (
      <ARCanvas
        camera={{ position: [0, 0, 0] }}
        onCreated={({ gl }) => {
          gl.setSize(width, height);
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
