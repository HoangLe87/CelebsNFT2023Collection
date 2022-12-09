import React from "react";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 200, 200]} scale={1} attach="geometry">
      <MeshDistortMaterial
        color="cyan"
        attach="material"
        distort={1}
        speed={2}
      />
    </Sphere>
  );
};

export default AnimatedSphere;
