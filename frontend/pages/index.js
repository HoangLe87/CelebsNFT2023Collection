import Head from "next/head";
import Header from "./components/Header";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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

const Home = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>CelebsNFT</title>
        <meta name="description" content="NFT Collection 2023" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div>
            <h1>Welcome to <span className={styles.heroTitle}>CelebsNFT</span></h1>
            <p>Each unique. Each beautiful. Discover your NFT today.</p>
            <div>
              <button
                className={styles.mintButton}
                onClick={() => router.push("/Mint")}
              >
                Mint NFT
              </button>
              <button
                className={styles.mintButton}
                onClick={() => router.push("/Marketplace")}
              >
                Buy NFT
              </button>
            </div>
          </div>
            <Canvas className={styles.canvas}>
              <ambientLight intensity={0.8} />
              <directionalLight intensity={1} />
              <OrbitControls enableZoom={false} />
              <AnimatedBox/>
            </Canvas>
        </div>
      </main>
      <footer className={styles.footer}>CelebsNFT © 2023</footer>
    </div>
  );
};

export default Home;
