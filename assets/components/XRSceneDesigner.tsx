"use client";
// @ts-nocheck
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { VRButton, ARButton, XR, Controllers, Hands } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Stage } from "@react-three/drei";
import {
  ButtonGroup,
  Button,
  Input,
  Segment,
  SegmentGroup,
  Accordion,
  AccordionTitle,
  Icon,
  AccordionContent,
} from "semantic-ui-react";
import XRObjectDesigner from "./XRObjectDesigner";
import {
  XRObjectDesignerProps,
  XRSceneDesignerProps,
  Position,
  Rotation,
} from "./types";
import { downloadLocal, loadJSON, truncate } from "@assets/functions";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import WithPivot from "./WithPivot";
// import PolyfillProvider from "./PolyfillProvider";
import URLComboBox from "./URLComboBox";
// import { PivotControlsProps } from "@react-three/drei/web/pivotControls" //this type is not exported, maybe make a PR?

function ModelCard({
  model,
  selected,
  onClick,
  ...rest
}: {
  model: XRObjectDesignerProps;
  selected: boolean;
  onClick?: () => void;
}) {
  return (
    <Segment
      inverted={selected}
      color={selected ? "red" : undefined}
      onClick={onClick}
    >
      <p
        style={{
          paddingBottom: 0,
          marginBottom: 0,
          fontSize: 12,
          color: selected ? undefined : "black",
          whiteSpace: "pre-wrap",
        }}
      >
        <span
          style={{
            color: "blue",
            fontWeight: "bolder",
            cursor: "pointer",
            borderStyle: "solid",
            borderWidth: 1,
          }}
          onClick={onClick}
        >
          Select
        </span>
        {model?.hidden && "    -HIDDEN-"}
        {model?.highlighted && "    -HIGHLIGHTED-"}
      </p>
      <p
        style={{
          color: selected ? undefined : "black",
          fontSize: 12,
          marginTop: 0,
        }}
      >
        Model URL:{" "}
        {model?.modelURL?.split && model.modelURL.split("/").length > 1
          ? `...${
              model.modelURL.split("/")[model.modelURL.split("/").length - 1]
            }`
          : model?.modelURL}
        <br />
        Position (X,Y,Z):{" "}
        {`${Math.round((model?.position[0] || 0) * 100) / 100}, 
      ${Math.round((model?.position[1] || 0) * 100) / 100}, 
      ${Math.round((model?.position[2] || 0) * 100) / 100}`}
        <br />
        {`Rotation (\u03B1,\u03B2,\u03B3): `}
        {`${Math.round((model?.rotation[0] || 0) * 100) / 100}, 
      ${Math.round((model?.rotation[1] || 0) * 100) / 100}, 
      ${Math.round((model?.rotation[2] || 0) * 100) / 100}`}
      </p>
    </Segment>
  );
}

