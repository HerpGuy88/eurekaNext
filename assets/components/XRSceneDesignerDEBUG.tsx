"use client";

// import { useRef, useState, useEffect, useMemo } from "react";
// import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
// import { Canvas } from "@react-three/fiber";
// import { CameraControls, Stage } from "@react-three/drei";
import {
  ButtonGroup,
  Button,
  // Input,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
// import XRObjectDesigner from "./XRObjectDesigner";
// import {
//   XRObjectDesignerProps,
//   XRSceneDesignerProps,
//   Position,
//   Rotation,
// } from "./types";
// import { truncate } from "@assets/functions";
// import { Euler, Matrix4, Quaternion, Vector3 } from "three";
// import WithPivot from "./WithPivot";
// import { PivotControlsProps } from "@react-three/drei/web/pivotControls" //this type is not exported, maybe make a PR?

export default function XRSceneDesigner({ ...rest }) {
  // const { children, onSessionEnd, onSessionStart } = rest;
  // const [meshArray, setMeshArray] = useState<
  //   Array<XRObjectDesignerProps> | undefined
  // >([]);
  // const [tempMeshArray, setTempMeshArray] = useState<
  //   Array<XRObjectDesignerProps>
  // >([]);
  // const [newURL, setNewURL] = useState("");

  // useEffect(() => {
  //   setMeshArray(XRObjectPropsArray);
  // }, []);

  // const cameraControlRef = useRef<typeof CameraControls | null>(null);
  // const meshRefs = useRef<Array<any>>([]);
  // useEffect(() => {
  //   meshRefs.current = meshRefs.current.slice(0, meshArray?.length);
  // }, [meshArray]);
  // const [cameraEnabled, setCameraEnabled] = useState(true);
  // const [mode, setMode] = useState("camera");
  // const [selectedObject, setSelectedObject] = useState<number | null>(null);

  // const transformMeshArray = async () => {
  //   const newMeshArray: Array<XRObjectDesignerProps> = [];
  //   console.log(meshRefs);
  //   for (let i = 0; i < (tempMeshArray ? tempMeshArray.length : 0); i++) {
  //     const thisMesh = meshRefs.current[i];
  //     const thisPosition = new Vector3();
  //     const thisQuaternion = new Quaternion();
  //     const thisRotation = new Euler();

  //     console.log("thisMesh", thisMesh);

  //     await thisMesh.getWorldPosition(thisPosition);
  //     // thisPosition.setFromMatrixPosition(thisMesh.matrixWorld);
  //     await thisMesh.getWorldQuaternion(thisQuaternion);
  //     // thisPosition.set(thisMesh.position)
  //     thisRotation.setFromQuaternion(thisQuaternion);

  //     const mesh = tempMeshArray?.slice(i, i + 1)[0];
  //     console.log("oldMesh", mesh);
  //     mesh["rotation"] = thisRotation.toArray() as [number, number, number];
  //     // thisPosition.add(new Vector3(-0.131860001480599, 0.5, 0.245287259914768));
  //     mesh["position"] = thisPosition.toArray() as [number, number, number];
  //     console.log("newMesh", mesh);
  //     newMeshArray.push(mesh);
  //   }
  //   return newMeshArray;
  // };

  // const addModelFromURL = () => {
  //   const newArray = meshArray?.slice(0, meshArray.length);
  //   newArray?.push({
  //     modelURL: newURL,
  //     loaderType: "gltf",
  //     scale: 0.02,
  //     position: [0.5, 0, 0],
  //     rotation: [0, 0, 0],
  //   });
  //   setMeshArray(newArray || []);
  //   setTempMeshArray(newArray || []);
  // };

  return (
    <>
      <Segment
        compact
        style={{
          zIndex: 10,
          position: "absolute",
          maxWidth: "20vw",
        }}
      >
        <SegmentGroup>
          <Segment>
            {/* <ButtonGroup> */}
            <Button
              onClick={async () => {
                // const newMeshArray: Array<XRObjectDesignerProps> =
                //   await transformMeshArray();
                //   setMeshArray(newMeshArray);
                // setMode("camera");
              }}
              // active={mode === "camera"}
            >
              Move Camera
            </Button>
            <Button
              onClick={() => {
                // setTempMeshArray(JSON.parse(JSON.stringify(meshArray)));
                // setMode("move");
              }}
              // active={mode === "move"}
            >
              Move Objects
            </Button>
            {/* </ButtonGroup> */}
          </Segment>
          {/* {meshArray &&
            meshArray.map((props, index) => {
              console.log("index", index);
              return (
                <ModelCard
                  modelURL={props.modelURL}
                  selected={selectedObject === index}
                  key={`mc${index}`}
                />
              );
            })} */}
          <Segment>
            <Button>Add</Button>
            {/* <Input
              value={newURL}
              onChange={(e) => setNewURL(e.target.value)}
              placeholder="New Model URL..."
            /> */}
          </Segment>
          <Segment textAlign="center">
            <Button compact>Remove Selected</Button>
          </Segment>
        </SegmentGroup>
      </Segment>
      {/* <VRButton />
      <Canvas>
        <CameraControls ref={cameraControlRef} enabled={mode === "camera"} />
        <XR onSessionStart={onSessionStart} onSessionEnd={onSessionEnd}>
          {children}
          <Controllers />
          {meshArray &&
            meshArray.map((props, index) => {
              console.log("index", index);
              return (
                <WithPivot
                  key={`pi${index}`}
                  enabled={mode === "move"}
                  //@ts-ignore
                  offset={props?.position}
                >
                  <XRObjectDesigner
                    key={index}
                    ref={(x) => {
                      console.log("index", index);
                      console.log("ref", x);
                      meshRefs.current[index] = x;
                    }}
                    onClick={() => setSelectedObject(index)}
                    {...props}
                  />
                </WithPivot>
              );
            })}
          <Hands />
        </XR>
      </Canvas> */}
    </>
  );
}
