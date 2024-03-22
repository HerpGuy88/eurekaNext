import { forwardRef, Suspense } from "react";
import { MeshBasicMaterial } from "three";
import { PrimitiveProps } from "@react-three/fiber";
import { useTraverseGLTF } from "@assets/functions";

function Fallback(): React.ReactNode {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
}

const Model = forwardRef<any, PrimitiveProps>((props, ref) => {
  const { modelURL, onClick, highlighted, hidden } = props;

  //   useGLTF.preload(modelURL);

  const { geometry, material } = useTraverseGLTF(modelURL);

  const conditionalMaterial = (material: any): any => {
    if (hidden) {
      console.log("hidden");
      return new MeshBasicMaterial({ opacity: 0, transparent: true });
    }
    if (highlighted) {
      console.log("highlighted");
      return new MeshBasicMaterial({ color: 0xfff000 });
    }
    console.log(material.transparent, material.emissive);
    return material;
  };

  return (
    //@ts-ignore
    <Suspense fallback={Fallback}>
      <group ref={ref} {...props} dispose={null}>
        <mesh
          geometry={geometry}
          material={conditionalMaterial(material)}
          onClick={onClick}
        />
      </group>
    </Suspense>
  );
});
Model.displayName = "Model";

export default Model;
