"use client";

import { useRef } from "react";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  Stage,
  DragControls,
  PivotControls,
  Environment,
} from "@react-three/drei";
import { XRScene, XRSceneDesigner } from "@assets/components";
import { XRObjectProps } from "@assets/components/types";
import { useRouter, usePathname } from "next/navigation";
// import hdr from "../../../../assets/hdris/zavelstei_1k.hdr";

const propsArray: Array<XRObjectProps> = [
  {
    modelURL: "",
    loaderType: "gltf",
    scale: 1,
    position: [0.5, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    modelURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/MISC/UNL~144~144/1734/statue_c.glb",
    loaderType: "gltf",
    scale: 0.02,
    position: [-0.5, 0, 0],
    rotation: [Math.PI / 2, Math.PI, 0],
  },
  {
    modelURL: "",
    loaderType: "gltf",
    scale: 1,
    position: [0.5, 1, 0],
    rotation: [0, 0, 0],
  },
];

export default function XRDemo() {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const router = useRouter();
  const currentPath = usePathname();
  function removeXRparam() {
    //@ts-ignore
    router.push(currentPath, undefined, {
      shallow: true,
    });
  }
  const addXRparam = () => {
    //@ts-ignore
    router.push(`${currentPath}?xrMode=true`, undefined, {
      shallow: true,
    });
  };
  return (
    // <>
    //   <VRButton />
    //   <Canvas>
    //     <CameraControls ref={cameraControlRef} enabled={false} />
    //     <XR>
    //       <Stage>
    //         <Controllers />
    //         <Hands />
    //         <DragControls>
    //           <PivotControls>
    //             <mesh>
    //               <boxGeometry />
    //               <meshPhongMaterial color="blue" />
    //             </mesh>
    //           </PivotControls>
    //         </DragControls>
    //       </Stage>
    //     </XR>
    //   </Canvas>
    // </>
    //@ts-ignore
    <XRSceneDesigner
      XRObjectPropsArray={propsArray}
      onSessionEnd={removeXRparam}
      onSessionStart={addXRparam}
    >
      <Environment files="/zavelstein_1k.exr" background />
    </XRSceneDesigner>
  );
}
