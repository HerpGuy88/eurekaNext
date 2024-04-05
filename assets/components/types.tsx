import { Vector3, Euler, Quaternion } from "three";
import { XREvent, XRManagerEvent } from "@react-three/xr";

export type LoaderType = "gltf" | "draco";
export type x = number;
export type y = number;
export type z = number;
export type Position = [x, y, z];
export type Rotation = [x, y, z] | Euler | Quaternion;

export type units = ["inches", "feet", "cm", "m", "mm"];
export type numberOfUnits = number | [x, y, z];

export type ScaleBarProps = {
  units?: units;
  numberOfUnits?: numberOfUnits;
};

export type XRObjectProps = JSX.IntrinsicElements["mesh"] & {
  modelURL: string;
  loaderType: LoaderType;
  scale?: number | [x, y, z] | Vector3;
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
  onClick?: () => void;
  highlighted?: boolean;
  hidden?: boolean;
};

export type XRSceneProps = {
  XRObjectPropsArray: Array<XRObjectProps>;
  children?: React.ReactNode;
  onSessionStart?: (event: XREvent<XRManagerEvent>) => void;
  onSessionEnd?: (event: XREvent<XRManagerEvent>) => void;
};

export type URLDropdownOption = {
  title: string;
  thumbURL?: string;
  modelURL: string;
  text?: string;
};

export type URLComboBoxProps = {
  URLDropdownOptions?: Array<URLDropdownOption>;
  allowURLEntry?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit: (value: string) => void;
};

export type XRSceneDesignerProps = XRSceneProps & {
  XRObjectDesignerPropsArray: Array<XRObjectDesignerProps>;
  URLDropdownOptions?: Array<URLDropdownOption>;
  allowURLEntry?: boolean;
};

type Latitude = number;
type Longitude = number;

export type MapMedia = {
  mediaType: "model" | "video" | "image" | "audio" | "text";
  mediaURL?: string;
  rotation?: Rotation;
  scale?: number;
};

export type MapItem = {
  latitude: Latitude;
  longitude: Longitude;
  title: string;
  text?: string;
  media?: MapMedia;
};

export type MapStoryProps = {
  latitude: Latitude;
  longitude: Longitude;
  zoom?: number;
  title: string;
  text?: string;
  mapItems: Array<MapItem>;
};
