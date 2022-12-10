
import {GradientTexture, Text} from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function AnimatedText() {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.x += 0.01))
    return (
      <Text ref={mesh} anchorX="center" scale={10}>
      CelebsNFT
      <meshBasicMaterial>
          <GradientTexture
      stops={[0, 1]} // As many stops up to # colors
      colors={['red', 'blue']} // Colors need to match the number of stops
    />
    </meshBasicMaterial>
    </Text>
    );
 }

export default AnimatedText
