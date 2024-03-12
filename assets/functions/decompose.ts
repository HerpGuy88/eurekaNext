import { Euler, Matrix4, Quaternion, Vector3 } from "three";
import { Decomposition } from "./types";

export default function decompose(matrix: Matrix4): Decomposition {
  const position = new Vector3();
  const quaternion = new Quaternion();
  const rotation = new Euler();
  const scale = new Vector3();

  matrix.decompose(position, quaternion, scale);
  rotation.setFromQuaternion(quaternion);

  return {
    position: position.toArray() as [number, number, number],
    rotation: rotation.toArray() as [number, number, number],
    scale: scale.toArray() as [number, number, number],
  };
}
