import Head from "next/head";
import Header from "./components/Header";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Canvas } from "@react-three/fiber";
import AnimatedSphere from "./components/AnimatedSphere";
import { OrbitControls } from "@react-three/drei";

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
            {" "}
            <h1>Welcome to CelebsNFT</h1>
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
          <div>
            <Canvas className={styles.canvas}>
              <ambientLight intensity={0.3} />
              <directionalLight intensity={1} />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>CelebsNFT © 2023</footer>
    </div>
  );
};

export default Home;
