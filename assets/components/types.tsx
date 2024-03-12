import { Vector3, Euler, Quaternion } from "three";
import { XREvent, XRManagerEvent } from "@react-three/xr";

export type LoaderType = "gltf" | "draco";
export type x = number;
export type y = number;
export type z = number;
export type Position = [x, y, z] | Vector3;
export type Rotation = [x, y, z] | Euler | Quaternion;

export type XRObjectProps = JSX.IntrinsicElements["mesh"] & {
  modelURL: string;
  loaderType: LoaderType;
  scale?: number | [x, y, z];
  position: Position;
  rotation?: Rotation;
  children?: React.ReactNode;
};

export type XRObjectDesignerProps = XRObjectProps & {
  // onDragStart?: (event: XREvent<XRManagerEvent>) => void;
  // onDragEnd?: (event: XREvent<XRManagerEvent>) => void;
  // onDrag: (event: XREvent<XRManagerEvent>) => void;
  rotateEnabled?: boolean;
  dragEnabled?: boolean;
};

export type XRSceneProps = {
  XRObjectPropsArray?: Array<XRObjectProps>;
  children?: React.ReactNode;
  onSessionStart?: (event: XREvent<XRManagerEvent>) => void;
  onSessionEnd?: (event: XREvent<XRManagerEvent>) => void;
};

export type XRSceneDesignerProps = XRSceneProps & {
  XRObjectDesignerPropsArray?: Array<XRObjectDesignerProps>;
};
