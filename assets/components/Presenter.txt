import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState, useLayoutEffect } from "react";
import {
  Environment,
  CameraControls,
  OrbitControls,
  Bounds,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

function Model(props) {
  const { modelurl } = props;

  useGLTF.preload(modelurl);
  const { scene } = useGLTF(modelurl);

  // useLayoutEffect(() => {
  //   convertOpacityToTransmission(scene);
  // }, []);

  return <primitive {...props} object={scene} />;
}

export default (props) => {
  const { modelurl } = props;
  const [enabled, setEnabled] = useState(true);

  return (
    <>
      <Canvas
        style={{ backgroundColor: "transparent" }}
        camera={{
          position: [0, 0, 1000],
          // rotation: [-Math.PI / 4,0,0],
          fov: 40,
        }}
        gl={{
          preserveDrawingBuffer: true,
        }}
      >
        <Suspense fallback={null}>
          <Environment preset="apartment" />
          <CameraControls
            enabled={true}
            enablePan={true}
            autoRotate={false}
            autoRotateSpeed={2}
            onEnd={() => setEnabled(true)}
            onStart={() => setEnabled(true)}
          />
          <Bounds clip fit observe damping={5} margin={1.7}>
            <Model
              modelurl={modelurl}
              rotation={[0, Math.PI, 0]}
              // quaternion-y={Math.PI / 2}
              position={[-0, 0, 0]}
              scale={5}
            />
          </Bounds>
        </Suspense>
      </Canvas>
    </>
  );
};

function convertOpacityToTransmission(model) {
  model.traverse((c) => {
    if (c.material) {
      const material = c.material;
      if (material.opacity < 0.65 && material.opacity > 0.2) {
        const newMaterial = new THREE.MeshPhysicalMaterial();
        for (const key in material) {
          if (key in material) {
            if (material[key] === null) {
              continue;
            }

            if (material[key].isTexture) {
              newMaterial[key] = material[key];
            } else if (
              material[key].copy &&
              material[key].constructor === newMaterial[key].constructor
            ) {
              newMaterial[key].copy(material[key]);
            } else if (typeof material[key] === "number") {
              newMaterial[key] = material[key];
            }
          }
        }

        newMaterial.opacity = 1.0;
        newMaterial.transmission = 1.0;
        c.material = newMaterial;
      }
    }
  });
}
