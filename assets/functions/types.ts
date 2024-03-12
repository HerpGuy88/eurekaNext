import { Position, Rotation } from "../components/types";

export type Decomposition = {
  position: Position;
  rotation: Rotation;
  scale: [number, number, number];
};
