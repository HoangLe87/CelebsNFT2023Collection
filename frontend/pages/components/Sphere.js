import {
  MeshDistortMaterial,
  GradientTexture,
  useCursor,
  Sphere,
} from "@react-three/drei";

function SphereObj() {
  return (
    <mesh>
      <Sphere args={[1, 200, 200]} scale={1} attach="geometry">
        <MeshDistortMaterial distort={1} speed={5}>
          <GradientTexture
            stops={[0, 0.8, 1]}
            colors={["#e63946", "#f1faee", "#a8dadc"]}
            size={100}
          />
        </MeshDistortMaterial>
      </Sphere>
    </mesh>
  );
}

export default SphereObj;
