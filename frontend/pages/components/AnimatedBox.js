
import {GradientTexture, MeshDistortMaterial, RoundedBox} from '@react-three/drei'
import {useRef} from "react"
import { useFrame } from '@react-three/fiber';

const AnimatedBox = () => {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.x += 0.005))
    return (
         <RoundedBox ref={mesh} args={[1, 1, 1]} radius={0.1} smoothness={4} scale={2.5}>
          <MeshDistortMaterial speed={1} distort={0.7}>
          <GradientTexture
      stops={[0, 0.9]} // Stops need to match number of colors
      colors={['darkviolet','cyan', 'aquamarine']} // Colors need to match the number of stops
    />
    </MeshDistortMaterial>
    </RoundedBox>
    );
 }

export default AnimatedBox
