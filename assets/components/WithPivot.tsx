"use client";

import { useState } from "react";
import { Position, Rotation } from "./types";
import { Matrix4 } from "three";
import { PivotControls } from "@react-three/drei";
import { decompose } from "@assets/functions";

export default function WithPivot({
  enabled,
  children,
  onFinish,
  ...rest
}: {
  enabled: boolean;
  children: React.ReactNode;
  onFinish: ({
    position,
    rotation,
    scale,
    matrix,
  }: {
    position?: Position;
    rotation?: Rotation;
    scale?: [number, number, number];
    matrix?: Matrix4;
  }) => void;
  rest?: any;
}) {
  const [myRotation, setRotation] = useState<null | Rotation>(null);
  const [myPosition, setPosition] = useState<null | Position>(null);
  const [matrix, setMatrix] = useState<Matrix4>(new Matrix4());
  // const newMatrix = new Matrix4();
  // const { position, rotation, scale } = useMemo(
  //   () => decompose(matrix),
  //   [matrix]
  // );

  return enabled ? (
    <PivotControls
      autoTransform={true}
      {...rest}
      onDrag={(wDelta) => {
        setMatrix(wDelta);
      }}
      onDragEnd={() => {
        const { position, rotation, scale } = decompose(matrix);
        onFinish && onFinish({ position, rotation, scale, matrix });
      }}
    >
      {children}{" "}
    </PivotControls>
  ) : (
    children
  );
}