export default function XRSceneDesigner({
  XRObjectPropsArray,
  URLDropdownOptions,
  allowURLEntry,
  ...rest
}: XRSceneDesignerProps) {
  const { children, onSessionEnd, onSessionStart } = rest;
  const [meshArray, setMeshArray] = useState<
    Array<XRObjectDesignerProps> | undefined
  >([]);
  const [tempMeshArray, setTempMeshArray] = useState<
    Array<XRObjectDesignerProps>
  >([]);
  const [newURL, setNewURL] = useState("");
  const [file, setFile] = useState();
  const [controlsHidden, setControlsHidden] = useState(false);
  const [exportHidden, setExportHidden] = useState(true);

  useEffect(() => {
    setMeshArray(XRObjectPropsArray);
  }, []);

  const cameraControlRef = useRef<typeof CameraControls | null>(null);
  const meshRefs = useRef<Array<any>>([]);
  useEffect(() => {
    meshRefs.current = meshRefs.current.slice(0, meshArray?.length);
  }, [meshArray]);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [mode, setMode] = useState("camera");
  const [selectedObject, setSelectedObject] = useState<number | null>(null);

  const transformMeshArray = async () => {
    if (!tempMeshArray.length) {
      return;
    }
    const newMeshArray: Array<XRObjectDesignerProps> = [];
    console.log(meshRefs);
    for (let i = 0; i < (tempMeshArray ? tempMeshArray.length : 0); i++) {
      const thisMesh = meshRefs.current[i];
      const thisPosition = new Vector3();
      const thisQuaternion = new Quaternion();
      const thisRotation = new Euler();

      console.log("thisMesh", thisMesh);

      await thisMesh.getWorldPosition(thisPosition);
      // thisPosition.setFromMatrixPosition(thisMesh.matrixWorld);
      await thisMesh.getWorldQuaternion(thisQuaternion);
      // thisPosition.set(thisMesh.position)
      thisRotation.setFromQuaternion(thisQuaternion);

      const mesh = tempMeshArray?.slice(i, i + 1)[0];
      console.log("oldMesh", mesh);
      mesh["rotation"] = thisRotation.toArray() as [number, number, number];
      // thisPosition.add(new Vector3(-0.131860001480599, 0.5, 0.245287259914768));
      mesh["position"] = thisPosition.toArray() as [number, number, number];
      console.log("newMesh", mesh);
      newMeshArray.push(mesh);
    }
    return newMeshArray;
  };

  const addModelFromURL = (value: string) => {
    console.log(value);
    if (!value) {
      return;
    }
    const newArray = meshArray?.slice(0, meshArray.length);
    newArray?.push({
      modelURL: value,
      loaderType: "gltf",
      scale: 0.02,
      position: [0.5, 0, 0],
      rotation: [0, 0, 0],
      hidden: false,
      highlighted: false,
    });
    setMeshArray(newArray || []);
    setTempMeshArray(newArray || []);
    setNewURL("");
  };

  const removeModel = (index: number) => {
    console.log(index);
    let newArray = meshArray?.toSpliced(index, 1);
    setMeshArray(newArray);
    if (mode === "move") {
      newArray = tempMeshArray?.toSpliced(index, 1);
      setTempMeshArray(newArray);
    }
    setSelectedObject(null);
  };

  const toggleHidden = () => {
    let thisObject = meshArray?.slice(selectedObject, selectedObject + 1)[0];
    console.log("thisObject", thisObject);
    thisObject["hidden"] = !thisObject["hidden"];
    setMeshArray(meshArray?.toSpliced(selectedObject, 1, thisObject));
    if (mode === "move") {
      thisObject = tempMeshArray?.slice(selectedObject, selectedObject + 1)[0];
      console.log("thisObject", thisObject);
      thisObject["hidden"] = !thisObject["hidden"];
      setTempMeshArray(tempMeshArray?.toSpliced(selectedObject, 1, thisObject));
    }
  };

  const toggleHighlight = () => {
    let thisObject = meshArray?.slice(selectedObject, selectedObject + 1)[0];
    console.log("thisObject", thisObject);
    thisObject["highlighted"] = !thisObject["highlighted"];
    setMeshArray(meshArray?.toSpliced(selectedObject, 1, thisObject));
    if (mode === "move") {
      thisObject = tempMeshArray?.slice(selectedObject, selectedObject + 1)[0];
      console.log("thisObject", thisObject);
      thisObject["highlighted"] = !thisObject["highlighted"];
      setTempMeshArray(tempMeshArray?.toSpliced(selectedObject, 1, thisObject));
    }
  };

  const downloadJson = () => {
    // console.log("let's download this");
    const json = JSON.stringify(meshArray);
    downloadLocal(json, "xrscene.json", "application/json");
  };

  return (
    <div
      style={{
        height: "95vh",
        overflowY: "scroll",
      }}
    >
      <Segment
        compact
        textAlign="center"
        style={{
          zIndex: 10,
          position: "absolute",
          maxWidth: "20vw",
        }}
      >
        <Button mini onClick={() => setControlsHidden(!controlsHidden)}>
          {controlsHidden ? "Show Controls" : "Hide Controls"}
        </Button>
        <div
          style={
            controlsHidden
              ? { visibility: "collapse", height: 0 }
              : { height: "90vh", overflowY: "auto" }
          }
        >
          <SegmentGroup>
            <Segment>
              {/* <ButtonGroup> */}
              <Button
                onClick={async () => {
                  const newMeshArray: Array<XRObjectDesignerProps> =
                    await transformMeshArray();
                  setMeshArray(newMeshArray);
                  setMode("camera");
                }}
                active={mode === "camera"}
              >
                Move Camera
              </Button>
              <Button
                onClick={() => {
                  meshArray?.length &&
                    setTempMeshArray(JSON.parse(JSON.stringify(meshArray)));
                  setMode("move");
                }}
                active={mode === "move"}
              >
                Move Objects
              </Button>
              {/* </ButtonGroup> */}
            </Segment>
            <div
              style={{
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "flex-start",
                height: "40vh",
                overflowY: "auto",
              }}
            >
              <SegmentGroup>
                {(mode === "camera" ? meshArray : tempMeshArray) &&
                  //@ts-ignore
                  (mode === "camera" ? meshArray : tempMeshArray).map(
                    (props, index) => {
                      console.log("index", index);
                      return (
                        <ModelCard
                          model={props}
                          selected={selectedObject === index}
                          key={`mc${index}`}
                          onClick={() => setSelectedObject(index)}
                        />
                      );
                    }
                  )}
              </SegmentGroup>
            </div>
            <Segment>
              {/* <Button onClick={addModelFromURL}>Add</Button> */}
              {/* <Input
              value={newURL}
              onChange={(e) => setNewURL(e.target.value)}
              placeholder="New Model URL..."
            /> */}
              <URLComboBox
                URLDropdownOptions={URLDropdownOptions}
                onSubmit={(value) => addModelFromURL(value)}
                allowURLEntry={allowURLEntry}
              />
            </Segment>
            <Segment textAlign="center">
              <Button
                compact
                disabled={selectedObject === null}
                onClick={() =>
                  selectedObject !== null && removeModel(selectedObject)
                }
              >
                Remove
              </Button>
              <Button
                compact
                disabled={selectedObject === null}
                onClick={toggleHidden}
              >
                Hide
              </Button>
              <Button
                compact
                disabled={selectedObject === null}
                onClick={toggleHighlight}
              >
                Highlight
              </Button>
            </Segment>
            <Accordion>
              <AccordionTitle
                active={exportHidden}
                onClick={() => setExportHidden(!exportHidden)}
              >
                <h3>
                  <Icon name="dropdown"></Icon>Export / Import Scene
                </h3>
              </AccordionTitle>
              <AccordionContent active={exportHidden}>
                <Segment>
                  <Button compact onClick={downloadJson}>
                    Download
                  </Button>

                  <Input
                    type="file"
                    accept=".json"
                    // @ts-ignore
                    onChange={(e) => setFile(e.target.files[0])}
                  ></Input>
                  <Button
                    compact
                    disabled={!file}
                    onClick={() => loadJSON(file).then((x) => setMeshArray(x))}
                  >
                    Load Scene
                  </Button>
                </Segment>
              </AccordionContent>
            </Accordion>
          </SegmentGroup>
        </div>
      </Segment>
      <VRButton />
      <Canvas>
        {/* @ts-ignore */}
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
      </Canvas>
    </div>
  );
}
