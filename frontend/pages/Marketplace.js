import Head from "next/head";
import Header from "./components/Header";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Cards from "./components/Cards";

const Marketplace = () => {
  const [NFTs, setNFTs] = useState([]);

  // fetch API function
  const fetchNFTs = async () => {
    let nfts;
    const fetchURL = `/api/fetchNFTs`;

    nfts = await fetch(fetchURL).then((data) => data.json());
    console.log("nfts:", nfts);
    setNFTs(nfts.ownedNfts);
  };

  // fetch API from own api
  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CelebsNFT</title>
        <meta name="description" content="NFT Collection 2023" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>NFT for <span className={styles.heroTitle}>SALE</span></h1>
        <p>Buy the bellow pieces on OpenSea</p>
        <div className={styles.cardsDisplay}>
          <Cards nfts={NFTs} />
        </div>
      </main>
      <footer className={styles.footer}>CelebsNFT © 2023</footer>
    </div>
  );
};

export default Marketplace;
