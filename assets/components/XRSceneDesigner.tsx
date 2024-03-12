"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import {
  CameraControls,
  FlyControls,
  Stage,
  DragControls,
  PivotControls,
  PointerLockControls,
} from "@react-three/drei";
import { ButtonGroup, Button, Segment } from "semantic-ui-react";
import XRObjectDesigner from "./XRObjectDesigner";
import {
  XRObjectDesignerProps,
  XRSceneDesignerProps,
  Position,
  Rotation,
} from "./types";
import { DragControlsProps } from "@react-three/drei/web/DragControls";
import { decompose } from "@assets/functions";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import WithPivot from "./WithPivot";
// import { PivotControlsProps } from "@react-three/drei/web/pivotControls" //this type is not exported, maybe make a PR?

export default function XRSceneDesigner({
  XRObjectPropsArray,
  ...rest
}: XRSceneDesignerProps) {
  const { children, onSessionEnd, onSessionStart } = rest;
  const [meshArray, setMeshArray] = useState<Array<XRObjectDesignerProps>>([]);
  const [tempMeshArray, setTempMeshArray] = useState<
    Array<XRObjectDesignerProps>
  >([]);
  useEffect(() => {
    setMeshArray(XRObjectPropsArray);
  }, []);

  const cameraControlRef = useRef<typeof CameraControls | null>(null);
  const meshRefs = useRef<Array<any>>([]);
  // useEffect(() => {
  //   meshRefs.current = meshRefs.current.slice(0, meshArray.length);
  // }, [meshArray]);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [mode, setMode] = useState("camera");
  const transformObject = ({
    original,
    position,
    rotation,
    scale,
    matrix,
  }: {
    original: XRObjectDesignerProps;
    position: Position;
    rotation: Rotation;
    scale: [number, number, number];
    matrix: Matrix4;
  }) => {
    const newObject = { ...original };
    // const newRotation = new THREE.Euler();
    const oldQuaternion = new Quaternion();
    const oldRotation = new Euler(
      newObject["rotation"][0],
      newObject["rotation"][1],
      newObject["rotation"][2],
      "YXZ"
    );
    console.log(newObject);
    console.log(newObject["rotation"]);
    console.log(oldRotation);
    oldQuaternion.setFromEuler(
      new Euler(
        newObject["rotation"][0],
        newObject["rotation"][1],
        newObject["rotation"][2],
        "YXZ"
      )
    );

    const oldMatrix = new Matrix4();
    const oldPosition = new Vector3(
      newObject["position"][0],
      newObject["position"][1],
      newObject["position"][2]
    );
    console.log(meshArray, tempMeshArray);
    console.log(oldMatrix);
    console.log(oldPosition, oldQuaternion);
    oldMatrix.compose(oldPosition, oldQuaternion, new Vector3(1, 1, 1));
    console.log(oldMatrix);

    // console.log(oldMatrix);
    const newMatrix = oldMatrix.multiply(matrix);
    console.log(oldMatrix, matrix, newMatrix);

    const { position: newPosition, rotation: newRotation } =
      decompose(newMatrix);

    newObject["position"] = newPosition;
    newObject["rotation"] = newRotation;
    return newObject;

    console.log(original);
    if (position) {
      newObject["position"][0] = newObject["position"][0] + position[0];
      newObject["position"][1] = newObject["position"][1] + position[1];
      newObject["position"][2] = newObject["position"][2] + position[2];
    }
    // if (position) {
    //   newObject["position"][0] = position[0];
    //   newObject["position"][1] = position[1];
    //   newObject["position"][2] = position[2];
    // }
    if (rotation) {
      newObject["rotation"][0] =
        (newObject["rotation"][0] + rotation[0]) % (Math.PI * 2);
      newObject["rotation"][1] =
        (newObject["rotation"][1] + rotation[1]) % (Math.PI * 2);
      newObject["rotation"][2] =
        (newObject["rotation"][2] + rotation[2]) % (Math.PI * 2);
    }
    // if (rotation) {
    //   newObject["rotation"][0] = rotation[0];
    //   newObject["rotation"][1] = rotation[1];
    //   newObject["rotation"][2] = rotation[2];
    // }
    return newObject;
  };
  const transformObjectArray = ({
    index,
    position,
    rotation,
    scale,
    matrix,
  }: {
    index: number;
    position?: Position;
    rotation?: Rotation;
    scale?: [number, number, number];
    matrix?: Matrix4;
  }) => {
    // console.log(index, position, rotation, scale);
    const oldState = meshArray.slice();
    // console.log(meshArray);
    // console.log(oldState);
    console.log(oldState.slice(index, index + 1));
    oldState.splice(
      index,
      1,
      transformObject({
        original: oldState[index],
        position,
        rotation,
        scale,
        matrix,
      })
    );
    setMeshArray(oldState);
    console.log(oldState.slice(index, index + 1));
  };

  return (
    <>
      <Segment compact style={{ zIndex: 10, position: "absolute" }}>
        <ButtonGroup>
          <Button
            onClick={async () => {
              const newMeshArray: Array<XRObjectDesignerProps> = [];
              console.log(meshRefs);
              for (let i = 0; i < XRObjectPropsArray.length; i++) {
                const thisMesh = meshRefs.current[i];
                const thisPosition = new Vector3();
                const thisQuaternion = new Quaternion();
                const thisRotation = new Euler();

                console.log("thisMesh", thisMesh);

                await thisMesh.getWorldPosition(thisPosition);
                await thisMesh.getWorldQuaternion(thisQuaternion);
                await thisRotation.setFromQuaternion(thisQuaternion);

                const mesh = tempMeshArray.slice(i, i + 1)[0];
                console.log("oldMesh", mesh);
                mesh["rotation"] = thisRotation.toArray() as [
                  number,
                  number,
                  number
                ];
                thisPosition.add(
                  new Vector3(-0.131860001480599, 0.5, 0.245287259914768)
                );
                mesh["position"] = thisPosition.toArray() as [
                  number,
                  number,
                  number
                ];
                console.log("newMesh", mesh);
                newMeshArray.push(mesh);
              }

              setMeshArray(newMeshArray);
              setMode("camera");
            }}
            active={mode === "camera"}
          >
            Move Camera
          </Button>
          <Button
            onClick={() => {
              setTempMeshArray(JSON.parse(JSON.stringify(meshArray)));
              setMode("move");
            }}
            active={mode === "move"}
          >
            Move Objects
          </Button>
        </ButtonGroup>
      </Segment>
      <VRButton />
      <Canvas>
        <CameraControls ref={cameraControlRef} enabled={mode === "camera"} />
        <XR onSessionStart={onSessionStart} onSessionEnd={onSessionEnd}>
          {children}
          <Stage>
            <Controllers />
            {meshArray &&
              meshArray.map((props, index) => {
                console.log("index", index);
                return (
                  <WithPivot
                    key={`pi${index}`}
                    enabled={mode === "move"}
                    offset={props?.position}
                    // onFinish={({ position, rotation, scale, matrix }) => {
                    //   console.log(position, rotation, scale, matrix);
                    //   transformObjectArray({
                    //     index,
                    //     position,
                    //     rotation,
                    //     scale,
                    //     matrix,
                    //   });
                    // }}
                    // onFinish={async () => {
                    //   const newMeshArray = [];
                    //   for (let i = 0; i < meshRefs.current.length; i++) {
                    //     const thisMesh = meshRefs.current[index];
                    //     const thisPosition = new Vector3();
                    //     const thisQuaternion = new Quaternion();
                    //     const thisRotation = new Euler();

                    //     await thisMesh.getWorldPosition(thisPosition);
                    //     await thisMesh.getWorldQuaternion(thisQuaternion);
                    //     await thisRotation.setFromQuaternion(thisQuaternion);

                    //     const mesh = tempMeshArray.slice(i, i + 1);
                    //     mesh["rotation"] = thisRotation.toArray() as [
                    //       number,
                    //       number,
                    //       number
                    //     ];
                    //     mesh["position"] = thisPosition.toArray() as [
                    //       number,
                    //       number,
                    //       number
                    //     ];
                    //     newMeshArray.push(mesh)
                    //   }
                    // }}
                  >
                    {/* <WithDrag
                      key={`dr${index}`}
                      enabled={mode === "move"}
                      onDrag={() => console.log("hi")}
                    > */}
                    <XRObjectDesigner
                      key={index}
                      ref={(x) => {
                        console.log("index", index);
                        console.log("ref", x);
                        meshRefs.current[index] = x;
                      }}
                      {...props}
                    />
                    {/* </WithDrag> */}
                  </WithPivot>
                );
              })}
            <Hands />
          </Stage>
        </XR>
      </Canvas>
    </>
  );
}
