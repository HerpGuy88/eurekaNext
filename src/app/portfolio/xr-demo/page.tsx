"use client";

import { useRef } from "react";
import { CameraControls, Environment } from "@react-three/drei";
import { XRScene, XRSceneDesigner } from "@assets/components";
import { XRObjectProps, XRObjectDesignerProps } from "@assets/components/types";
import { useRouter, usePathname } from "next/navigation";
// import hdr from "../../../../assets/hdris/zavelstei_1k.hdr";

const propsArray: Array<XRObjectDesignerProps> = [
  {
    modelURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/MISC/UNL~144~144/1734/statue_c.glb",
    loaderType: "gltf",
    scale: 0.02,
    position: [-0.5, 0, 0],
    rotation: [Math.PI / 2, Math.PI, 0],
    hidden: false,
    highlighted: false,
  },
  {
    modelURL: "",
    loaderType: "gltf",
    scale: 1,
    position: [0.5, 1, 0],
    rotation: [0, 0, 0],
    hidden: false,
    highlighted: false,
  },
];

const urlOptions = [
  {
    title: "Unidentified Statue",
    thumbURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/Size3/UNL~144~144/1734/statue.jpg",
    modelURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/MISC/UNL~144~144/1734/statue_c.glb",
    text: "No identifier found.",
  },
  {
    title: "Classical Female Statue",
    thumbURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/Size3/UNL~144~144/1734/1997-549a.jpg",
    modelURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/MISC/UNL~144~144/1734/1997-549a_c.glb",
    text: "1997.549a: White ceramic statue of female nude with water jug on her left shoulder and a cloth draped over her left arm.  One of a pair.",
  },
  {
    title: "Bust of Michelangelo's David ",
    thumbURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/Size3/UNL~144~144/1734/1997.2022.jpg",
    modelURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/MISC/UNL~144~144/1734/1997-2022_c.glb",
    text: '1997.2022: White stone carved bust copy of Michelangelo\'s David; mounted on cube, reverse engraved "G. R."',
  },
  {
    title: "Bust of Diane de Versailles",
    thumbURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/Size3/UNL~144~144/1734/1997.2023.jpg",
    modelURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/MISC/UNL~144~144/1734/1997-2023_c.glb",
    text: '1997.2023: White stone carved bust copy of the Diane de Versailles; mounted on cube, reverse engraved "G. R."',
  },
  {
    title: "Porcelain Classical Figurine",
    thumbURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/Size3/UNL~144~144/1734/1997-2257.jpg",
    modelURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/MISC/UNL~144~144/1734/nude_c_yup.glb",
    text: '1997.2257: Porcelain classical figurine called "Venus After the Bath." Standing nude female with tree stump, hair up in bun, on round.',
  },
  {
    title: "Female Classical Figurine",
    thumbURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/Size3/UNL~144~144/1734/1997-2256.jpg",
    modelURL:
      "https://mediacommons.unl.edu/MediaManager/srvr?mediafile=/MISC/UNL~144~144/1734/clothed_c.glb",
    text: "1997.2256: Bisque porcelain classical figurine, standing female in off-shoulder draperies, hair up in bun, on square base.",
  },
];

export default function XRDemo() {
  const cameraControlRef = useRef<CameraControls | null>(null);
  const router = useRouter();
  const currentPath = usePathname();
  function removeXRparam() {
    router?.push &&
      router.push(currentPath, {
        //@ts-ignore
        shallow: true,
      });
  }
  const addXRparam = () => {
    router?.push &&
      router.push(`${currentPath}?xrMode=true`, {
        //@ts-ignore
        shallow: true,
      });
  };
  return (
    // <p>hi</p>
    //@ts-ignore
    <XRSceneDesigner
      XRObjectPropsArray={propsArray}
      URLDropdownOptions={urlOptions}
      allowURLEntry={true}
      onSessionEnd={removeXRparam}
      onSessionStart={addXRparam}
    >
      <Environment files="/zavelstein_1k.exr" background />
    </XRSceneDesigner>
  );
}
