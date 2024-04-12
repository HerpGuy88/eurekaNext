"use client";

import { forwardRef, Suspense } from "react";
import { Mesh, MeshBasicMaterial } from "three";
import { PrimitiveProps, useLoader } from "@react-three/fiber";
// import { useTraverseGLTF } from "@assets/functions";
import { useGLTF } from "@react-three/drei";
import Loading3D from "./Loading3D";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Model = forwardRef<any, PrimitiveProps>((props, ref) => {
  const { modelURL, onClick, ...rest } = props;

  //   useGLTF.preload(modelURL);

  //   const { geometry, material } = useTraverseGLTF(modelURL);

  // const { scene } = useLoader(GLTFLoader, modelURL)

  useGLTF.preload(modelURL);
  //@ts-ignore
  const { scene } = useGLTF(modelURL);
  let geometry;
  let material;
  scene.traverse((child: any) => {
    const mesh = child as Mesh;
    if (mesh.isMesh) {
      geometry = mesh.geometry;
      material = mesh.material;
    }
  });

  return (
    //@ts-ignore
    <Suspense fallback={Loading3D}>
      <group ref={ref} {...rest}>
        {/* <primitive object={scene} /> */}

        <mesh geometry={geometry} material={material} onClick={onClick} />
      </group>
    </Suspense>
  );
});
Model.displayName = "Model";

export default Model;
